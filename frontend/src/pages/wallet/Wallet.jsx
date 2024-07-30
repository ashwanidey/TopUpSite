import React from 'react'
import Transactions from './transactions/Transactions'

const Wallet = () => {
  return (
    <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-4 ">
      <div className='bg-yellow-400 flex flex-col items-center p-3 rounded-lg' >
        <div className='font-[800] text-[2rem] mb-5 '>My Wallet</div>
        <div className='flex md:flex-row flex-col gap-5 rounded-lg text-[1.2rem]'>
          <div className='bg-white px-10 py-4 rounded-lg'>
        <a href='/home' className='font-[700] text-blue-600  flex justify-center '>Home</a>
        </div>
        <div className='bg-white px-10 py-4 rounded-lg flex justify-center'>
        <a href='/topup' className='font-[700] text-blue-600'>Top Up</a>
        </div>
        <div className='bg-white px-10 py-4 rounded-lg flex justify-center'>
        <a href='/redeem' className='font-[700] text-blue-600'>Redeem Points</a>
        </div>
        
        </div>
      </div>
      <Transactions/>
    </div>
  )
}

export default Wallet