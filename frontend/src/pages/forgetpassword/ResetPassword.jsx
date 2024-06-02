import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { VariableContext } from '../../context/VariableContext';

export const ResetPassword = () => {
  const [password,setPassword] = useState(""); 
  const {id,token}= useParams();
  const [error,setError] = useState(null);
  const navigate = useNavigate();
  const {host} = useContext(VariableContext);

  const handleSubmit = async() => {
    const response = await fetch(`${host}/password/reset-password/${id}/${token}`,{
      method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        password
      })
    })
    const data = await response.json();
    if(data && data.msg){
        setError(data.msg);
        if(data.code === "1")
            return;
    }
    setTimeout(() => {
        navigate("/login")
    }, 2000);

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
                    Reset Password
                </h1>
                <form class="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {error ? <span className='text-[#E72929] mt-[-13px] text-[0.9rem] '>{error}
                    {error === "The link is corrupted." && <a href="/forgetpassword" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"> Regenerate Link</a>}
                         </span> : <></>}
                    
                    
                    <button onClick={()=>handleSubmit()} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                    
                </form>
            </div>
        </div>
    </div>
  </section>
  )
}

export default ResetPassword