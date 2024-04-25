import React from "react";

const UserIDForm = () => {
  return (
    <div className="py-[1.5em] px-[2em]  bg-[#293133] flex flex-col items-center rounded-[1em] w-full">
      <div className="text-white font-[500]">Order Information</div>
      <form className="flex flex-col gap-3 mt-5 w-full">
        

        <div class="relative ">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <span className="font-[500] text-white">UserID</span>
          </div>
          <input
            type="text"
            id="input-group-1"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-20 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please Enter User ID"
          />
        </div>
        {/* </div> */}
        <div class="relative ">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <span className="font-[500] text-white">ZoneID</span>
          </div>
          <input
            type="text"
            id="input-group-1"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-20 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please Enter Zone ID"
          />
        </div>
      </form>
    </div>
  );
};

export default UserIDForm;
