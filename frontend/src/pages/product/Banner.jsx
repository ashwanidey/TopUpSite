import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProduct } from '../../hooks/useGetProduct';
import defaultImg  from "../../assets/productimage/bgmi.jpeg";

const Banner = () => {

  const {productId}  = useParams();
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
       <div className="max-w-[56px] min-w-[56px] h-[56px] lg:max-w-[80px] lg:h-[80px] lg:min-w-[80px] rounded-[1em] overflow-hidden" style={{boxShadow: "0 3px 14px 0 rgba(4, 0, 0, .51)"}}>
      <img src={`/${product?.imgpath}`} alt=""  className="object-cover w-full h-full rounded-[1em]" onError={(e) => {
              e.target.src = defaultImg;
            }} />
      </div>
      <div className='flex flex-col'>
      <div className='text-white font-[700] md:text-[2rem]  text-[1.5rem]'>
            {product && (product?.name).toUpperCase()}
      </div>
      <div className='text-white font-[700] text-[1.1rem] '>
            {/* {product?.note} */}
            Note
      </div>
      </div>
      </div>
    </div> : null
}
    </>
  )
}

export default Banner