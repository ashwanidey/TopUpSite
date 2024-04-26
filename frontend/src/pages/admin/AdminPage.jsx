import React from "react";
import OrdersAdminTable from "./OrdersAdminTable";
import ChangePrice from "./ChangePrice";
import { useAuth0 } from "@auth0/auth0-react";

const AdminPage = () => {
  const {isLoading} = useAuth0()
  return (
    <>
    {!isLoading && <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-3">
    <OrdersAdminTable/>
    <ChangePrice/>
  </div>}
  </>
    
  );
};

export default AdminPage;
