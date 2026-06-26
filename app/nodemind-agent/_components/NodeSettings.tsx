import { WorkflowContext } from '@/context/WorkflowContext';
import { se } from 'date-fns/locale';
import React, { useContext } from 'react'
import AgentSettings from '../_nodeSettings/AgentSettings';
import { Settings } from 'lucide-react';
import EndSettings from '../_nodeSettings/EndSettings';
import WhileSettings from '../_nodeSettings/WhileSettings';
import ApiSettings from '../_nodeSettings/ApiSettings';
import UserApprovalSettings from '../_nodeSettings/UserApprovalSettings';
import IfElseSettings from '../_nodeSettings/IfElseSettings';

function NodeSettings() {

  const { selectedNode, setAddedNodes } = useContext(WorkflowContext);

  const onUpdateNodeData = (formData: any) => {
    const updatedNode = {
      ...selectedNode,
      data: {
        ...selectedNode.data,
        label: formData.name,
        settings: formData
      }
    }
    setAddedNodes((prevNode: any) =>
      prevNode.map((node: any) =>
        node.id === selectedNode.id ? updatedNode : node))
  }


  return selectedNode && (
    <div className='p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-neutral-200/60 shadow-lg shadow-neutral-900/5 ring-1 ring-black/5 w-[20vw] max-h-[90vh] overflow-y-auto overflow-x-hidden'>
      {selectedNode?.type === 'AgentNode' && <AgentSettings selectedNode={selectedNode} updateFormData={(value: any) => onUpdateNodeData(value)} />}
      {selectedNode?.type == 'EndNode' && <EndSettings selectedNode={selectedNode} updateFormData={(value: any) => onUpdateNodeData(value)} />}
      {selectedNode?.type == 'WhileNode' && <WhileSettings selectedNode={selectedNode} updateFormData={(value: any) => onUpdateNodeData(value)} />}
      {selectedNode?.type == 'ApiNode' && <ApiSettings selectedNode={selectedNode} updateFormData={(value: any) => onUpdateNodeData(value)} />}
      {selectedNode?.type == 'UserApprovalNode' && <UserApprovalSettings selectedNode={selectedNode} updateFormData={(value: any) => onUpdateNodeData(value)} />}
      {selectedNode?.type == 'IfElseNode' && <IfElseSettings selectedNode={selectedNode} updateFormData={(value: any) => onUpdateNodeData(value)} />}

    </div>
  )
}

export default NodeSettings