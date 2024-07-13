import React, { useContext, useEffect } from 'react'
import { useGetAllTxn } from '../../../hooks/admin/useGetAllTxn'
import { VariableContext } from '../../../context/VariableContext';
import TxnRow from './TxnRow';
import Spinner from '../../../components/Spinner';

const AllTxn = () => {
  const {getTxn,txn,isLoading1} = useGetAllTxn();
  const { token } = useContext(VariableContext);

  useEffect(() => {
    async function fetch() {
      
      await getTxn(token);
    }
    fetch();
  }, []);
  return (
    <>
      {!isLoading1 ? (
        <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-3">
          <div class=" overflow-x-auto shadow-md sm:rounded-lg ">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  
                  <th scope="col" class="px-6 py-3">
                    Txn Id & Userid
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Item name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    User Input
                  </th>
                  {/* <th scope="col" class="px-6 py-3">
                    UN/ Number
                  </th> */}
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Payment Method
                  </th>
                  
                  
                </tr>
              </thead>
              <tbody>
                {txn.map((order) => {
                  return <TxnRow data={order} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="justify-center items-center mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-3">
          <Spinner />
        </div>
      )}
    </>
  )
}

export default AllTxn