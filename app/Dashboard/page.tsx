import React from 'react'
import CreateAgentSection from './_components/CreateAgentSection'
import AiAgentListTab from './_components/AiAgentListTab'
import BackgroundParticles  from './_components/BackgroundParticles'

function Dashboard() {
  return (
    <div className="relative min-h-[calc(100vh-73px)]">
      <BackgroundParticles />
      <div className='relative z-10 p-6 md:p-8 lg:p-12 max-w-7xl mx-auto'>
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200/80 p-6 md:p-10">
            <CreateAgentSection />
            <div className="mt-12">
              <AiAgentListTab/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard