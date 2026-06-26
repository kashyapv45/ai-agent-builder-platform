"use client"
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../_components/Header'
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, BackgroundVariant, MiniMap, Controls, Panel, useOnSelectionChange, OnSelectionChangeParams } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import AgentsToolPanel from '../_components/AgentsToolPanel';
import NodeSettings from '../_components/NodeSettings';
import { WorkflowContext } from '@/context/WorkflowContext';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { AgentType } from '@/types/AgentType';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { nodeTypes } from '../_components/nodeTypes';

function AgentBuilder() {
    const { agentId } = useParams();
    const { addedNodes, setAddedNodes, nodeEdges, setNodeEdges, selectedNode, setSelectedNode } = useContext(WorkflowContext);

    const UpdateAgentDetails = useMutation(api.agent.UpdateAgentNodesAndEdges);
    const [agentDetails, setAgentDetails] = useState<AgentType>();
    const convex = useConvex();

    useEffect(() => {
        const GetAgentDetails = async () => {
            const result = await convex.query(api.agent.GetAgentById, {
                agentId: agentId as string
            });
            setAgentDetails(result);


            if (result) {
                if (result.nodes?.length > 0 || result.edges?.length > 0) {
                    setAddedNodes(result.nodes);
                    setNodeEdges(result.edges);
                }
            }
        };
        GetAgentDetails();
    }, [agentId, convex, setAddedNodes, setNodeEdges]);

    const UpdateAgentToolConfig = useMutation(api.agent.UpdateAgentToolConfig);

    const saveNodesData = async () => {
        if (!agentDetails?._id) return;

        await UpdateAgentDetails({
            id: agentDetails._id as any,
            nodes: addedNodes,
            edges: nodeEdges
        });

        // Clear stale tool config so preview forces regeneration
        await UpdateAgentToolConfig({
            id: agentDetails._id as any,
            agentToolConfig: null
        });

        toast.success('Agent Saved! Click "Reboot Agent" in preview to apply changes.');
    }

    const onNodesChange = useCallback(
        (changes: any) => setAddedNodes((prev: any) => applyNodeChanges(changes, prev)),
        [setAddedNodes]
    );

    const onEdgesChange = useCallback(
        (changes: any) => setNodeEdges((prev: any) => applyEdgeChanges(changes, prev)),
        [setNodeEdges]
    );

    const onConnect = useCallback(
        (params: any) => setNodeEdges((prev: any) => addEdge(params, prev)),
        [setNodeEdges]
    );
    const isValidConnection = useCallback(
        (connection: any) => connection.source !== connection.target,
        []
    );

    const onNodeSelect = useCallback(({
        nodes, edges
    }: OnSelectionChangeParams) => {
        setSelectedNode(nodes[0]);
        console.log(nodes[0]);
    }, [])

    useOnSelectionChange({
        onChange: onNodeSelect
    })
    return (
        <div className='bg-[#FAFAFA]'>
            <Header agentDetails={agentDetails} />
            <div style={{ width: '100vw', height: '92vh' }}>
                <ReactFlow
                    nodes={addedNodes || []}
                    edges={nodeEdges || []}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    isValidConnection={isValidConnection}
                    fitView
                    nodeTypes={nodeTypes}
                >
                    <Controls />
                    <Panel position="top-right">
                        <NodeSettings />
                    </Panel>
                    <Panel position="top-left">
                        <AgentsToolPanel />
                    </Panel>
                    <Panel position="bottom-center">
                        <Button onClick={saveNodesData} className="rounded-full gap-2 shadow-lg shadow-neutral-900/10 font-semibold bg-neutral-900 text-white hover:bg-neutral-800 px-6">
                            <Save className="w-4 h-4" /> Save
                        </Button>
                    </Panel>
                    <Background variant={BackgroundVariant.Dots} gap={15} size={1} />
                </ReactFlow>
            </div>
        </div>
    )
}

export default AgentBuilder