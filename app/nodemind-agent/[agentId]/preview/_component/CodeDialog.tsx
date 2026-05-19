import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import type { BundledLanguage } from '@/components/ai/code-block';
import {
    CodeBlock,
    CodeBlockBody,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockFilename,
    CodeBlockFiles,
    CodeBlockHeader,
    CodeBlockItem,
    CodeBlockSelect,
    CodeBlockSelectContent,
    CodeBlockSelectItem,
    CodeBlockSelectTrigger,
    CodeBlockSelectValue,
} from '@/components/ai/code-block';

type Props = {
    openDialog: boolean,
    setOpenDialog: (open: boolean) => void
}

const demoCode = [
    {
        language: "tsx",
        filename: "Button.tsx",
        code: `// 1. Add user message AND the blank assistant placeholder in one go
setMessages((prev) => [
    ...prev,
    { role: 'user', content: currentInput },
    { role: 'assistant', content: '' }
]);

// 2. Compile the existing messages into a single memory string
const chatHistory = messages
    .filter(msg => msg.content) // Ignore empty placeholders
    .map(msg => \`\${msg.role === 'user' ? 'User' : 'Assistant'}: \${msg.content}\`)
    .join('\\n');

// 3. Inject the memory into the prompt if history exists
const contextAwareInput = chatHistory.length > 0
    ? \`Here is our conversation history so far:\\n\${chatHistory}\\n\\nNow, answer this new message:\\nUser: \${currentInput}\`
    : currentInput;

const res = await fetch('https://nodemind.ai/api/agent-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    agentId:<agentId>,
    userId:<userId>,
    userInput:<userInput>
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
        //Process Chunk...
    }
}`,
    },
]

function CodeDialog({ openDialog, setOpenDialog }: Props) {
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="sm:max-w-2xl min-w-3xl h-[90vh] flex flex-col p-0 overflow-hidden my-5 bg-[#F6F8FA] backdrop-blur-sm rounded-2xl shadow">
                <DialogHeader className="p-6 pb-2 shrink-0">
                    <DialogTitle className='text-2xl font-bold'>Get Code</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-hidden px-6 pb-6"> 
                    <CodeBlock
                        data={demoCode}
                        defaultValue={demoCode[0].language}
                        className='flex flex-col h-full bg-background/80 border shadow-sm'
                    >
                        <CodeBlockHeader className="shrink-0">
                            <CodeBlockFiles>
                                {item => (
                                    <CodeBlockFilename key={item.language} value={item.language}>
                                        {item.filename}
                                    </CodeBlockFilename>
                                )}
                            </CodeBlockFiles>
                            <CodeBlockCopyButton />
                        </CodeBlockHeader>

                        <CodeBlockBody className="flex-1 overflow-auto">
                            {item => (
                                <CodeBlockItem key={item.language} value={item.language}>
                                    <CodeBlockContent language={item.language}>
                                        {item.code}
                                    </CodeBlockContent>
                                </CodeBlockItem>
                            )}
                        </CodeBlockBody>
                    </CodeBlock>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CodeDialog