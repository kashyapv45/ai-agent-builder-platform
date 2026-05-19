import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MyAgents from './MyAgents'

function AiAgentListTab() {
    return (
        <div className='p-2 md:px-10 lg:px-15 mt-20 bg-[#FBFBFB] rounded-lg'>
            <Tabs defaultValue="myagents" className="w-full">
                <TabsList>
                    <TabsTrigger value="myagents">My Agents</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>
                <TabsContent value="myagents"><MyAgents/></TabsContent>
                <TabsContent value="templates">Templates content goes here.</TabsContent>
            </Tabs>
        </div>
    )
}

export default AiAgentListTab