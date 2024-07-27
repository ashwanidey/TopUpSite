import React from 'react'
import TxnRow from './TxnRow';

const TxnTable = ({txns}) => {
  return (
    <>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg md:block hidden">
     
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Transaction ID
              </th>
              
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              
              <th scope="col" class="px-6 py-3">
                Amount
              </th>
              
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              
            </tr>
          </thead>
          <tbody>
            {txns.map((txn) => {
              return <TxnRow data={txn} />;
            })}
          </tbody>
        </table>
  
    </div>
  </>
  )
}

export default TxnTable