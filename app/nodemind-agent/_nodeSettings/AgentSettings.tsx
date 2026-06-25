import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { SelectTrigger } from '@radix-ui/react-select';
import { ChevronDown, FileJson } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { se } from 'date-fns/locale';
import { toast } from 'sonner';

function AgentSettings({ selectedNode, updateFormData }: any) {
    const [formData, setFormData] = useState({
        name: '',
        instructions: '',
        context: '',
        chatHistory: false,
        model: 'gemini-1.5-flash',
        output: 'text',
        jsonSchema: ''
    })

    useEffect(() => {
        setFormData(selectedNode?.data?.settings);
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
            <h2 className='font-bold text-lg'>My Agent</h2>
            <p className='text-sm text-muted-foreground mt-1'>
                Call your choice of AI model with instructions
            </p>
            <div className='mt-3 space-y-1'>
                <Label>Agent Name</Label>
                <Input type="text" className='w-full p-2 border rounded-md mt-2' placeholder='My Agent' value={formData?.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>
            <div className='mt-3 space-y-1'>
                <Label>Instructions</Label>
                <Textarea className='w-full p-2 border rounded-md mt-2' placeholder='Agent Instructions' value={formData?.instructions} onChange={(e) => handleChange('instructions', e.target.value)} />
                <h2 className='text-sm font-bold flex gap-2 mt-2 p-1 items-center'>Add Context <FileJson className='w-3 h-3' /></h2>
                <Textarea
                    className='w-full p-2 border rounded-md mt-2'
                    placeholder='Paste your knowledge base here... (e.g. curriculum, FAQs, product info, policies...)'
                    rows={6}
                    value={formData?.context || ''}
                    onChange={(e) => handleChange('context', e.target.value)}
                />
            </div>
            <div className='mt-3 flex justify-between items-center'>
                <Label>Include Chat History</Label>
                <Switch checked={formData?.chatHistory} onCheckedChange={(checked) => handleChange('chatHistory', checked)} />
            </div>
            <div className='mt-5 flex justify-between items-center'>
                <Label>Select AI Model</Label>
                <Select value={formData?.model} onValueChange={(value) => handleChange('model', value)}>
                    <SelectTrigger className='flex items-center justify-between w-40 h-8 border border-gray-100 text-sm rounded-sm p-1 px-2'>
                        <SelectValue placeholder="Select a model" />
                        <ChevronDown className='w-4 h-4 ml-2' />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                        <SelectGroup>
                            <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                            <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                            <SelectItem value="gemini-2.0-flash">Gemini 2.0 Flash</SelectItem>
                            <SelectItem value="gemini-2.0-flash-exp">Gemini 2.0 Flash Exp</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='mt-3'>
                <Label>Output Format</Label>
                <Tabs defaultValue="text" className="w-100 mt-3" value={formData?.output} onValueChange={(value) => handleChange('output', value)}>
                    <TabsList>
                        <TabsTrigger value="text">Text</TabsTrigger>
                        <TabsTrigger value="json">Json</TabsTrigger>
                    </TabsList>
                    <TabsContent value="text" className='text-sm text-gray-500 px-1'>Output will be in Text Format.</TabsContent>
                    <TabsContent value="json">
                        <Label className='text-sm text-gray-500 px-1'>Enter JSON Schema</Label>
                        <Textarea className='max-w-78 p-2 mt-2' placeholder='{title: string}' value={formData?.jsonSchema} onChange={(e) => handleChange('jsonSchema', e.target.value)} />
                    </TabsContent>
                </Tabs>
            </div>
            <Button className='mt-4 w-full' onClick={onSave}>Save</Button>
        </div>
    )
}

export default AgentSettings