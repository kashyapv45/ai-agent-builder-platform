"use client"
import React, { useEffect, useState } from 'react'
import Header from '../../_components/Header'
import { AgentType } from '@/types/AgentType'
import { useConvex, useMutation } from 'convex/react'
import '@xyflow/react/dist/style.css';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Background, BackgroundVariant, ReactFlow } from '@xyflow/react';
import { nodeTypes } from '../../_components/nodeTypes';
import axios from 'axios';
import { set } from 'date-fns'
import { Button } from '@/components/ui/button'
import { RefreshCcw, RefreshCcwIcon, Send, Sparkles } from 'lucide-react'
import ChatUI from './_component/ChatUI'
import CodeDialog from './_component/CodeDialog'
import { se } from 'date-fns/locale'
import { toast } from 'sonner'
type Props = {
  agentDetails: AgentType
}
function PreviewAgent() {

  const convex = useConvex();
  const { agentId } = useParams();
  const [agentDetails, setAgentDetails] = useState<AgentType>();
  const [flowConfig, setFlowConfig] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const updateAgentToolConfig = useMutation(api.agent.UpdateAgentToolConfig);
  const [conversationId, setConversationId] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const publishAgent = useMutation(api.agent.PublishAgent);
  
  useEffect(() => {
    GetAgentDetails();
  }, []);

  const GetAgentDetails = async () => {
    const result = await convex.query(api.agent.GetAgentById, {
      agentId: agentId as string
    });
    setAgentDetails(result);

    //Get Conversation ID for chat
    const conversationIDResponse = await axios.get('/api/agent-chat');
    setConversationId(conversationIDResponse.data.id);
  }

  useEffect(() => {
    if (agentDetails) {
      GenerateWorkflow()
    }
  }, [agentDetails])

  const GenerateWorkflow = () => {
    const edgeMap = agentDetails?.edges?.reduce((acc: any, edge: any) => {
      if (!acc[edge.source]) acc[edge.source] = [];
      acc[edge.source].push(edge);
      return acc;
    }, {});

    const flow = agentDetails?.nodes?.map((node: any) => {
      const connectedEdges = edgeMap[node.id] || [];
      let next: any = null;

      switch (node.type) {
        case "IfElseNode": {
          const ifEdge = connectedEdges.find((e: any) => e.sourceHandle === "if");
          const elseEdge = connectedEdges.find((e: any) => e.sourceHandle === "else");

          next = {
            if: ifEdge?.target || null,
            else: elseEdge?.target || null,
          };
          break;
        }

        case "AgentNode": {
          if (connectedEdges.length === 1) {
            next = connectedEdges[0].target;
          } else if (connectedEdges.length > 1) {
            next = connectedEdges.map((e: any) => e.target);
          }
          break;
        }

        case "ApiNode": {
          if (connectedEdges.length === 1) {
            next = connectedEdges[0].target;
          }
          break;
        }
        case "UserApprovalNode": {
          if (connectedEdges.length === 1) {
            next = connectedEdges[0].target;
          }
          break;
        }

        case "StartNode": {
          if (connectedEdges.length === 1) {
            next = connectedEdges[0].target;
          }
          break;
        }

        case "EndNode": {
          next = null;
          break;
        }

        default: {
          if (connectedEdges.length === 1) {
            next = connectedEdges[0].target;
          } else if (connectedEdges.length > 1) {
            next = connectedEdges.map((e: any) => e.target);
          }
          break;
        }
      }

      return {
        id: node.id,
        type: node.type,
        label: node.data?.label || node.type,
        settings: node.data?.settings || {},
        next,
      };
    });

    const startNode = agentDetails?.nodes?.find((n: any) => n.type === "StartNode");

    const config = {
      startNode: startNode?.id || null,
      flow,
    };
    setFlowConfig(config);
  }

  const GenerateAgentToolConfig = async () => {
    setLoading(true);
    const result = await axios.post('/api/generate-api-tool-config', {
      flowData: flowConfig
    });
    await updateAgentToolConfig({
      id: agentDetails?._id as any,
      agentToolConfig: result.data
    })
    GetAgentDetails();
    setLoading(false);
  }
  const OnPublish = async () => {
    if (!agentDetails?._id) return;

    try {
      setLoading(true);
      
      await publishAgent({
        id: agentDetails._id as any,
        published: true
      });
      
      setAgentDetails((prev: any) => ({ ...prev, published: true }));
      
      toast.success("Agent published successfully!");
      setOpenDialog(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish agent.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header
        previewHeader={true}
        agentDetails={agentDetails}
        onPublish={OnPublish}
      />
      <div className='grid grid-cols-4 gap-1 p-2'>
        <div className='col-span-3 p-0.5 border-2 rounded-2xl'>
          <div style={{ width: '100%', height: '89vh' }}>

            <ReactFlow
              nodes={agentDetails?.nodes || []}
              edges={agentDetails?.edges || []}
              fitView
              nodeTypes={nodeTypes}
              draggable={false}
            >
              <h2 className='p-2 font-bold ml-2'>Preview</h2>
              <Background variant={BackgroundVariant.Dots} gap={15} size={1} />
            </ReactFlow>
          </div>
        </div>
        {!agentDetails?.agentToolConfig ? (
          <div className='col-span-1 p-2 border-2 rounded-2xl bg-white' style={{ height: '90vh' }}>
            <div className='flex items-center justify-center h-full'>
              <Button onClick={GenerateAgentToolConfig} disabled={loading}>
                <RefreshCcw className={`${loading && 'animate-spin'} mr-2 w-4 h-4`} /> Reboot Agent
              </Button>
            </div>
          </div>
        ) :
          <ChatUI
            GenerateAgentToolConfig={GenerateAgentToolConfig}
            loading={loading}
            agentDetails={agentDetails}
            conversationId={conversationId}
          />
        }
      </div>
      <CodeDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  )
}

export default PreviewAgent