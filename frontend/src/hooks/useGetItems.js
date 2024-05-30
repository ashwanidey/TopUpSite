import { useContext, useState } from "react";
import { VariableContext } from "../context/VariableContext";

export const useGetItems = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [items, setItems] = useState([]);
  const {host,productPageLoading,setProductPageLoading} = useContext(VariableContext);

  const getItems = async(productId)=>{
    setIsLoading(true);
    // setProductPageLoading(true);
    const response = await fetch(`${host}/item/${productId}`,{
      method : "GET",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: `Bearer ${token}`,
      },
    })

    setItems(await response.json());
    // setProductPageLoading(false);
    setIsLoading(false);

  }

  return {isLoading,getItems,items};
 }