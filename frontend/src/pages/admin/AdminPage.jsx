import React from "react";
import OrdersAdminTable from "./orders/OrdersAdminTable";
import ChangePrice from "./ChangePriceDropdown";
import { useAuth0 } from "@auth0/auth0-react";
import AdminCounter from "./AdminCounter";

const AdminPage = () => {
  const { isLoading } = useAuth0();
  return (
    <>
      
      {!isLoading && (
        <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-3">
          <AdminCounter/>
          <a
            href="/admin/orders"
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Orders
          </a>
          <a
            href="/admin/price"
            class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Update Price
          </a>
          <a
            href="/admin/usersdata"
            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Users Data
          </a>
          <a
            href="/admin/deleteuser"
            class="text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Delete User
          </a>
          <a
            href="/admin/txn"
            class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            All transactions
          </a>
          <a
            href="/admin/edituser"
            className="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Edit User Role
          </a>
        </div>
      )}
    </>
  );
};

export default AdminPage;
