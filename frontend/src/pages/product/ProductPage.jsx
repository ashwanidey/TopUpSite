import React, { useContext } from 'react'
import UserIDForm from './UserIDForm'
import Products from './Products'
import Payments from './Payments'
import { VariableContext} from '../../context/VariableContext'
import Toast from '../../components/Toast'
import BootStrapToast from '../../components/BootStrapToast'

const ProductPage = () => {
  const {input1,input2,selected,payment,show,setShow} = useContext(VariableContext);

  
 
  
  
  return (
    <div className='mt-[6rem] md:mx-9 mx-5 flex md:flex-row flex-col gap-3'>
     
      <Products/>
      <div className='flex flex-col  md:w-[50%] gap-5'>
      <UserIDForm/>
      <Payments/>
      </div>
    </div>
  )
}

export default ProductPage