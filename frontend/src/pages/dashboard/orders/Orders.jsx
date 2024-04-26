import React, { useEffect } from 'react'
import OrdersTable from './OrdersTable'
import OrdersBox from './OrdersBox'
import { useGetOrder } from '../../../hooks/useGetOrder'
import { useAuth0 } from '@auth0/auth0-react'
import { extractPart } from '../../../utils/userIdExtractor'

const Orders = () => {
  const {user} = useAuth0();
  const {getOrders,isLoading1,orders} = useGetOrder();
  useEffect(()=>{
    async function fetch(){
      await getOrders(extractPart(user.sub))
    }
    fetch();
  },[])
  return (
    <>
    {!isLoading1 && <div>
      <OrdersTable orders = {orders}/>
    <OrdersBox orders = {orders}/></div>}
    
    </>
  )
}

export default Orders