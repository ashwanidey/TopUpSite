import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col w-full py-[50px] md:px-[100px] px-[50px] border-t mt-10 bg-black'>
      <div className='flex flex-col items-center w-full gap-4'>
        <div className='font-[800] text-white text-[2rem]'>WEBSITE NAME</div>
        <div className='text-white'>Welcome to WebsiteName – your fast and secure game top-up hub! Explore popular games, enjoy instant transactions, and elevate your gaming with our user-friendly platform.</div>
        <div className='text-white'>+91 98630 52375 | thoihen.customer.service@gmail.com | Manipur Imphal West, 795003</div>
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
  )
}

export default Footer