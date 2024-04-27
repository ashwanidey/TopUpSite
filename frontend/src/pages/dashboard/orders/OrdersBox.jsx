import React from 'react'
import { timeFormatter } from '../../../utils/timeFormater'

const OrdersBox = ({orders}) => {
  return (
    <div className='md:hidden block bg-[#252f3b] p-7 rounded-lg'>
      <div class="text-xl font-bold  leading-none text-gray-900 dark:text-white">All Orders</div>
       <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700 ">
        {orders.map(order=>{
          return(
            <li class="py-3 sm:py-4">
                <div class="flex items-center">
                    
                    <div class="flex-1 min-w-0 ">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">
                            OrderId : {order?._id}
                        </div>
                        <div class="text-sm text-gray-500 truncate dark:text-gray-400">
                        ItemName : {order?.itemname}
                        </div>
                        <div class="text-sm text-gray-500  dark:text-gray-400" style={order?.status === "Processing" ? {color : "#FF962D"} : 
              (order?.status === "Completed" ? {color : "#9ACD32"} : {color : "#FF4646"})}>
                        Status : {order?.status} <div>{order?.status === "Refunded" && `Reason : ${order?.reason}`}</div>
                        </div>
                        <div class="text-sm text-gray-500 truncate dark:text-gray-400">
                        Userid/Email : {order?.input1}
                        </div>
                        <div class="text-sm text-gray-500 truncate dark:text-gray-400">
                        Username/Number : {order?.input2}
                        </div>
                        <div class="text-sm text-gray-500 truncate dark:text-gray-400">
                        Price : ₹ {order?.value}
                        </div>
                        <div class="text-sm text-gray-500 truncate dark:text-gray-400">
                        Payment Mode: {order?.paymentmode}
                        </div>
                        <div class="text-sm text-gray-500 truncate dark:text-gray-400">
                        Order Date: {timeFormatter(order?.createdAt)}
                        </div>
                    </div>
                    {/* <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        $320
                    </div> */}
                </div>
            </li>
          )
        })}
       </ul>
    </div>
  )
}

export default OrdersBox