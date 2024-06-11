import React, { useContext, useEffect, useState } from 'react'
import { VariableContext } from '../../context/VariableContext';

const Counter = () => {

  const [data,setData] = useState(null);
  const {user,host} = useContext(VariableContext)

  useEffect(()=>{
    async function fetchdata(){
      const response = await fetch(`${host}/user/myorder/${user._id}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await response.json();
      setData(data);
      
    }
    fetchdata();
  },[])
  return (
    <div className='flex flex-col gap-8 md:mr-20 items-center '>
      <div className='text-white font-[600] text-[1.4rem]'>My Orders</div>
      <div className='flex md:gap-10 gap-3 text-white font-[600] text-[1rem] items-center'>
      <div className='flex flex-col items-center'>
        <div>{data?.total_order}</div>
        Total Orders</div>
      <div className='flex flex-col items-center'>
      <div>{data?.completed}</div>Completed</div>
      <div className='flex flex-col items-center'>
      <div>{data?.refunded}</div>Refunded</div>
      </div>
    </div>
  )
}

export default Counter