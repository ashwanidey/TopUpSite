import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";

import TableRows from "./TableRows";

const OrdersTable = ({orders}) => {
  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg md:block hidden">
       
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Order ID
                </th>
                <th scope="col" class="px-6 py-3">
                  Item name
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                Userid/Email

                </th>
                <th scope="col" class="px-6 py-3">
                Username/Number 
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Payment Method
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return <TableRows data={order} />;
              })}
            </tbody>
          </table>
    
      </div>
    </>
  );
};

export default OrdersTable;
