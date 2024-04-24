import React from 'react'
import Cards from './Cards'

const CardsScroller = () => {
  const iterations = Array.from({ length: 30 }, (_, index) => index);
  return (
    <div className=' relative mt-[25px] h-full'>
      <div className=' w-full pb-[10px] overflow-x-auto overflow-y-hidden md:h-[250px] h-[210px]'>
        <div className=' ml-[15px] flex gap-6 '>

          {iterations.map(it => {
            return(
              <Cards/>
            )
          })}
       
        
        </div></div></div>
  )
}

export default CardsScroller