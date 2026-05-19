import { geminiai } from "@/config/geminiai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { flowData } = await req.json();

        const PROMPT = `
From this flow, Generate a agent instruction prompt with all details along with tools 
with all setting info in JSON format. Do not add any extra text just written JSON data. 

ONLY OUTPUT THIS FORMAT:
{
  "systemPrompt": "",
  "primaryAgentName": "",
  "agents": [{ "id": "", "name": "", "model": "", "instruction": "" }],
  "tools": [{ "id": "", "name": "", "description": "", "url": "", "includeApiKey": true, "apiKey": "", "parameters": { "key": "dataType" } }],
  "apiNodes": [{ "name": "", "url": "", "includeApiKey": true, "apiKey": "", "method": "GET" }]
}

Extract apiNodes from any nodes of type "ApiNode" in the flow. Copy their url, apiKey, includeApiKey, and name exactly as provided.

INPUT FLOW DATA: ${JSON.stringify(flowData)}
`;

        const result = await geminiai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: PROMPT,
            config: {
                responseMimeType: "application/json",
            },
        });

        const text =
            result.text ||
            result.candidates?.[0]?.content?.parts?.[0]?.text ||
            "";
        const cleanText = text.replace(/[`]{3}(?:json)?/gi, "").trim();
        let responseJSON;
        try {
            responseJSON = JSON.parse(cleanText);
        } catch (e) {
            console.error("Raw Gemini Output:", cleanText);

            return NextResponse.json(
                {
                    error: "Invalid JSON from AI",
                    raw: cleanText,
                },
                { status: 500 }
            );
        }
        if (!responseJSON) {
            return NextResponse.json(
                { error: "Empty AI response" },
                { status: 500 }
            );
        }

        return NextResponse.json(responseJSON);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}