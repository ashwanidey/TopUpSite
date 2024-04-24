import React from "react";
import CardsScroller from "../../components/card/CardsScroller";
import Carousel from "./Carousel";

const HomePage = () => {
  return (
    <>
      <div className="mt-[5rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-5">
      
        <Carousel/>
       
       <div className="font-[800] text-white text-[2rem]">GAMES</div>
        <CardsScroller />
        <div className="font-[800] text-white text-[2rem]">OTT</div>
        <CardsScroller />
        
        
      </div>
    </>
  );
};

export default HomePage;
