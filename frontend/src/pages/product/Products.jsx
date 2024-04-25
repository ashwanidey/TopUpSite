import React from 'react'
import ProductCard from './ProductCard'
import image from "../../assets/WhatsApp Image 2024-04-25 at 10.48.28.jpeg"

const Products = () => {
  const iterations = Array.from({ length: 10 }, (_, index) => index);
  return (
   
    <div className='w-full'>
      
      <ul className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5 w-full'>{iterations.map(it => {
            return(
              <ProductCard/>
            )
          })}</ul>

      
        
     
  
        
    </div>
  )
}

export default Products