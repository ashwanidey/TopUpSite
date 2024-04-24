import React from "react";

const Cards = () => {
  return (
    <div className="md:w-[16%] lg:w-[20%] w-[115px] max-w-[250px] flex-shrink-0  ">
      <a
        href={`/product/mb`}
        className="relative rounded-[8px] flex items-center text-center flex-col mt-[30px] px-[8px] pt-[33px] pb-[8px] bg-[#262a35] "
        style={{boxShadow: "0 3px 14px 0 rgba(4, 0, 0, .51)"}}
      >
        <div className="w-[56px] h-[56px] lg:w-[70px] lg:h-[70px] bg-red-400 absolute top-[-30px]">
          {" "}
        </div>
        <div className="grow-1  w-full md:mt-4">
          <div className="overflow-hidden text-[#abadaf] text-[1.3rem] md:mt-3">Unipin</div>
          <div className="h-[3em] md:text-[1.5rem] text-[1.3rem] font-[800] text-white line-clamp-2">Discount</div>

          <div className="w-full h-full md:mt-3">
            <div className="text-[#ff962d] p-[3px] w-full rounded-full " style={{border: "1px solid #ff962d"}}>TOP UP</div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Cards;
