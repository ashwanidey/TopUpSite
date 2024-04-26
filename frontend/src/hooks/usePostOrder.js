import { useContext, useState } from "react";
import { VariableContext } from "../context/VariableContext";


export const usePostOrder = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [response, setResponse] = useState([]);
  const {host} = useContext(VariableContext);

  const {order,setOrder} = useContext(VariableContext)
 

  const postOrder = async(values,token)=>{
    setIsLoading(true);
    const response = await fetch(`${host}/order/newOrder`,{
      method : "POST",
      headers: {
        "Content-Type": "application/json",
         authorization: `Bearer ${token}`,
       
      },
      body: JSON.stringify(values),
    })

    setOrder(await response.json());
    setIsLoading(false);

  }

  return {isLoading,postOrder,response};
 }