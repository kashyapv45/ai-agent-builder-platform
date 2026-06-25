import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function AppHeader() {
  return (
    <div className='flex justify-between items-center w-full p-4 border-b border-neutral-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-10'>
        <SidebarTrigger className="hover:bg-neutral-100 transition-colors" />
        <UserButton/>
    </div>
  )
}

export default AppHeader