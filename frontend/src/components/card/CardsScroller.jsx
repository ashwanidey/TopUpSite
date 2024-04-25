import React from "react";
import Cards from "./Cards";

const CardsScroller = ({data}) => {

  const iterations = Array.from({ length: 30 }, (_, index) => index);
  
  return (
    <div className=" relative mt-[25px] h-full">
      <div className=" w-full pb-[10px] overflow-x-auto overflow-y-hidden md:h-[280px] h-[220px]">
        <div className=" ml-[15px] flex gap-6 ">
          {data.map((item) => {
            return <Cards data= {item}/>;
          })}
        </div>
      </div>
    </div>
  );
};

export default CardsScroller;
