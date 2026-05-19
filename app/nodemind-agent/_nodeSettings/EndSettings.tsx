import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function EndSettings({ selectedNode, updateFormData }: any) {

    const [formData, setFormData] = useState({
        textoutput: 'text',
        schema: ''
    })
    const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    useEffect(() => {
        selectedNode && setFormData(selectedNode?.data?.settings)
    }, [selectedNode])

    const onSave = () => {
        updateFormData(formData)
        toast.success('Node Settings Updated');
    }

    return (
        <div>
            <h2 className='font-bold text-lg'>
                End
            </h2>
            <p className='text-sm text-muted-foreground mt-1'>
                Choose the workflow's final output.
            </p>
            <div className='mt-3 space-y-1'>
                <Label>Output Format</Label>
                <Tabs defaultValue="text" className="w-100 mt-3" value={formData?.textoutput} onValueChange={(value) => handleChange('textoutput', value)}>
                    <TabsList>
                        <TabsTrigger value="text">Text</TabsTrigger>
                        <TabsTrigger value="json">Json</TabsTrigger>
                    </TabsList>
                    <TabsContent value="text" className='text-sm text-gray-500 px-1'>Output will be in Text Format.</TabsContent>
                    <TabsContent value="json">
                        <Label className='text-sm text-gray-500 px-1'>Enter JSON Schema</Label>
                        <Textarea className='max-w-78 p-2 mt-2' placeholder='{title: string}' value={formData?.schema} onChange={(e) => setFormData({ ...formData, schema: e.target.value })} />
                    </TabsContent>
                </Tabs>
            </div>
            <Button className='mt-4 w-full' onClick={onSave}>Save</Button>
        </div>
    )
}

export default EndSettings