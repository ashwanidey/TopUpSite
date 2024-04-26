import { useContext, useState } from "react";
import { VariableContext } from "../context/VariableContext";


export const useGetProduct = () => {
  const [isLoading, setIsLoading] = useState(null);
  const {product, setProduct} = useContext(VariableContext);
  const {host} = useContext(VariableContext);

  const getProduct = async(productId)=>{
    setIsLoading(true);
    const response = await fetch(`${host}/product/eachproduct/${productId}`,{
      method : "GET",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: `Bearer ${token}`,
      },
    })
    const json = await response.json()
    setProduct(json);
  
    setIsLoading(false);

  }

  return {isLoading,getProduct,product};
 }