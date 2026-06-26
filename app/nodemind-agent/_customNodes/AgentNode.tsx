import { Handle, Position } from '@xyflow/react'
import { MousePointer2 } from 'lucide-react'
import React from 'react'

function AgentNode({ data }: any) {
  return (
    <div className='flex gap-1 items-center border border-indigo-300 bg-white p-1 px-2 rounded-sm shadow-sm'>
      <MousePointer2 className='bg-indigo-50 text-indigo-500 rounded-sm p-1 w-5 h-5 cursor-pointer' />
      <div className='flex flex-col'>
        <h2 className='text-indigo-600 text-[8px]'>{data?.label}</h2>
        <p className='text-[6px] text-gray-500'>Agent</p>
      </div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  )
}

export default AgentNode