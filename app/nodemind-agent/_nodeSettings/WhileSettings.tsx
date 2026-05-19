import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function WhileSettings({ selectedNode, updateFormData }: any) {
    const [formData, setFormData] = useState({
            whileCondition: ''
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
             <h2 className='font-bold text-lg'>While</h2>
            <p className='text-sm text-muted-foreground mt-1'>
                Create a loop that continues while a condition is true.
            </p>
            <div className='mt-3 space-y-1'>
                <Label>While</Label>
                <Input type="text" className='w-full p-2 border rounded-md mt-2' placeholder='ex. condition==`value`' 
                value={formData?.whileCondition || ''} onChange={(e) => setFormData({ ...formData, whileCondition: e.target.value })} />
            </div>
            <Button className='mt-4 w-full' onClick={onSave}>Save</Button>
        </div>
    )
}

export default WhileSettings