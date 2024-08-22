import React, { useContext, useEffect, useState } from 'react';
import { useGetAllTxn } from '../../../hooks/admin/useGetAllTxn';
import { VariableContext } from '../../../context/VariableContext';
import TxnRow from './TxnRow';
import Spinner from '../../../components/Spinner';

const AllTxn = () => {
  const { getTxn, txn, isLoading1 } = useGetAllTxn();
  const { token } = useContext(VariableContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [userInputSearch, setUserInputSearch] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    async function fetch() {
      await getTxn(token);
    }
    fetch();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleUserInputSearchChange = (event) => {
    setUserInputSearch(event.target.value);
  };

  const handlePaymentMethodFilterChange = (event) => {
    setPaymentMethodFilter(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filteredTxns = txn?.filter(order => {
    const matchesSearch = order?.transactionid?.toLowerCase().includes(searchQuery.toLowerCase()) || order?.useremail?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order?.status === statusFilter;
    const matchesUserInput = order?.input1?.toLowerCase().includes(userInputSearch.toLowerCase()) || order?.input2?.toLowerCase().includes(userInputSearch.toLowerCase());
    const matchesPaymentMethod = paymentMethodFilter === 'All' || order?.paymentmode === paymentMethodFilter;

    const orderDate = new Date(order?.updatedAt);
    const matchesDateRange =
      (!startDate || orderDate >= new Date(startDate)) &&
      (!endDate || orderDate <= new Date(endDate));

    return matchesSearch && matchesStatus && matchesUserInput && matchesPaymentMethod && matchesDateRange;
  });

  return (
    <>
      {!isLoading1 ? (
        <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-3">
          {/* Filter Section */}
          <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Search by Order ID or Email"
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white w-full"
            />

            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white w-full sm:w-auto"
            >
              <option value="All">Status</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
              <option value="Created">Created</option>
            </select>

            <input
              type="text"
              placeholder="Search User Input"
              value={userInputSearch}
              onChange={handleUserInputSearchChange}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white w-full"
            />

            <select
              value={paymentMethodFilter}
              onChange={handlePaymentMethodFilterChange}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white w-full sm:w-auto"
            >
              <option value="All">Payment Method</option>
              <option value="upi">Upi</option>
              <option value="wallet">Wallet</option>
            </select>

            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white w-full sm:w-auto"
            />

            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white w-full sm:w-auto"
            />
          </div>

          {/* Transaction Table */}
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Order Id</th>
                  <th scope="col" className="px-6 py-3">Item name</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">User Input1</th>
                  <th scope="col" className="px-6 py-3">User Input2</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Payment Method</th>
                  <th scope="col" className="px-6 py-3">User Email</th>
                  <th scope="col" className="px-6 py-3">Updated At</th>
                </tr>
              </thead>
              <tbody>
                {filteredTxns?.map((order) => (
                  <TxnRow key={order.transactionid} data={order} />
                ))}
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

export default AllTxn;
