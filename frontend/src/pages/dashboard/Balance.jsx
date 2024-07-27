import React, { useContext, useEffect } from 'react'
import { useGetBalance } from '../../hooks/wallet/useGetBalance'
import { VariableContext } from '../../context/VariableContext';

const Balance = () => {
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
    <div className=''>
      <div className='text-white font-[600] text-[1.4rem]'>Wallet</div>
      <div className='text-white font-[600] text-[1.4rem]'>Balance</div>
      <div className='text-white font-[600] text-[1.2rem]'>{balance?.balance}</div>
    </div>
    : <div></div>
}
    </a>
  )
}

export default Balance