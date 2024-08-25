import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { VariableContext } from '../../context/VariableContext';

const OtpVerify = () => {

  const {mobile} = useParams();
  const [otp, setOtp] = useState('')
  const {host,user} = useContext(VariableContext);
  const [loginErr,setLoginErr] = useState('');
  const [lastTime,setLastTime] = useState(null);
  const intervalRef = useRef(null);
  const [resend,setResend] = useState(false);

  const navigate = useNavigate();
  function convertMillisecondsToMMSS(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const res = await axios.post(`${host}/otp/timer`, { mobile });
        if (res.data.success) {
          setLastTime(res.data.timer);

          intervalRef.current = setInterval(() => {
            setLastTime((prevTime) => {
              if (prevTime <= 0) {
                clearInterval(intervalRef.current);
                return 0;
              }
              
              return prevTime - 1000;
            });
          }, 1000);
        } else {
          console.log('error');
          setLoginErr(res.data.message);
        }
      } catch (error) {
        console.error('Error fetching timer:', error);
        setLoginErr('An error occurred while fetching the timer.');
      }
    };

    fetchTime();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, [setLastTime,resend]);


  const resendOtp = async() => {
    const res = await axios.post(`${host}/otp/otp-login`, {mobile: mobile})
    if(res.data.success){
      setLoginErr(res.data.message)
      setResend(true)
    }else{
      console.log('error')
      setLoginErr(res.data.message)
    }
  }

  const handleSubmit = async() => {
    if(otp === '' || otp.length < 6){
      setLoginErr('Please enter a valid OTP')
    }else{
      const res = await axios.post(`${host}/otp/verify-otp`, {mobile: mobile, otp: otp})
      if(res.data.success){
        setLoginErr(res.data.message)
        window.localStorage.setItem("isLoggedIn",true);
        window.localStorage.setItem("token",JSON.stringify(res.data.token));
        window.localStorage.setItem("user",JSON.stringify(res.data.user));
        window.location ='/home'
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
                      <input type="tel" pattern="[0-9]{6}" name="mobile" id="mobile" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" onChange={(e) => {
                        setOtp(e.target.value)
                        }}/>
                  </div>
                  
                  {loginErr ? <p className='text-[#E72929] mt-[-13px] text-[0.9rem] '>{loginErr}</p> : <></>}
                  
                  <div>
                  <button onClick = {() => resendOtp()}className='text-[#E72929] mt-[-13px] text-[0.9rem] '>Resend OTP</button>
                  <p>{convertMillisecondsToMMSS(lastTime)}</p>
                  </div>
               
                  
                  <button onClick={()=>handleSubmit()} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>

                 
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default OtpVerify