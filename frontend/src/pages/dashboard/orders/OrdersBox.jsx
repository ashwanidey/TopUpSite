import React, { useState } from 'react';
import { timeFormatter } from '../../../utils/timeFormater';

// Helper function to format the date as YYYYMMDD for comparison
const formatDateForComparison = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
};

// Get today's date formatted as YYYYMMDD
const today = formatDateForComparison(new Date());

const OrdersBox = ({ orders }) => {
  // State for search input, search filter type, status filter, and date range
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('Uid/Email');
  const [statusFilter, setStatusFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Handler functions
  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleSearchFilterChange = (event) => setSearchFilter(event.target.value);
  const handleStatusFilterChange = (event) => setStatusFilter(event.target.value);
  const handleStartDateChange = (event) => setStartDate(event.target.value);
  const handleEndDateChange = (event) => setEndDate(event.target.value);

  // Filter orders based on search query, search filter type, status, and date range
  const filteredOrders = orders.filter(order => {
    const orderDate = formatDateForComparison(order?.createdAt);
    const matchesSearch = searchFilter === 'Uid/Email'
      ? order?.input1?.toLowerCase().includes(searchQuery.toLowerCase()) || order?.orderid?.toLowerCase().includes(searchQuery.toLowerCase())
      : order?.orderid?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || order?.status === statusFilter;
    const matchesDateRange = (!startDate || orderDate >= startDate) && (!endDate || orderDate <= endDate);

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  return (
    <div className='md:hidden block bg-[#252f3b] p-7 rounded-lg'>
      <div className="text-xl font-bold leading-none text-gray-900 dark:text-white mb-4">All Orders</div>

      {/* Filter Section */}
      <div className="mb-4 space-y-4">
        <div className="mb-4 space-y-4">
          <input
            type="text"
            placeholder={`Search by ${searchFilter}`}
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white w-full"
          />

          <div className="flex space-x-4">
            <select
              value={searchFilter}
              onChange={handleSearchFilterChange}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white flex-1"
            >
              <option value="Uid/Email">Uid/Email</option>
              <option value="OrderId">OrderId</option>
            </select>

            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white flex-1"
            >
              <option value="All">Status</option>
              <option value="Created">Created</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white flex-1"
            />
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white flex-1"
            />
          </div>
        </div>
      </div>

      {/* Order List */}
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 ">
        {filteredOrders.map(order => {
          const orderDate = formatDateForComparison(order?.createdAt);

          return (
            <li key={order?.orderid} className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    OrderId - {order?.orderid}
                  </div>
                  <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                    ItemName - {order?.itemname}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400"
                    style={
                      order?.status === "Processing" ? { color: "#FF962D" } :
                        (order?.status === "Completed" ? { color: "#9ACD32" } : { color: "#FF4646" })
                    }>
                    Status - {order?.status}
                    <div>{order?.status === "Refunded" && `Reason : ${order?.reason}`}</div>
                    <div>{order?.status === "Completed" && `Remarks : ${order?.reason}`}</div>
                  </div>
                  <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                    Uid/Email - {order?.input1}
                  </div>
                  <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                    Username/Number - {order?.input2}
                  </div>
                  <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                    Price - ₹{order?.value}
                  </div>
                  <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                    Payment Mode - {order?.paymentmode}
                  </div>
                  <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                    Date - {timeFormatter(order?.createdAt)}
                  </div>

                  {/* Verify Payment Button */}
                  {order?.status === "Created" && orderDate === today && (
                    <div className="mt-2">
                      <a
                        href={`https://gammerce.in/confirmation?client_txn_id=${order?.orderid}`}
                        className="text-sm text-blue-500 font-semibold py-2 px-4 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
                        style={{ display: 'inline-block', textAlign: 'center' }}
                      >
                        Verify Payment
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrdersBox;
