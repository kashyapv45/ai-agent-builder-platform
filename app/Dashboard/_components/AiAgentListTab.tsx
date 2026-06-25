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
                <TabsContent value="templates">
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <h3 className="text-xl font-bold text-neutral-800">Templates Coming Soon</h3>
                        <p className="text-sm mt-2 max-w-sm text-neutral-500">
                            We are currently building a library of pre-configured AI Agents to jumpstart your workflows. Stay tuned!
                        </p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AiAgentListTab