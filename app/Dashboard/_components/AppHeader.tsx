import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function AppHeader() {
  return (
    <div className='flex justify-between items-center w-full p-3 border-b border-[#E5E5E5] bg-[#F6F8FA]'>
        <SidebarTrigger/>
        <UserButton/>
        </div>
  )
}

export default AppHeader