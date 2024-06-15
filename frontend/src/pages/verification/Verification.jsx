import React, { useContext, useEffect, useState } from 'react'
import { VariableContext } from '../../context/VariableContext'
import { useNavigate, useParams } from 'react-router-dom';

const Verification = () => {
  const {host} = useContext(VariableContext);
  const {id,token} = useParams();
  const navigate = useNavigate();
  const [msg,setmsg] = useState(null);
  useEffect(()=>{
    async function fetching(){
      const response = await fetch(`${host}/auth/verifymail/${id}/${token}`,{
        method : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          id ,
          token
        })
      })
      const data = await response.json();
      setmsg(data.msg);
      if(data.code === "0"){
       
        navigate("/login");
      }

    }
    fetching()
  },[])
  return (
    <section class="bg-gray-50 dark:bg-gray-900 -mb-10 mt-20 md:mt-5">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 flex justify-center items-center">
    {/* <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Verify</button> */}
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    {msg && msg}
                </h1>
                </div>
      </div>
      </div>
    </section>
  )
}

export default Verification