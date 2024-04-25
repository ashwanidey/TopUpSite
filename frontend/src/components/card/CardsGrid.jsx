import React from 'react'
import Cards from './Cards';
import GridCards from './GridCards';

const CardsGrid = ({data}) => {
  
  const iterations = Array.from({ length: 10 }, (_, index) => index);
  return (
    <div className="  mt-[25px]">
    <div className="pb-[10px] ">
      <div className=" grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-5  ">
        {data.map((game) => {
          
          return <GridCards data={game} />;
        })}
      </div>
    </div>
  </div>
  )
}

export default CardsGrid