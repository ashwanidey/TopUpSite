import React, { useContext, useEffect, useLayoutEffect } from "react";
import { VariableContext } from "../../context/VariableContext";
import { useOrderStatus } from "../../hooks/useOrderStatus";

const Confirmation = () => {
  const { product,setProduct,token,input1} = useContext(VariableContext);
  

  const {orderStatus,response,isLoading,order,status } = useOrderStatus();

  // useEffect(()=>{
  //  const fetch = async() => {
  //     await orderStatus(token); 
  //   }
    
  //   fetch()
  //   console.log(response)
  // },[])

  useEffect(() => {
    async function fetchItems() {
      await orderStatus(token);
    }
    fetchItems();
  }, []);
  
  return (
    <>
      <div className="mt-[6rem] md:mx-9 mx-5 md:flex-row flex-col gap-3 flex justify-center md:items-center w-full">
        <div className="top-20 bg-[#363C3F] p-10 rounded-lg md:w-[30%] w-full flex flex-col items-center">
          <div className="font-[800] text-[1.5rem] text-white mb-3">ORDER PLACED</div>
          <div className="text-white font-[500] flex flex-col gap-3">
          <div>OrderID : {order?._id}</div>
            <div>Item Name : {order?.itemname}</div>
            <div>Payment Mode : {order && (order?.paymentmode).toUpperCase()}</div>
            <div>Status : {order?.status}</div>
              {/* <div>{input1} : {input1}</div> */}
              <div>input1 : {order?.input1}</div>
              <div>input2 : {order?.input2}</div>

            <div>Price : {order?.value}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
