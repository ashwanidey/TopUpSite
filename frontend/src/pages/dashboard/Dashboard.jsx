import React from "react";
import UserProfile from "./UserProfile";
import Balance from "./Balance";
import OrdersTable from "./orders/OrdersTable";
import { useAuth0 } from "@auth0/auth0-react";
import OrdersBox from "./orders/OrdersBox";
import Orders from "./orders/Orders";
import Counter from "./Counter";
import PointsBalance from "./PointsBalance";

const Dashboard = () => {
  const { isLoading } = useAuth0();
  return (
    <>
      {!isLoading && (
        <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-4 ">
          <div
            style={{
              backgroundColor: "#252f3b",
              padding: "",

              marginBottom: "16px",
            }}
            className="flex md:flex-row flex-col gap-10 w-full rounded-lg justify-between md:px-[48px] px-[20px] py-[24px]"
          >
            <UserProfile />
            <Counter/>
            <Balance/>
            {/* <PointsBalance/> */}
          </div>
          <Orders/>
        </div>
      )}
    </>
  );
};

export default Dashboard;
