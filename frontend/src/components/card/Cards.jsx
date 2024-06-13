import React, { useCallback, useContext, useEffect, useState } from "react";
import defaultImg  from "../../assets/productimage/bgmi.jpeg";
import { VariableContext } from "../../context/VariableContext";
// import image from "../../assets/productimage/mobilelegends.jpeg"


const Cards = ({data}) => {
  const {imageUrl} = useContext(VariableContext);

  // frontend\dist\itemimage\bgmiuc.png
  
  return (
    <div className="md:w-[16%] lg:w-[18%] w-[115px] max-w-[250px] flex-shrink-0 h-[180px] md:h-[240px]">
      <a
        href={`/product/${data._id}`}
        className="relative rounded-[1em] flex items-center text-center flex-col mt-[30px] px-[8px] pt-[33px] pb-[8px] bg-[#23292A] h-full "
        style={{boxShadow: "0 3px 14px 0 rgba(4, 0, 0, .51)"}}
      >
        <div className="w-[56px] h-[56px] lg:w-[80px] lg:h-[80px] absolute top-[-30px] rounded-[1em] overflow-hidden" style={{boxShadow: "0 3px 14px 0 rgba(4, 0, 0, .51)"}}>
          <img src={`/${data.imgpath}`} onError={(e) => {
              e.target.src = defaultImg;
            }} className="object-cover w-full h-full rounded-[1em]" alt="" />       
           </div>
        <div className="grow-1  w-full md:mt-4  flex flex-col justify-around h-full">
          <div>
          <div className="overflow-hidden text-[#abadaf] md:text-[1.3rem] text-[1rem] md:mt-3">{data.name}</div>
          <div className="h-[3em] md:text-[1.5rem] text-[1rem] font-[800] text-white line-clamp-2">Discount</div>
          </div>

          <div className="w-full md:mt-auto ">
            <div className="text-[#ff962d] p-[3px]  rounded-full mb-0 mx-3 hover:bg-[#ff962d] hover:text-white text-[0.9rem] md:text-[1.0rem]"  style={{border: "1px solid #ff962d"}}>TOP UP</div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Cards;
