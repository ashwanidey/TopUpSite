import React from 'react'

const GridCards = () => {
  return (
    <div className="w-full">
      <a
        href={`/product/mb`}
        className="relative rounded-[1em] flex items-center text-center flex-col mt-[30px] px-[8px] pt-[33px] pb-[8px] bg-[#23292A] "
        style={{boxShadow: "0 3px 14px 0 rgba(4, 0, 0, .51)"}}
      >
        <div className="w-[56px] h-[56px] lg:w-[70px] lg:h-[70px] bg-red-400 absolute top-[-30px] rounded-[1em]" style={{boxShadow: "0 3px 14px 0 rgba(4, 0, 0, .51)"}}>
          {" "}
        </div>
        <div className="grow-1  w-full md:mt-4">
          <div className="overflow-hidden text-[#abadaf] md:text-[1.3rem] text-[1rem] md:mt-3">Unipin</div>
          <div className="h-[3em] md:text-[1.5rem] text-[1rem] font-[800] text-white line-clamp-2">Discount</div>

          <div className="w-full h-full md:mt-3">
            <div className="text-[#ff962d] p-[3px]  rounded-full mb-3 mx-3 hover:bg-[#ff962d] hover:text-white" style={{border: "1px solid #ff962d"}}>TOP UP</div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default GridCards