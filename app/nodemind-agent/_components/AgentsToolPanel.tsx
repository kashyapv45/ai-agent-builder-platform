import React, { createElement, useContext } from 'react'
import { Merge, MousePointer, Repeat, Square, ThumbsUp, Webhook } from 'lucide-react'
import { WorkflowContext } from '@/context/WorkflowContext';

const AgentTools = [
    {
        name: 'Agent',
        icon: MousePointer,
        bgColor: '#EEF2FF',
        textColor: '#6366F1',
        id: 'agent',
        type: 'AgentNode',
    },
    {
        name: 'End',
        icon: Square,
        bgColor: '#FEE2E2',
        textColor: '#EF4444',
        id: 'end',
        type: 'EndNode',
    },
    {
        name: 'If/Else',
        icon: Merge,
        bgColor: '#FEF3C7',
        textColor: '#F59E0B',
        type: 'IfElseNode',
        id: 'ifElse',
    },
    {
        name: 'While',
        icon: Repeat,
        bgColor: '#EDE9FE',
        textColor: '#8B5CF6',
        id: 'while',
        type: 'WhileNode',

    },
    {
        name: 'User Approval',
        icon: ThumbsUp,
        bgColor: '#D1FAE5',
        textColor: '#10B981',
        id: 'approval',
        type: 'UserApprovalNode',

    },
    {
        name: 'API',
        icon: Webhook,
        bgColor: '#E0F2FE',
        textColor: '#0EA5E9',
        id: 'api',
        type: 'ApiNode',

    },
];

function AgentsToolPanel() {

    const { addedNodes, setAddedNodes, addedNodeEdges, setAddedNodeEdges } = useContext(WorkflowContext);
    const onAgentToolClick = (tool: any) => {
        const newNode = {
            id: crypto.randomUUID(),
            position: { x: 0, y: 100 },
            data: { label: tool.name, bgColor: tool.bgColor, textColor: tool.textColor, id: tool.id, type: tool.type },
            type: tool.type
        };
        setAddedNodes((prevNodes: any[]) => [...prevNodes, newNode]);
    };
    return (
        <div className='bg-white/80 backdrop-blur-xl border border-neutral-200/60 p-5 rounded-2xl shadow-lg shadow-neutral-900/5 ring-1 ring-black/5'>
            <h2 className='text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4'>AI Tools</h2>
            <div className='flex flex-col gap-2.5'>
                {AgentTools.map((tool, index) => (
                    <div
                        key={index}
                        className='group flex gap-3 items-center border border-neutral-200/80 bg-white hover:bg-neutral-50 p-2 px-3 rounded-xl cursor-pointer w-full transition-all hover:shadow-sm hover:-translate-y-0.5'
                        draggable onClick={() => onAgentToolClick(tool)}
                    >
                        {createElement(tool.icon, {
                            className: 'rounded-lg p-2 w-9 h-9 transition-transform group-hover:scale-110',
                            style: {
                                color: tool.textColor,
                                backgroundColor: tool.bgColor
                            }
                        })}
                        <h2 className='text-sm font-semibold text-neutral-700'>
                            {tool.name}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AgentsToolPanel