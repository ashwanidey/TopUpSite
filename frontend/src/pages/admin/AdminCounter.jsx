import React, { useContext, useEffect, useState } from 'react'
import { VariableContext } from '../../context/VariableContext';

const AdminCounter = () => {

  const [data,setData] = useState(null);
  const {user,host,token} = useContext(VariableContext)

  useEffect(()=>{
    async function fetchdata(){
      const response = await fetch(`${host}/admin/stats`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
        Authorization : `Bearer ${token}`
      })
      const data = await response.json();
      setData(data);
      
    }
    fetchdata();
  },[])
  return (
    <div className='flex flex-col gap-8  items-center  mb-5 bg-[#252f3b] md:px-[48px] px-[20px] py-[24px] rounded-lg'>
      <div className='text-white font-[600] text-[1.4rem]'>All Orders</div>
      <div className='flex sm:flex-row flex-col md:gap-10 gap-3 text-white font-[600] text-[1rem] items-center'>
      <div className='flex flex-col items-center'>
        <div>{data?.total_order}</div>
        Total Orders</div>
      <div className='flex flex-col items-center'>
      <div>{data?.completed}</div>Completed</div>
      <div className='flex flex-col items-center'>
      <div>{data?.refunded}</div>Refunded</div>
      <div className='flex flex-col items-center'>
      <div>{data?.processing}</div>Processing</div>
      <div className='flex flex-col items-center'>
      <div>₹ {data?.total_sale}</div>Total Sale</div>


      </div>
      
      
      
    </div>
  )
}

export default AdminCounter