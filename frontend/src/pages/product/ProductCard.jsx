import React, { useState } from "react";

const ProductCard = () => {
  const {selected,setSelected} = useState(null);

  
  console.log(selected)
  return (
    <li>
      <div>
      
      <div className='p-[1em] bg-[#23292A] rounded-[1em] flex gap-5'>
      <img src={"https://i0.wp.com/zerostoreofficial.com/wp-content/uploads/2024/03/1640269077-some.png?resize=74%2C60&ssl=1"} alt="" />
      <div >
        <div className='text-white font-[500]'>13 diamonds + 1 Bonus</div>
        <div className='flex gap-2 items-center'>
          <div className=' text-[0.9rem] line-through text-[#9ACD32]'>$186.60</div>
          <div className='text-[#00BBFF] text-[1rem] font-[500]'>$147.99</div>
        </div>
      </div>
      </div>
      </div>
      
      


    
    </li>
  );
};

export default ProductCard;
