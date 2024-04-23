import React from 'react'
import UserIDForm from './UserIDForm'
import Products from './Products'
import Payments from './Payments'

const ProductPage = () => {
  return (
    <div className='mt-[5rem] mx-5'>
      <UserIDForm/>
      <Products/>
      <Payments/>
    </div>
  )
}

export default ProductPage