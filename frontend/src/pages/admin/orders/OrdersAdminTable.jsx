import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import AdminTableRow from "./AdminTableRow";
import { useGetProcessingOrder } from "../../../hooks/admin/useGetProcessingOrder";
import Spinner from "../../../components/Spinner";
import { VariableContext } from "../../../context/VariableContext";

const OrdersAdminTable = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { orders, getOrders, isLoading1 } = useGetProcessingOrder();
  const [change, setChange] = useState(true);
  const { token } = useContext(VariableContext);

  useEffect(() => {
    async function fetch() {
      // const token = await getAccessTokenSilently();
      await getOrders(token);
    }
    fetch();
  }, [change]);
  return (
    <>
      {!isLoading1 ? (
        <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-3">
          <div class=" overflow-x-auto shadow-md sm:rounded-lg ">
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
                    Userid/ Email
                  </th>
                  <th scope="col" class="px-6 py-3">
                    UN/ Number
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Payment Method
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Actions
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => {
                  return <AdminTableRow data={order} setChange={setChange} />;
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
  );
};

export default OrdersAdminTable;
