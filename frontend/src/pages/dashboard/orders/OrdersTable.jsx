import React, { useState } from 'react';
import TableRows from './TableRows';
import { timeFormatter } from '../../../utils/timeFormater';

// Helper function to format the date as YYYY-MM-DD for comparison
const formatDateForComparison = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
};

// Get today's date formatted as YYYY-MM-DD
const today = formatDateForComparison(new Date());

const OrdersTable = ({ orders }) => {
  // State for search input, search filter type, status filter, and date range
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('Uid/Email');
  const [statusFilter, setStatusFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Handler functions
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  // Filter orders based on search query, search filter type, status, and date range
  const filteredOrders = orders.filter(order => {
    const orderDate = formatDateForComparison(order?.createdAt);
    const matchesSearch = searchFilter === 'Uid/Email'
      ? order?.input1?.toLowerCase().includes(searchQuery.toLowerCase()) || order?.transactionid?.toLowerCase().includes(searchQuery.toLowerCase())
      : order?.transactionid?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || order?.status === statusFilter;

    const matchesDateRange = (!startDate || orderDate >= startDate) && (!endDate || orderDate <= endDate);

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:block hidden">
      {/* Filter Section */}
      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-wrap gap-4">
        <div className="w-full md:w-auto">
          <input
            type="text"
            placeholder={`Search by ${searchFilter}`}
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <div className="w-full md:w-auto flex space-x-4">
          <select
            value={searchFilter}
            onChange={handleSearchFilterChange}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="Uid/Email">Uid/Email</option>
            <option value="Order ID">Order ID</option>
          </select>

          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="All">Status</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Refunded">Refunded</option>
            <option value="Created">Created</option>
          </select>
        </div>

        <div className="w-full md:w-auto flex space-x-4">
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order ID
            </th>
            <th scope="col" className="px-6 py-3">
              Item
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Uid/Email
            </th>
            <th scope="col" className="px-6 py-3">
              Username/Number
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Payment Method
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            {/* New column header */}
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => {
            return <TableRows key={order?.transactionid} data={order} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
