import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProduct } from "../../hooks/useGetProduct";
import Input from "./Input";
import { VariableContext } from "../../context/VariableContext";
import Skeleton from "../../components/skeletons/Skeleton";
import Spinner from "../../components/Spinner";
import { useCheckId} from "../../hooks/useCheckId";

const UserIDForm = () => {
  const { productId } = useParams();
  const {isLoading,getProduct,product} = useGetProduct();
  const {setInput1,setInput2,setProductPageLoading,input1,input2,verified,setVerified} = useContext(VariableContext)

  const {checkId,items,isLoading1,message} = useCheckId();
  // const [message,setMessage] = useState(null);


  const handleSubmit = async() => {
    await checkId(input1,input2);

    // if(items.message === "success"){
    //   setVerified(true);
    //   setMessage(`Username : ${items.username}`);
    // }
    // else{
    //   setMessage("User does not exist");
    // }
  }

  useEffect(()=>{
    async function fetch(){
      await getProduct(productId);
      
    }
    
    fetch();
   
  },[])

  
  return (
    <>
    {!isLoading ?
     <div className="py-[1.5em] px-[2em]  bg-[#293133] flex flex-col items-center rounded-[1em] w-full">
      <div className="text-white font-[500]">Order Information</div>
      <form className="flex flex-col gap-3 mt-5 w-full" onSubmit={(e) => e.preventDefault()}>
        
        {/* {product?.inputs.map(input => {
          return (
            <Input data={input}/>
          )
        })} */}
        
        <div class="relative ">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <span className="font-[500] text-white">{product?.inputs[0].label}</span>
          </div>
          <input
            type="text"
            id="input-group-1"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-[7rem] p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={`Please Enter ${product?.inputs[0].label}`}
            onChange={(e)=>{setInput1(e.target.value)}}
          />
        </div>

        <div class="relative ">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <span className="font-[500] text-white">{product?.inputs[1].label}</span>
          </div>
          <input
            type="text"
            id="input-group-1"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-[7rem] p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={`Please Enter ${product?.inputs[1].label}`}
            onChange={(e)=>{setInput2(e.target.value)}}
          />
        </div>

        {message && <p className="text-white">{message}</p>}

        {!isLoading1 ? (productId === "662bc6b94d4d7c73c57ba046" && <button onClick={handleSubmit} className='bg-[#00C5FF] hover:bg-blue-600 rounded-full p-2.5 text-white font-[600] text-[1.1rem] w-full' >Check</button>) :
        <div className="w-full justify-center items-center flex"><Spinner/></div>}

        
        
      </form>
    </div> : <div className="w-full justify-center items-center flex"><Spinner/></div>}
    
    </>
  );
};

export default UserIDForm;
