import React from "react";
import OrdersAdminTable from "./OrdersAdminTable";
import ChangePrice from "./ChangePriceDropdown";
import { useAuth0 } from "@auth0/auth0-react";

const AdminPage = () => {
  const {isLoading} = useAuth0()
  return (
    <>
    {!isLoading && <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-3">
    <a href="/admin/orders" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Orders</a>
<a href="/admin/price" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Update Price</a>
  </div>}
  </>
    
  );
};

export default AdminPage;
