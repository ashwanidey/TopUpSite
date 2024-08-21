import React from 'react';
import { timeFormatter } from '../../../utils/timeFormater';

// Helper function to format the date as YYYY-MM-DD for comparison
const formatDateForComparison = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
};

// Get today's date formatted as YYYY-MM-DD
const today = formatDateForComparison(new Date());

const TableRows = ({ data }) => {
  const orderDate = formatDateForComparison(data?.createdAt);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {data?.transactionid}
      </th>
      <td className="px-6 py-4">
        {data?.itemname}
      </td>
      <td className="px-6 py-4" style={data?.status === "Processing" ? { color: "#FF962D" } :
        (data?.status === "Completed" ? { color: "#9ACD32" } : { color: "#FF4646" })}>
        {data?.status}
        {data?.status === "Refunded" && (
          <div>Reason: {data?.reason}</div>
        )}
        {data?.status === "Completed" && (
          <div>Remarks: {data?.reason}</div>
        )}
      </td>

      <td className="px-6 py-4">
        {data?.input1}
      </td>
      <td className="px-6 py-4">
        {data?.input2}
      </td>

      <td className="px-6 py-4">
        ₹{data?.value}
      </td>
      <td className="px-6 py-4">
        {data?.paymentmode}
      </td>
      <td className="px-6 py-4">
        {timeFormatter(data?.createdAt)}
      </td>

      {/* Verify Payment Button */}
      {data?.status === "Created" && orderDate === today && (
        <td className="px-6 py-4">
          <a
            href={`https://gammerce.in/confirmation?client_txn_id=${data?.transactionid}`}
            className="text-sm text-blue-500 font-semibold py-2 px-4 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
            style={{ display: 'inline-block', textAlign: 'center' }}
          >
            Verify Payment
          </a>
        </td>
      )}
      {/* Empty cell if no button */}
      {!(data?.status === "Created" && orderDate === today) && (
        <td className="px-6 py-4"></td>
      )}
    </tr>
  );
}

export default TableRows;
