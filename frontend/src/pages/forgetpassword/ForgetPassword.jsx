import React, { useState } from 'react'
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

export const ForgetPassword = () => {

  const [email,setEmail] = useState("");
  const [error,setError] = useState(null);

  const navigate = useNavigate();
 
  const handleSubmit = async()=>{
    const response = await fetch("http://localhost:3001/password/forgetpassword",{
      method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        email
      })
    })

    const data = await response.json();
    if(data && data.msg){
        setError(data.msg);
        if(data.msg === "User does not exist.")
        return;
    }
    
    
  }

  return (
    <section class="bg-gray-50 dark:bg-gray-900 -mb-10 mt-20 md:mt-5">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
            Website Name   
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Forget Password
                </h1>
                <form class="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    {error ? <p className='text-[#E72929] mt-[-13px] text-[0.9rem] '>{error}</p> : <></>}
                    
                    
                    <button onClick={()=>handleSubmit()} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
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

export default ForgetPassword