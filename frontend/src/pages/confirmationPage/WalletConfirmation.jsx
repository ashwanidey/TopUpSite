import React, { useContext, useEffect } from "react";
import { useTxnStatus } from "../../hooks/wallet/useTxnStatus";
import { VariableContext } from "../../context/VariableContext";
import Spinner from "../../components/Spinner";
import Waiting from "./Waiting";

const WalletConfirmation = () => {
  const { token } = useContext(VariableContext);
  const { orderStatus, response, isLoading, order, status } = useTxnStatus();

  useEffect(() => {
    async function fetchItems() {
      await orderStatus(token);
    }
    fetchItems();
    // console.log(order)
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="mt-[6rem] md:mx-9 mx-5 flex-col gap-3 flex justify-center md:items-center w-full">
          <div className="top-20 bg-[#363C3F] p-10 rounded-lg md:w-[30%] w-full flex flex-col items-center">
            <div className="font-[800] text-[1.5rem] text-white mb-3">
              ORDER PLACED SUCCESSFULLY
            </div>

            <div className="text-white font-[500] flex flex-col gap-3">
              <div>Transaction ID : {order?.txnid}</div>
              <div>Status : {order?.status}</div>
              <div> Amount : {order?.amount}</div>
            </div>
          </div>
          <div className="flex justify-center">
            <a
              href="/home"
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
            >
              Return Home
            </a>
            <a
              href="/wallet"
              class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              View Wallet
            </a>
          </div>
        </div>
      ) : (
        <div className="mt-[6rem] md:mx-9 mx-5 flex-col gap-3 flex justify-center md:items-center "><Waiting/></div>
      )}
    </>
  );
};

export default WalletConfirmation;
