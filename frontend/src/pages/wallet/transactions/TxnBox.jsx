import React from 'react'
import { timeFormatter } from '../../../utils/timeFormater'

const TxnBox = ({txns}) => {
  return (
    <div className='md:hidden block bg-[#252f3b] p-7 rounded-lg'>
      <div class="text-xl font-bold  leading-none text-gray-900 dark:text-white">All Orders</div>
       <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700 ">
        {txns.map(order=>{
          return(
            <li class="py-3 sm:py-4">
                <div class="flex items-center">
                    
                    <div class="flex-1 min-w-0 ">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">
                          OrderId - {order?.txnid}
                        </div>
                        
                        <div class="text-sm text-gray-500  dark:text-gray-400" style={order?.status === "Processing" ? {color : "#FF962D"} : 
              (order?.status === "Success" ? {color : "#9ACD32"} : {color : "#FF4646"})}>
                          Status - {order?.status} <div>{order?.status === "Refunded" && `Reason : ${order?.reason}`}</div>
                        </div>
                       
                        <div class="text-sm text-gray-500 truncate dark:text-gray-400">
                          Amount - ₹{order?.amount}
                        </div>
                        
                        <div class="text-sm text-gray-500 truncate dark:text-gray-400">
                          Date - {timeFormatter(order?.createdAt)}
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

export default TxnBox