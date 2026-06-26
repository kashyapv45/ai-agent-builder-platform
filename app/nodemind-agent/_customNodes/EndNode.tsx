import { Handle, Position } from '@xyflow/react'
import { Square } from 'lucide-react'
import React from 'react'

function EndNode({data}: any) {
  return (
    <div className='flex gap-1 items-center border border-red-300 bg-white p-1 px-2 rounded-sm shadow-sm'>
            <Square className='text-red-500 bg-red-50 rounded-sm p-1 w-5 h-5' />
            <h2 className='text-red-500 text-[8px]'>End</h2>
            <Handle type="target" position={Position.Left} />
        </div>
  )
}

export default EndNode