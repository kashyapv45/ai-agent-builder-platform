"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import { WorkflowContext } from '@/context/WorkflowContext';
import { api } from '@/convex/_generated/api';
import { useUser, useAuth } from '@clerk/nextjs'; // Added useAuth
import { ReactFlowProvider } from '@xyflow/react';
import { useMutation } from 'convex/react';
import React, { useEffect, useState } from 'react'

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  const { has } = useAuth(); // Access Clerk's permission helper
  const createuser = useMutation(api.user.CreateNewUser);
  const [userDetails, setUserDetails] = useState<any>();
  const [selectedNode, setSelectedNode] = useState<any>();
  const resetMonthlyTokens = useMutation(api.user.ResetMonthlyTokens);
  const [addedNodes, setAddedNodes] = useState([{
    id: 'Start',
    position: { x: 0, y: 0 },
    data: { label: 'Start Node' },
    type: 'StartNode'
  }]);

  const [nodeEdges, setNodeEdges] = useState([]);

  // Determine the plan string to send to Convex
  const userPlan = has?.({ plan: 'ultimate_plan' }) ? 'ultimate' : 
                   has?.({ plan: 'pro_plan' }) ? 'pro' : 'free';

  useEffect(() => {
    if (user) {
      CreateAndGetUser();
    }
  }, [user]);

  const CreateAndGetUser = async () => {
  if (user) {
    // 1. Ensure user exists/is created
    const result = await createuser({
      name: user.fullName ?? '',
      email: user.primaryEmailAddress?.emailAddress ?? '',
      plan: userPlan 
    });

    // 2. Trigger the monthly reset check
    const refreshedTokens = await resetMonthlyTokens({
      email: user.primaryEmailAddress?.emailAddress ?? '',
      plan: userPlan
    });

    setUserDetails({ ...result, token: refreshedTokens });
  }
}

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <ReactFlowProvider>
        <WorkflowContext.Provider value={{ addedNodes, setAddedNodes, nodeEdges, setNodeEdges, selectedNode, setSelectedNode }}>
          <div>{children}</div>
        </WorkflowContext.Provider>
      </ReactFlowProvider>
    </UserDetailContext.Provider>
  )
}

export default Provider