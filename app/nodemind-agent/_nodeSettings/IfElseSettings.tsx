import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function IfElseSettings({ selectedNode, updateFormData }: any) {
    const [formData, setFormData] = useState({
            ifCondition: ''
        })
    
        useEffect(() => {
            selectedNode && setFormData(selectedNode?.data?.settings)
        }, [selectedNode])
    const onSave = () => {
        updateFormData(formData)
        toast.success('Node Settings Updated');
    }
    return (
        <div>
             <h2 className='font-bold text-lg'>If / Else</h2>
            <p className='text-sm text-muted-foreground mt-1'>
                Create conditional logic in your workflow.
            </p>
            <div className='mt-3 space-y-1'>
                <Label>If</Label>
                <Input type="text" className='w-full p-2 border rounded-md mt-2' placeholder='ex. condition==`value`' 
                value={formData?.ifCondition || ''} onChange={(e) => setFormData({ ...formData, ifCondition: e.target.value })} />
            </div>
            <Button className='mt-4 w-full' onClick={onSave}>Save</Button>
        </div>
    )
}

export default IfElseSettings