import React, { useContext, useEffect } from 'react'
import OrdersTable from './OrdersTable'
import OrdersBox from './OrdersBox'
import { useGetOrder } from '../../../hooks/useGetOrder'
import { useAuth0 } from '@auth0/auth0-react'
import { extractPart } from '../../../utils/userIdExtractor'
import Spinner from '../../../components/Spinner'
import { VariableContext } from '../../../context/VariableContext'

const Orders = () => {
  // const {user} = useAuth0();
  const {getOrders,isLoading1,orders} = useGetOrder();
  const {user} = useContext(VariableContext);
  useEffect(()=>{
    async function fetch(){
      await getOrders(user?._id)
    }
    fetch();
  },[])
  return (
    <>
    {!isLoading1 ? <div>
      <OrdersTable orders = {orders}/>
    <OrdersBox orders = {orders}/></div> : <div className='justify-center items-center w-full flex'><Spinner/></div>}
    
    </>
  )
}

export default Orders