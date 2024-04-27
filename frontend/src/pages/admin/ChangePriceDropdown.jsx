import React, { useEffect, useState } from 'react'
import { useGetProducts } from '../../hooks/useGetProducts';
import { useAuth0 } from '@auth0/auth0-react';
import ChangePriceList from './ChangePriceList';

const ChangePrice = () => {
  const [selectedOption, setSelectedOption] = useState('662bc6b94d4d7c73c57ba046');

  const {getAllProducts,products,isLoading} = useGetProducts();
  const {getAccessTokenSilently} = useAuth0();

  useEffect(()=>{
    async function fetch(){
      const token = await getAccessTokenSilently();
      await getAllProducts(token);
    }
    fetch();
  },[])

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    
  };
  
  return (
    <>{!isLoading && 
      <>
      <select onChange={handleChange}>
      
      {products.map(product=>{
        return(
          <option value={product._id} onChange={handleChange}>{product.name}</option>
        )
      })}
    </select>
    <ChangePriceList productId = {selectedOption}/>
    </>
    }</>
    
  )
}

export default ChangePrice