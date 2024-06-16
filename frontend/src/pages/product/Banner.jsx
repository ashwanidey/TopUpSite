import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProduct } from '../../hooks/useGetProduct';
import defaultImg  from "../../assets/productimage/bgmi.jpeg";
import { VariableContext } from '../../context/VariableContext';

const Banner = () => {

  const {productId,id}  = useParams();
  const {mlbb,mlbbph} = useContext(VariableContext)
  const {getProduct,product,isLoading} = useGetProduct();
  
  useEffect(()=>{
    async function fetch(){
      await getProduct(productId);
      
    }
    
    fetch();
   
  },[])
  return (
    <>
    {!isLoading ? 
    <div className='w-full mb-10'>
      <div className='flex md:gap-10 gap-5'>
       <div className="max-w-[90px] min-w-[90px] h-[90px] lg:max-w-[130px] lg:h-[130px] lg:min-w-[130px] rounded-[1em] overflow-hidden" style={{boxShadow: "0 3px 14px 0 rgba(4, 0, 0, .51)"}}>
      <img src={`/${product?.imgpath}`} alt=""  className="object-cover w-full h-full rounded-[1em]" onError={(e) => {
              e.target.src = defaultImg;
            }} />
      </div>
      <div className='flex flex-col'>
      <div className='text-white font-[700] md:text-[2rem]  text-[1.5rem]'>
            {product && (product?.name).toUpperCase()}
      </div>
      <div className='text-blue-500 font-[700] lg:text-[1.3rem] text-[1.1rem] '>
            
            {(id === mlbb || id === mlbbph) ? "Instant Delivery" : "Delivery within 30 mins"}
      </div>
      <div className='text-white font-[700] text-[1rem] md:text-[1.1rem] lg:mt-5'>
            Note : {product?.importantnote}
            
      </div>
      </div>
      </div>
    </div> : null
}
    </>
  )
}

export default Banner