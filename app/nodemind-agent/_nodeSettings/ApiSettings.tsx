"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import React, { useEffect, useState } from 'react'
import { ChevronDown, FileJson } from 'lucide-react'

function ApiSettings({ selectedNode, updateFormData }: any) {
    const [formData, setFormData] = useState({
        name: '',
        method: 'GET',
        url: '',
        apiKey: '',
        includeApiKey: true,
        bodyParams: ''
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
        console.log(formData);
        updateFormData(formData);
        toast.success('Node Settings Updated');
    }
    return (
        <div>
            <h2 className='font-bold text-lg'>API</h2>
            <p className='text-sm text-muted-foreground mt-1'>
                Call your choice of API endpoint with instructions.
            </p>
            {/* Name */}
            <div className='mt-3 space-y-1'>
                <Label>Name</Label>
                <Input
                    className='w-full p-2 border rounded-md mt-2'
                    placeholder='API Agent Name'
                    value={formData?.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                />
            </div>

            {/* Method */}
            <div className='mt-3 space-y-1'>
                <Label>Request Method</Label>
                <Select
                    value={formData?.method}
                    onValueChange={(value) => handleChange('method', value)}
                >
                    <SelectTrigger className='flex items-center justify-between w-40 h-8 border border-gray-100 text-sm rounded-sm p-1 px-2'>
                        <SelectValue placeholder="Select Method" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* URL */}
            <div className='mt-3 space-y-1'>
                <Label>API URL</Label>
                <Input
                    className='w-full p-2 border rounded-md mt-2'
                    placeholder='https://api.example.com/data'
                    value={formData?.url}
                    onChange={(e) => handleChange('url', e.target.value)}
                />
            </div>

            {/* API Key */}
            <div className='mt-3 flex justify-between items-center'>
                <Label>Include API Key</Label>
                <Switch
                    checked={formData?.includeApiKey}
                    onCheckedChange={(checked) => handleChange('includeApiKey', checked)}
                />
            </div>

            {formData?.includeApiKey && (
                <div className='mt-3 space-y-1'>
                    <Label>API Key</Label>
                    <Input
                        className='w-full p-2 border rounded-md mt-2'
                        type="password"
                        placeholder='Enter API Key'
                        value={formData?.apiKey}
                        onChange={(e) => handleChange('apiKey', e.target.value)}
                    />
                </div>
            )}

            {/* Body Params (Only for POST) */}
            {formData?.method === 'POST' && (
                <div className='mt-3 space-y-1'>
                    <Label>Body Parameters (JSON)</Label>
                    <Textarea
                        placeholder='{ "param1": "value1", "param2": "value2" }'
                        value={formData?.bodyParams}
                        onChange={(e) => handleChange('bodyParams', e.target.value)}
                    />
                    <h2 className='text-sm p-1 flex gap-2 items-center'>
                        Add Body Params <FileJson className='h-3 w-3' />
                    </h2>
                </div>
            )}

            <Button className='w-full mt-4' onClick={onSave}>Save</Button>
        </div>
    )
}

export default ApiSettings
