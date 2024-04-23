import React from 'react'
import ProductCard from './ProductCard'

const Products = () => {
  const iterations = Array.from({ length: 10 }, (_, index) => index);
  return (
   
    <div>
      <div>2 PLEASE SELECT PACKAGE</div>
      <div className='grid grid-cols-2 gap-5'>{iterations.map(it => {
            return(
              <ProductCard/>
            )
          })}</div>
    </div>
  )
}

export default Products