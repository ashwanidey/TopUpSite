import React from 'react'

const Footer = () => {
  return (
    <footer className='bottom-0'>
    <div className='flex flex-col w-full py-[50px] md:px-[100px] px-[50px] border-t mt-10 bg-[#23292A]'>
      <div className='flex flex-col items-center w-full gap-4'>
        <div className='font-[800] text-[#ff962d] text-[2rem]'>Gammerce.in</div>
        <div className='text-white'>Welcome to Gammerce, your one-stop shop for quick and easy gaming recharges.<br></br> Boost your gaming experience with our fast, reliable services.</div>
        {/* <div className='text-white'>gammerce.in@gmail.com | West Sikkim, Sikkim 737121</div> */}
      </div>

      <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-4 mt-6 text-white'>
        <div className=''>
          <div className='text-[#ff962d] text-[1.2rem]  font-[600]'>Important Links</div>
          <div className='flex flex-col'>
          <a href='/terms-and-condition'>Terms & Conditions</a>
          <a href='/privacypage'>Privacy Policy</a>
          <a href='/refund-policy'>Refund Policy</a>
          </div>
        </div>
        {/* <div>
          <div className='text-[#ff962d] text-[1.2rem] font-[600]'>Quick Links</div>
          <div>Login</div>
          <div> <a href='https://wa.me/message/AJJBCKZO5BAEB1'>
              Contact Us</a> </div>
          <div>Track Order</div>
        </div> */}
        <div>
          <div className='text-[#ff962d] text-[1.2rem] font-[600]'>Contact Us</div>
          {/* <div>
            <a href="#">
              Instagram</a></div>
          <div> <a href='#'>
              Facebook</a> </div> */}
          <div className='text-[red]'> <a href='https://wa.me/919883084820'>
              Ckick here - Whatsapp</a> </div>
        </div>
        {/* <a href='https://api.whatsapp.com/send/?phone=919883084820&text&type=phone_number&app_absent=0' className="text-yellow-500">
              Click here to contact developer.
        </a> */}

      </div>
    </div>
    </footer>
  )
}

export default Footer