import React from 'react'
import Transactions from './transactions/Transactions'

const Wallet = () => {
  return (
    <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-4 ">
      <div className='bg-green-400 flex flex-col items-center'>
        <div className='font-[600] text-[1.5rem] '>My Wallet</div>
        <div className='flex gap-5'>
        <a href='/home'>Home</a>
        <a href='/topup'>Top Up</a>
        <a href='/redeem'>Redeem Points</a>
        <div></div>
        </div>
      </div>
      <Transactions/>
    </div>
  )
}

export default Wallet