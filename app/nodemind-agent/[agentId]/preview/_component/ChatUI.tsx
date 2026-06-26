import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2Icon, RefreshCcw, Send, Sparkles } from 'lucide-react'
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
        <div className='flex flex-col w-full h-[90vh] rounded-2xl border border-neutral-200/80 bg-white shadow-sm overflow-hidden'>

            {/* Header */}
            <div className='flex items-center justify-between px-5 py-3 border-b border-neutral-100 bg-white'>
                <div className='flex items-center gap-2'>
                    <Sparkles className='w-4 h-4 text-indigo-500' />
                    <h2 className='text-sm font-bold text-neutral-900 tracking-tight'>{agentDetails?.name}</h2>
                </div>
                <Button onClick={GenerateAgentToolConfig} disabled={loading} variant="outline" size="sm" className="rounded-full gap-2 text-xs font-semibold">
                    <RefreshCcw className={`${loading && 'animate-spin'} w-3.5 h-3.5`} /> Reboot
                </Button>
            </div>

            {/* Messages */}
            <div className='flex-1 overflow-y-auto p-5 space-y-4 flex flex-col w-full bg-[#FAFAFA]'>
                {messages.length === 0 && (
                    <div className='flex-1 flex flex-col items-center justify-center text-center'>
                        <Sparkles className='w-8 h-8 text-neutral-300 mb-3' />
                        <p className='text-sm text-neutral-400 font-medium'>Start a conversation with your agent</p>
                    </div>
                )}

                {messages.map((msg, index) => (
                    msg.content && (
                        <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed ${msg.role === 'user' ? 'self-end bg-neutral-900 text-white' : 'self-start bg-white border border-neutral-200/80 text-neutral-700 shadow-sm'}`} key={index}>
                            <div className='flex flex-col gap-2'>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {msg.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    )
                ))}


                {/* Loading state */}
                {loadingMsg && (
                    <div className='flex items-center gap-3 self-start p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-sm'>
                        <div className='animate-spin rounded-full h-4 w-4 border-2 border-neutral-200 border-t-indigo-500'></div>
                        <span className='text-sm text-neutral-500 font-medium'>Thinking...</span>
                    </div>
                )}
            </div>

            {/* Footer Input */}
            <div className='px-4 py-3 border-t border-neutral-100 bg-white'>
                <div className='flex items-center gap-2.5'>
                    <Textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder='Type your message...'
                        className='flex-1 border-neutral-200/80 rounded-xl resize-none bg-[#FAFAFA] focus:bg-white transition-colors text-sm'
                        rows={1}
                    />
                    <Button onClick={OnMsgSend} disabled={loadingMsg || !userInput.trim().length || !conversationId} size="sm" className="rounded-full h-9 w-9 p-0 shadow-sm">
                        {loadingMsg ? <Loader2Icon className='animate-spin w-4 h-4' /> : <Send className='w-4 h-4' />}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChatUI