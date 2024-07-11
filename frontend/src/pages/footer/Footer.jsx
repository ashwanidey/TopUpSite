import React from 'react'

const Footer = () => {
  return (
    <footer className='bottom-0'>
    <div className='flex flex-col w-full py-[50px] md:px-[100px] px-[50px] border-t mt-10 bg-[#23292A]'>
      <div className='flex flex-col items-center w-full gap-4'>
        <div className='font-[800] text-[#ff962d] text-[2rem]'>Miraki Store</div>
        <div className='text-white'>Welcome to Mirakistore, your ultimate destination for gaming recharge! Dive into a world where your gaming experience is enhanced with seamless and swift recharge options. Whether you're a casual player or a dedicated gamer, Mirakistore offers a range of services tailored to meet your gaming needs. Discover convenience, reliability, and speed as we empower your gaming journey. Join us at Mirakistore and elevate your gaming experience today!</div>
        <div className='text-white'>+91 70857 42871 | mirakistore87@gmail.com | Lengte, Mizoram 796501</div>
      </div>

      <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-4 mt-6 text-white'>
        <div className=''>
          <div className='text-[#ff962d] text-[1.2rem]  font-[600]'>Important Links</div>
          <div className='flex flex-col'>
          <a href='/privacypage'>Privacy Policy</a>
          <a href='/terms-and-condition'>Terms & Conditions</a>
          <a href='/refund-policy'>Refund Policy</a>
          </div>
        </div>
        <div>
          <div className='text-[#ff962d] text-[1.2rem] font-[600]'>Quick Links</div>
          <div>Login</div>
          <div> <a href='https://wa.me/message/AJJBCKZO5BAEB1'>
              Contact Us</a> </div>
          <div>Track Order</div>
        </div>
        <div>
          <div className='text-[#ff962d] text-[1.2rem] font-[600]'>Follow Us</div>
          <div>
            <a href="Welcome to Mirakistore, your ultimate destination for gaming recharge! Dive into a world where your gaming experience is enhanced with seamless and swift recharge options. Whether you're a casual player or a dedicated gamer, Mirakistore offers a range of services tailored to meet your gaming needs. Discover convenience, reliability, and speed as we empower your gaming journey. Join us at Mirakistore and elevate your gaming experience today!">
              Instagram</a></div>
          <div> <a href='https://www.facebook.com/valpuia.vanlala?mibextid=ZbWKwL'>
              Facebook</a> </div>
          <div> <a href='https://chat.whatsapp.com/DvcxK6jXT84AQbgYCdHid6'>
              Whatsapp</a> </div>
        </div>
        <a href='https://api.whatsapp.com/send/?phone=919883084820&text&type=phone_number&app_absent=0' className="text-yellow-500">
              Click here to contact developer.
        </a>

      </div>
    </div>
    </footer>
  )
}

export default Footer