import React from "react";
import CardsScroller from "../../components/card/CardsScroller";
import Carousel from "./Carousel";

const HomePage = () => {
  return (
    <>
      <div className="mt-[5rem] mx-8 flex flex-col gap-5">
      
        <Carousel/>
       
       <div>Games</div>
        <CardsScroller />
        <div>OTT</div>
        <CardsScroller />
        
        
      </div>
    </>
  );
};

export default HomePage;
