import { Handle, Position } from '@xyflow/react'
import { Square } from 'lucide-react'
import React from 'react'

function EndNode({data}: any) {
  return (
    <div className='flex gap-1 items-center border border-[#FD7979] bg-white p-1 px-2 rounded-sm'>
            <Square className='text-[#FD7979] bg-[#F9DFDF] rounded-sm p-1 w-5 h-5' />
            <h2 className='text-[#FD7979] text-[8px]'>End</h2>
            <Handle type="target" position={Position.Left} />
        </div>
  )
}

export default EndNode