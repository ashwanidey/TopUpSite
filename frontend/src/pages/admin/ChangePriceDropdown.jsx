import React, { useContext, useEffect, useState } from 'react'
import { useGetProducts } from '../../hooks/useGetProducts';
import { useAuth0 } from '@auth0/auth0-react';
import ChangePriceList from './ChangePriceList';
import { VariableContext } from '../../context/VariableContext';

const ChangePrice = () => {
  const [selectedOption, setSelectedOption] = useState('662bc6b94d4d7c73c57ba046');

  const {getAllProducts,products,isLoading} = useGetProducts();
  const {getAccessTokenSilently} = useAuth0();
  const {token} = useContext(VariableContext);

  useEffect(()=>{
    async function fetch(){
      // const token = await getAccessTokenSilently();
      await getAllProducts(token);
    }
    fetch();
  },[])

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    
  };
  
  return (
    <>{!isLoading && 
      <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-3">
      <select onChange={handleChange}>
      
      {products.map(product=>{
        return(
          <option value={product._id} onChange={handleChange}>{product.name}</option>
        )
      })}
    </select>
    <ChangePriceList productId = {selectedOption}/>
    </div>
    }</>
    
  )
}

export default ChangePrice