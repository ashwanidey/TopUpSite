import React from 'react'

const TableRows = ({data}) => {
    console.log(data)
  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {data?._id}
                </th>
                <td class="px-6 py-4">
                    {data?.itemname}
                </td>
                <td class="px-6 py-4">
                {data?.status}
                </td>
                <td class="px-6 py-4">
                {data?.input1}
                </td>
                <td class="px-6 py-4">
                {data?.input2}
                </td>
                
                <td class="px-6 py-4">
                ₹ {data?.value}
                </td>
                <td class="px-6 py-4">
                {data?.paymentmode}
                </td>
            </tr>
  )
}

export default TableRows