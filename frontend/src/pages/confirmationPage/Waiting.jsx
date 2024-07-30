import React from 'react'

const Waiting = () => {
  return (
    <div className='bg-yellow-400 p-5 rounded-lg flex flex-col items-center '  >
      <div className='text-[2rem] font-[700]'>We are confirming your order</div>
      <div className='text-[2rem] font-[700] text-blue-700 bg-white p-3 rounded-lg'>Please do not refresh or leave the page</div>
    </div>
  )
}

export default Waiting