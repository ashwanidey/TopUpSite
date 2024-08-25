import React from "react";
import OrdersAdminTable from "./orders/OrdersAdminTable";
import ChangePrice from "./ChangePriceDropdown";
import { useAuth0 } from "@auth0/auth0-react";
import AdminCounter from "./AdminCounter";
import PointsQuery from "./QueryPoints";

const AdminPage = () => {
  const { isLoading } = useAuth0();

  return (
    <>
      {!isLoading && (
        <div className="mt-6 lg:mx-12 mx-4 flex flex-col gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <AdminCounter />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <PointsQuery />
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/admin/orders"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105"
              >
                Orders
              </a>
              <a
                href="/admin/price"
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105"
              >
                Update Price
              </a>
              <a
                href="/admin/usersdata"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105"
              >
                Users Data
              </a>
              <a
                href="/admin/deleteuser"
                className="text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105"
              >
                Delete User
              </a>
              <a
                href="/admin/txn"
                className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105"
              >
                All Transactions
              </a>
              <a
                href="/admin/edituser"
                className="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105"
              >
                Edit User Role
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPage;
