import React from "react";

const ProductCard = () => {
  return (
    <div
      style={{
        padding: "clamp(8px, 2.5vw, 24px) clamp(8px, 2.5vw, 18px)",
        transition: "transform .25s ease-in",
      }}
      className="bg-[#262f3b] rounded-[8px] min-h-[53px] "
    >
      <div className="flex flex-wrap flex-col relative" style={{width: "calc(100% -(clamp(32px, 5vw, 53px) + 8px))" , minHeight: "calc(clamp(32px, 5vw, 53px) - 16px)"}}>
        
          <div> $ 4.40</div>
          <div> $5.00</div>
          <div className="w-[40px] h-[40px] bg-red-600 absolute top-[8px] right-[8px]"></div>
        
       
      </div>

      <div>
        <h3 className="font-[400] " style={{fontSize: "clamp(12px,3.4vw,16px)"}}>499 W-Gold</h3>
      </div>
    </div>
  );
};

export default ProductCard;
