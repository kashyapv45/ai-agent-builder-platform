import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Profile() {
  return (
    <div className='p-10'>
        <UserProfile/>
    </div>
  )
}

export default Profile