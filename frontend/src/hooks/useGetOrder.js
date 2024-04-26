import { useContext, useState } from "react";
import { VariableContext } from "../context/VariableContext";

export const useGetOrder = () => {
  const [isLoading1, setIsLoading] = useState(null);
  const [orders, setOrders] = useState([]);
  const {host} = useContext(VariableContext);

  const getOrders = async(userId)=>{
    setIsLoading(true);
    const response = await fetch(`${host}/order/${userId}`,{
      method : "GET",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: `Bearer ${token}`,
      },
    })

    setOrders(await response.json());
    setIsLoading(false);

  }

  return {isLoading1,getOrders,orders};
 }