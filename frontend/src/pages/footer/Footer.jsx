import React from 'react'

const Footer = () => {
  return (
    <footer className='bottom-0'>
    <div className='flex flex-col w-full py-[50px] md:px-[100px] px-[50px] border-t mt-10 bg-black'>
      <div className='flex flex-col items-center w-full gap-4'>
        <div className='font-[800] text-white text-[2rem]'>Miraki Store</div>
        <div className='text-white'>Welcome to Miraki Store! We're your go-to spot for topping up games quickly and safely. Discover popular games, enjoy fast transactions, and level up your gaming experience with our easy platform.</div>
        <div className='text-white'>+91 70857 42871 | mirakistore@gmail.com | Lengte, Mizoram 796501</div>
      </div>

      <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-4 mt-6 text-white'>
        <div className=''>
          <div className='text-yellow-200 text-[1.2rem] font-[600]'>Important Links</div>
          <div>Privacy Policy</div>
          <div>Terms & Conditions</div>
          <div>Refund Policy</div>
        </div>
        <div>
          <div className='text-yellow-200 text-[1.2rem] font-[600]'>Quick Links</div>
          <div>Login</div>
          <div>Contact</div>
          <div>Track Order</div>
        </div>
        <div>
          <div className='text-yellow-200 text-[1.2rem] font-[600]'>Follow Us</div>
          <div>Privacy Policy</div>
          <div>Terms & Conditions</div>
          <div>Refund Policy</div>
        </div>
      </div>
    </div>
    </footer>
  )
}

export default Footer