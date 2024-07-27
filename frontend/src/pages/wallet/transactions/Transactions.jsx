import React, { useContext, useEffect } from 'react'
import { useGetTransactions } from '../../../hooks/wallet/useGetTransactions';
import { VariableContext } from '../../../context/VariableContext';
import Spinner from '../../../components/Spinner';
import TxnTable from './TxnTable';
import TxnBox from './TxnBox';


const Transactions = () => {

  const {getTxns,isLoading,txns} = useGetTransactions();
  const {user,token} = useContext(VariableContext);
  useEffect(()=>{
    async function fetch(){
      await getTxns(user?.userid,token)
    }
    fetch();
  },[])
  return (
    <>
    {!isLoading ? <div>
      <TxnTable txns = {txns}/>
    <TxnBox txns = {txns}/>
    </div>
     : <div className='justify-center items-center w-full flex'><Spinner/></div>}
    
    </>
  )
}

export default Transactions