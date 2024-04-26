import React from 'react'
import UserProfile from './UserProfile'
import Wallet from './Wallet'

const Dashboard = () => {
  return (
    <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-4 ">
      <div style={{
  
  backgroundColor: '#252f3b',
  padding: '24px 48px',

  marginBottom: '16px'}} className='flex md:flex-row flex-col gap-10 w-full rounded-lg justify-between'>
    <UserProfile/>
    <Wallet/>
  </div>
    </div>
  )
}

export default Dashboard