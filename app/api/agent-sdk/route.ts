import { NextRequest } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { FunctionTool, LlmAgent, Runner, InMemorySessionService, StreamingMode } from '@google/adk';

const globalForSession = globalThis as unknown as { sessionService: InMemorySessionService };
const sessionService = globalForSession.sessionService || new InMemorySessionService();
if (process.env.NODE_ENV !== "production") globalForSession.sessionService = sessionService;

export async function POST(req: NextRequest) {
    const { userId, agentId, userInput } = await req.json();

    const agentDetail = await fetchQuery(api.agent.GetAgentById, {
        agentId: agentId
    });
    const apiNodes = (agentDetail?.agentToolConfig?.apiNodes || []);

    // 2. Execute them and collect results
    let apiContext = '';
    for (const apiNode of apiNodes) {
        try {
            let url = apiNode.url;

            // Replace {{input}} or {{symbol}} with userInput
            url = url.replace(/\{\{.*?\}\}/g, encodeURIComponent(userInput));

            // Append API key if needed
            if (apiNode.includeApiKey && apiNode.apiKey) {
                url += url.includes('?')
                    ? `&apikey=${apiNode.apiKey}`
                    : `?apikey=${apiNode.apiKey}`;
            }

            const res = await fetch(url);
            const data = await res.json();
            apiContext += `\n\n[${apiNode.name} Response]:\n${JSON.stringify(data, null, 2)}`;
        } catch (err) {
            console.error(`API node ${apiNode.name} failed:`, err);
        }
    }



    const enrichedInput = apiContext
        ? `User request: ${userInput}\n\nContext data fetched:\n${apiContext}`
        : userInput;




    let conversationId = null;
    const conversationDetail = await fetchQuery(api.conversation.GetConversationById, {
        agentId: agentDetail._id,
        userId: userId
    });
    conversationId = conversationDetail?.conversationId;
    if (!conversationDetail.conversationId) {
        const ConversationId = uuidv4();
        conversationId = ConversationId;
    }

    const makeSafeName = (name: string) => {
        if (!name) return 'Default_Action';
        return name.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 60);
    };

    const generatedTools = (agentDetail?.agentToolConfig?.tools || []).map((t: any) => {
        return new FunctionTool({
            name: makeSafeName(t.name), // Matches what the AI thinks the tool is named
            description: t.description || "A helpful tool",
            parameters: z.object(
                Object.fromEntries(
                    Object.entries(t.parameters || {}).map(([key, type]) => {
                        if (type === "string") return [key, z.string()];
                        if (type === "number") return [key, z.number()];
                        return [key, z.any()];
                    })
                )
            ),
            execute: async (params: Record<string, any>) => {
                try {
                    let url = t.url;
                    for (const key in params) {
                        url = url.replace(`{{${key}}}`, encodeURIComponent(String(params[key])));
                    }
                    if (t.includeApiKey && t.apiKey) {
                        url += url.includes('?') ? `&key=${t.apiKey}` : `?key=${t.apiKey}`;
                    }
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`API returned status: ${response.status}`);
                    return await response.json();
                } catch (error: any) {
                    console.error("Tool execution failed:", error.message);
                    return { error: "The tool failed to load data.", details: error.message };
                }
            }
        });
    });

    const createdAgent = (agentDetail?.agentToolConfig?.agents || []).map((config: any) => {
        return new LlmAgent({
            name: makeSafeName(config?.name),
            model: config?.model || 'gemini-2.5-flash',
            instruction: config?.instruction || "Help the user.",
            tools: generatedTools
        });
    });
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const validAgentName = makeSafeName(agentDetail?.name);
    const currentDate = new Date().toDateString();
    const apiContextInstruction = apiContext ? `
IMPORTANT - DATA ALREADY PROVIDED:
- The user's requested data has already been fetched and is included in this message.
- Use ONLY that provided data. Do NOT call any tools, functions, or APIs.
- Do NOT write any code or print statements.
- Do NOT ask the user for more parameters. Analyze and respond immediately.
` : '';

    const finalAgent = new LlmAgent({
        name: validAgentName,
        instruction: `You are a proactive, highly specialized AI assistant named ${agentDetail?.name}. 
    Today's date is ${currentDate}. The user's browser timezone is ${timeZone}.
    
    ${apiContextInstruction}
    
    CRITICAL INSTRUCTIONS:
    1. DO NOT endlessly interrogate the user for exact parameters to run your tools. 
    2. Take initiative! Make logical assumptions and use reasonable defaults.
    3. Present your full solution first, then ask if the user wants adjustments.
    4. Refuse to answer out-of-scope general knowledge questions.`,
        model: 'gemini-2.5-flash',
        subAgents: createdAgent,
        tools: generatedTools
    });
    try {
        await sessionService.createSession({
            appName: validAgentName,
            userId: userId || 'default-user',
            sessionId: conversationId,
            state: {}
        });
    } catch (error) {
        // FIX 3: We WANT this to fail on the second message! It means the memory is successfully working.
        console.log(`Session memory resumed for ID: ${conversationId}`);
    }

    const runner = new Runner({
        agent: finalAgent,
        sessionService: sessionService,
        appName: validAgentName
    });

    const eventStream = await runner.runAsync({
        userId: userId || 'default-user',
        sessionId: conversationId,
        newMessage: {
            role: 'user',
            parts: [{ text: enrichedInput }]
        },
        runConfig: {
            streamingMode: StreamingMode.SSE
        }
    });
    console.log("apiNodes found:", apiNodes.length);
    console.log("apiContext length:", apiContext.length);
    console.log("enrichedInput preview:", enrichedInput.substring(0, 200));
    if (!eventStream) {
        return new Response("Model returned no stream");
    }

    const stream = new ReadableStream({
        async start(controller) {
            let hasOutput = false;

            try {
                for await (const event of eventStream) {
                    console.log("EVENT:", event); // keep this

                    const parts = event.content?.parts;

                    if (parts) {
                        for (const part of parts) {
                            if ('text' in part && part.text) {
                                hasOutput = true;
                                controller.enqueue(
                                    new TextEncoder().encode(part.text)
                                );
                            }
                        }
                    }
                }
            } catch (err) {
                console.error("STREAM ERROR:", err);
            }

            // 💥 GUARANTEED fallback
            if (!hasOutput) {
                controller.enqueue(
                    new TextEncoder().encode(
                        "⚠️ Model returned no output (flash-lite limitation)"
                    )
                );
            }

            controller.close();
        }
    });




    return new Response(stream);
}