import { Handle, Position } from '@xyflow/react'
import { Play } from 'lucide-react'
import React from 'react'

function StartNode({data}: any) {
    return (
        <div className='relative flex gap-1 items-center border border-emerald-300 bg-white shadow-sm p-1 px-2 rounded-sm'>
            <Play className='text-emerald-500 bg-emerald-50 rounded-sm p-1 w-5 h-5' />
            <h2 className='text-emerald-500 text-[8px]'>Start</h2>
            <Handle type="source" position={Position.Right} />
        </div>
    )
}

export default StartNode