import React from "react";

const BalanceErr = () => {
  return (
    <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-4  ">
      <div className="flex justify-center">
        <div className="bg-yellow-400 p-5 rounded-lg flex flex-col items-center">
          <div className="bg-white text-blue-700 p-5 rounded-lg md:text-[1.5rem] text-[1.2rem] font-[700]">
            INSUFFICIENT BALANCE
          </div>
          <div className="mt-4 ">
            <a
              href="/wallet"
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 "
            >
              Wallet
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceErr;
