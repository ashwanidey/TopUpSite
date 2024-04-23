import React from "react";

const Cards = () => {
  return (
    <div className="w-[115px] max-w-[250px] flex-shrink-0 ">
      <a
        href={`/product/mb`}
        className="relative rounded-[8px] flex items-center text-center flex-col mt-[30px] px-[8px] pt-[33px] pb-[8px] bg-red-900 "
      >
        <div className="w-[56px] h-[56px] bg-red-400 absolute top-[-30px]">
          {" "}
        </div>
        <div className="grow-1 text-[11px]">
          <div className="overflow-hidden ">Unipin</div>
          <div className="h-[3em] font-[500] line-clamp-2">Unipin Voucher </div>

          <div className="w-full mt-[10px]">
            <div class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Default
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Cards;
