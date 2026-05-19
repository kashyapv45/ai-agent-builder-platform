"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { AgentType } from '@/types/AgentType';
import { useConvex } from 'convex/react';
import { GitBranchPlus } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';

function MyAgents() {
  const bgColors = ['bg-orange-200', 'bg-blue-200', 'bg-green-200', 'bg-red-200', 'bg-purple-200'];
  const textColors = ['text-yellow-800', 'text-blue-800', 'text-green-800', 'text-red-800', 'text-purple-800'];
  const { userDetails } = useContext(UserDetailContext);
  const [agentList, setAgentList] = useState<AgentType[]>();
  const convex = useConvex();

  useEffect(() => {
    userDetails && GetUserAgents();
  }, [userDetails])

  const GetUserAgents = async () => {
    const result = await convex.query(api.agent.GetUserAgents, {
      userId: userDetails?._id
    });
    console.log(result);
    setAgentList(result);
  }

  return (
    <div className='w-full mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {agentList?.map((agent, index) => (
          <Link href={`nodemind-agent/${agent.agentId}`} key={index} className='p-4 border rounded-md shadow-sm'>
            <GitBranchPlus className={`${textColors[index % bgColors.length]}  p-1 ${bgColors[index % bgColors.length]} h-8 w-8 rounded-sm`} />
            <h2 className=' mt-2 text-lg'>{agent.name}</h2>
            <h5 className='text-sm text-gray-400 mt-2'>{moment(agent._creationTime).fromNow()}</h5>
          </Link>
        )
        )}
      </div>
    </div>
  )
}

export default MyAgents