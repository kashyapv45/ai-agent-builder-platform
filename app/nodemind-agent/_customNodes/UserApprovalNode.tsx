import { Button } from '@/components/ui/button'
import { Handle, Position } from '@xyflow/react'
import { ThumbsUp } from 'lucide-react'
import React from 'react'

function UserApprovalNode({data}: any) {
  return (
    <div className='relative flex flex-col gap-1 border border-emerald-300 bg-white  p-1 px-2 rounded-sm shadow-sm'>
            <div className='flex gap-1 items-center '>
                <Handle id="target" type="target" position={Position.Left} className='w-3 h-3 rounded-full border-2 bg-slate-800' />
                <ThumbsUp className='text-emerald-500 bg-emerald-50 rounded-sm p-1 w-5 h-5' />
                <h2 className='text-emerald-600 text-[8px]'>User Approval</h2>
            </div>
            <div className='max-w-30 my-1 flex flex-col gap-1'>
                <Button className='text-[6px]! h-5 border border-emerald-300 rounded-[7px] cursor-pointer text-emerald-700 bg-white' disabled variant={'outline'}>Approve</Button>
                <Button className='text-[6px]! h-5 border border-emerald-300 rounded-[7px] cursor-pointer text-emerald-700 bg-white' disabled variant={'outline'}>Reject</Button>
                <Handle id={"approve"} type="source" position={Position.Right} style={{ top: '55%' }} />
                <Handle id={"reject"} type="source" position={Position.Right} style={{ top: '80%' }} />
            </div>
        </div>
  )
}
export default UserApprovalNode