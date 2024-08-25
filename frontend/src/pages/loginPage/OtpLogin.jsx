import React, { useContext, useState } from 'react'
import axios from 'axios'
import { VariableContext } from '../../context/VariableContext';
import { NavLink, useNavigate } from 'react-router-dom';

const OtpLogin = () => {

  const [mobile,setMobile] = useState('');
  const [loginErr,setLoginErr] = useState('');
  const {host} = useContext(VariableContext);

  const navigate = useNavigate();

  const handleSubmit = async() => {
    
    if(mobile === '' || mobile.length < 10){
      setLoginErr('Please enter a valid mobile number')
    }else{
      setLoginErr('')
      
      const res = await axios.post(`${host}/otp/otp-login`, {mobile: mobile})
      console.log(res.data)
      if(res.data.success){
        setLoginErr(res.data.message)
       
        navigate(`/otpverify/${mobile}`)
      }else{
        console.log('error')
        setLoginErr(res.data.message)
      }
    }

  }
  return (
    <section class="bg-gray-50 dark:bg-gray-900 -mb-10 mt-20 md:mt-5">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
          Gammerce.in  
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                      <label for="mobile" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your mobile</label>
                      <input type="tel" pattern="[0-9]{10}" name="mobile" id="mobile" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" onChange={(e) => {
                        setMobile(e.target.value)
                        }}/>
                  </div>
                  
                  {loginErr ? <p className='text-[#E72929] mt-[-13px] text-[0.9rem] '>{loginErr}</p> : <></>}
                  <div class="flex items-center justify-between">
                      {/* <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div> */}
                     
                  </div>
                  
                  <button onClick={()=>handleSubmit()} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send Otp</button>

                  <p class="mt-6 text-sm font-light text-gray-500 dark:text-gray-400 text-center pb-5"> OR </p>
                  
                   <a href="/login" className=''>
                  <div  class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login Using Email </div>
                  </a>

                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <NavLink to="/register" > <span class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</span></NavLink>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default OtpLogin