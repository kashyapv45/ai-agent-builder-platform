import React from 'react'
import CreateAgentSection from './_components/CreateAgentSection'
import AiAgentListTab from './_components/AiAgentListTab'
import BackgroundParticles  from './_components/BackgroundParticles'

function Dashboard() {
  return (
    <div>
      <BackgroundParticles />
      <div className='backdrop-blur-md p-2 md:px-10 lg:px-15 mt-20 bg-[#FBFBFB]/1 rounded-lg mx-20 border border-[#E8E8E8]'>
        <CreateAgentSection />
        <AiAgentListTab/>
        </div>
    </div>
  )
}

export default Dashboard