import React from 'react'
import { timeFormatter } from '../../../utils/timeFormater'

const TxnRow = ({data}) => {
  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {data?.txnid}
                </th>
                
                <td class="px-6 py-4" style={data?.status === "Processing" ? {color : "#FF962D"} : 
              (data?.status === "Success" ? {color : "#9ACD32"} : {color : "#FF4646"})}>
                {data?.status} {data?.status === "Refunded" && `Reason : ${data?.reason}`}
                </td>
                <td class="px-6 py-4">{
                data?.type}</td>
                <td class="px-6 py-4">{
                data?.amount}</td>
                <td class="px-6 py-4">{timeFormatter(                data?.createdAt) }</td>
                
            </tr>
  )
}

export default TxnRow