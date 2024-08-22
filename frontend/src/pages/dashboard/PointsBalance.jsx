import React, { useContext, useEffect } from 'react'
import { useGetBalance } from '../../hooks/wallet/useGetBalance'
import { VariableContext } from '../../context/VariableContext';

const PointsBalance = () => {
  const {user,token} = useContext(VariableContext);
  const {getBalance,balance,isLoading} = useGetBalance();

  useEffect(() => {
    function fetchData(){
      getBalance(user?.userid,token);
    }
    fetchData();
  },[])
  return (
    <a href="/wallet">
      {!isLoading ? 
    <div className='flex flex-col justify-center items-center bg-yellow-300 p-5 rounded-lg'>
      <div className=' font-[900] text-[2rem]'>Wallet</div>
      <div className=' font-[600] text-[1.4rem]'>Balance : {balance?.balance}</div>
  
    </div>
    : <div></div>
}
    </a>
  )
}

export default PointsBalance