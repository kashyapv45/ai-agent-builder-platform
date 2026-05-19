import React, { createElement, useContext } from 'react'
import { Merge, MousePointer, Repeat, Square, ThumbsUp, Webhook } from 'lucide-react'
import { WorkflowContext } from '@/context/WorkflowContext';

const AgentTools = [
    {
        name: 'Agent',
        icon: MousePointer,
        bgColor: '#FCE7C8',
        textColor: '#D97D55',
        id: 'agent',
        type: 'AgentNode',
    },
    {
        name: 'End',
        icon: Square,
        bgColor: '#F9DFDF',
        textColor: '#FD7979',
        id: 'end',
        type: 'EndNode',
    },
    {
        name: 'If/Else',
        icon: Merge,
        bgColor: '#C5D3E8',
        textColor: '#6D94C5',
        type: 'IfElseNode',
        id: 'ifElse',
    },
    {
        name: 'While',
        icon: Repeat,
        bgColor: '#748DAE',
        textColor: '#213C51',
        id: 'while',
        type: 'WhileNode',

    },
    {
        name: 'User Approval',
        icon: ThumbsUp,
        bgColor: '#E1E9C9',
        textColor: '#89986D',
        id: 'approval',
        type: 'UserApprovalNode',

    },
    {
        name: 'API',
        icon: Webhook,
        bgColor: '#FFE6E6',
        textColor: '#E493B3',
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
        <div className='bg-[#F5F5F0]/1 backdrop-blur-sm p-5 rounded-2xl shadow'>
            <h2 className='text-xl font-bold text-[#213C51] mb-4'>AI Tools Panel</h2>
            <div className='flex flex-col gap-4'>
                {AgentTools.map((tool, index) => (
                    <div
                        key={index}
                        className='flex gap-1 items-center border bg-white p-1 px-2 rounded-sm cursor-pointer w-full'
                        style={{ borderColor: tool.textColor }}
                        draggable onClick={() => onAgentToolClick(tool)}
                    >
                        {createElement(tool.icon, {
                            className: 'rounded-sm p-3 w-10 h-10',
                            style: {
                                color: tool.textColor,
                                backgroundColor: tool.bgColor
                            }
                        })}
                        <h2 className='text-md ml-3' style={{ color: tool.textColor }}>
                            {tool.name}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AgentsToolPanel