import { Input } from '@/components/ui/input'
import { Handle, Position } from '@xyflow/react'
import { Repeat } from 'lucide-react'
import React from 'react'

function WhileNode({data}: any) {
  return (
    <div className='relative flex flex-col gap-1 border border-violet-300 bg-white  p-1 px-2 rounded-sm shadow-sm'>
      <div className='flex gap-1 items-center '>
        <Handle id="target" type="target" position={Position.Left} />
        <Repeat className='text-violet-500 bg-violet-50 rounded-sm p-1 w-5 h-5' />
        <h2 className='text-violet-500 text-[8px]'>While</h2>
      </div>
      <div className='max-w-35 my-1 '>
        <Handle id="source" type="source" position={Position.Right} />
        <Input placeholder="While Condition" className='text-[6px]! h-5 border border-violet-300 rounded-[7px] bg-white' disabled />
      </div>
    </div>
  )
}
export default WhileNode