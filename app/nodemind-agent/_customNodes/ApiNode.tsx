import { Handle, Position } from '@xyflow/react'
import { Webhook } from 'lucide-react'
import React from 'react'

function ApiNode({ data }: any) {
  return (
    <div className='relative flex gap-1 items-center border border-[#E493B3] bg-white p-1 px-2 rounded-sm shadow-sm'>
      <Handle id="target" type="target" position={Position.Left} />
      <Webhook className='text-[#E493B3] bg-[#FFE6E6] rounded-sm p-1 w-5 h-5' />
      <div className='flex flex-col'>
        <h2 className='text-[#E493B3] text-[8px]'>{data?.label}</h2>
        <p className='text-[6px] text-gray-500'>API Call</p>
      </div>

      <Handle id="source" type="source" position={Position.Right} />
    </div>
  )
}
export default ApiNode