import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2Icon, RefreshCcw, Send } from 'lucide-react'
import React, { useState } from 'react'
import { Separator } from "@/components/ui/separator"
import { AgentType } from '@/types/AgentType'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
    GenerateAgentToolConfig: () => void,
    loading: boolean,
    agentDetails?: AgentType,
    conversationId: string | null,
}

function ChatUI({ GenerateAgentToolConfig, loading, agentDetails, conversationId }: Props) {

    const [userInput, setUserInput] = useState<string>("");
    const [loadingMsg, setLoadingMsg] = useState(false);
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

    const OnMsgSend = async () => {
        if (!userInput.trim()) return;

        setLoadingMsg(true);
        const currentInput = userInput;
        setUserInput("");

        // 1. Add user message AND the blank assistant placeholder in one go
        setMessages((prev) => [
            ...prev,
            { role: 'user', content: currentInput },
            { role: 'assistant', content: '' }
        ]);

        const res = await fetch('/api/agent-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: agentDetails?.userId,
                agentId: agentDetails?.agentId,
                userInput: currentInput,    // ← raw input only, no history injection
            })
        });
        if (!res.body) return;
        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        let botReply = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            if (value) {
                const chunkValue = decoder.decode(value, { stream: true });
                botReply += chunkValue; // ← += not =

                setMessages((prev) => {
                    const updatedMessages = [...prev];
                    updatedMessages[updatedMessages.length - 1] = {
                        role: 'assistant',
                        content: botReply
                    };
                    return updatedMessages;
                });
            }
        }
        setLoadingMsg(false);
    }

    return (
        <div className='p-4 flex flex-col w-full h-[90vh]  border-2 rounded-2xl'>

            <div className='flex items-center justify-between mb-1 p-1'>
                <h2>{agentDetails?.name}</h2>
                <Button onClick={GenerateAgentToolConfig} disabled={loading}>
                    <RefreshCcw className={`${loading && 'animate-spin'} mr-2 w-4 h-4`} /> Reboot Agent
                </Button>
            </div>
            <Separator />
            <div className='flex-1 overflow-y-auto p-4 space-y-5 flex flex-col w-full h-full'>

                {messages.map((msg, index) => (
                    msg.content && (
                        <div className={`p-3 flex rounded-lg max-w-[80%] text-black ${msg.role === 'user' ? 'self-end bg-gray-100 border' : 'self-start bg-gray-200 border'}`} key={index}>
                            <div className='text-sm flex flex-col gap-2'>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {msg.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    )
                ))}


                {/* Loading state */}
                {loadingMsg && (
                    <div className='flex justify-center items-center p-4 gap-3'>
                        <div className='animate-spin rounded-full h-6 w-6 border-2 border-zinc-300 border-t-zinc-800'></div>
                        <span className='text-sm text-zinc-600 font-medium'>Thinking... Working on your request</span>
                    </div>
                )}
            </div>
            <Separator />
            {/* Footer Input */}
            <div className='p-1 mt-3 flex items-center gap-2'>
                <Textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder='Type your message here...'
                    className='flex-1 p-1 border rounded resize-none'
                    rows={1}
                />
                <Button onClick={OnMsgSend} disabled={loadingMsg || !userInput.trim().length || !conversationId}>
                    {loadingMsg ? <Loader2Icon className='animate-spin' /> : <Send />}
                </Button>
            </div>
        </div>
    )
}

export default ChatUI