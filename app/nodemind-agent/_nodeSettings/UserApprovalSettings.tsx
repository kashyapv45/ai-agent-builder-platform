import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function UserApprovalSettings({ selectedNode, updateFormData }: any) {
    const [formData, setFormData] = useState({
                name: '',
                message: ''
            })
        
            useEffect(() => {
                selectedNode && setFormData(selectedNode?.data?.settings)
            }, [selectedNode])

            const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const onSave = () => {
        updateFormData(formData);
        toast.success('Node Settings Updated');
    }
    return (
        <div>
            <h2 className='font-bold text-lg'>User Approval</h2>
            <p className='text-sm text-muted-foreground mt-1'>
                Request user approval before proceeding.
            </p>
            <div className='mt-3 space-y-1'>
                <Label>Name</Label>
                <Input type="text" className='w-full p-2 border rounded-md mt-2' placeholder='Name' value={formData?.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>
            <div className='mt-3 space-y-1'>
                <Label>Message</Label>
                <Textarea className='w-full p-2 border rounded-md mt-2' placeholder='Describe the approval request' value={formData?.message} onChange={(e) => handleChange('message', e.target.value)} />

            </div>
            <Button className='mt-4 w-full' onClick={onSave}>Save</Button>
        </div>
    )
}

export default UserApprovalSettings