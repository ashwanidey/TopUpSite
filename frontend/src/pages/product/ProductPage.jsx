import React from 'react'
import UserIDForm from './UserIDForm'
import Products from './Products'
import Payments from './Payments'

const ProductPage = () => {
  return (
    <div className='mt-[5rem] md:mx-9 mx-5 flex md:flex-row flex-col gap-3'>
      <Products/>
      <div className='flex flex-col  md:w-[50%] gap-5'>
      <UserIDForm/>
      <Payments/>
      </div>
    </div>
  )
}

export default ProductPage