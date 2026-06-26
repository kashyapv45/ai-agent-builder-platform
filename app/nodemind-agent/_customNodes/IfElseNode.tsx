import { Input } from '@/components/ui/input'
import { Handle, Position } from '@xyflow/react'
import { Merge } from 'lucide-react'
import React from 'react'

function IfElseNode({data}: any) {
    return (
        <div className='relative flex flex-col gap-1 border border-amber-300 bg-white  p-1 px-2 rounded-sm shadow-sm'>
            <div className='flex gap-1 items-center '>
                <Handle id="target" type="target" position={Position.Left} className='w-3 h-3 rounded-full border-2 bg-slate-800' />
                <Merge className='text-amber-500 bg-amber-50 rounded-sm p-1 w-5 h-5' />
                <h2 className='text-amber-500 text-[8px]'>If/Else Condition</h2>
            </div>
            <div className='max-w-35 my-1 '>
                <Input placeholder="If Condition" className='text-[6px]! h-5 border border-amber-300 rounded-[7px] bg-white' disabled/>
                <Input placeholder="Else Condition" className='text-[6px]! h-5 border border-amber-300 rounded-[7px] bg-white mt-1' disabled/>
                <Handle id={"if"} type="source" position={Position.Right} style={{ top: '55%' }} />
                <Handle id={"else"} type="source" position={Position.Right} style={{ top: '80%' }} />
            </div>
        </div>
    )
}
export default IfElseNode