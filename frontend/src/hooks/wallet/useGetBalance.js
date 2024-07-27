import { useContext, useState } from "react";
import { VariableContext } from "../../context/VariableContext";


export const useGetBalance = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [balance, setBalance] = useState(null);
  const {host,productPageLoading,setProductPageLoading} = useContext(VariableContext);

  const getBalance = async(userid,token)=>{
    setIsLoading(true);
    // setProductPageLoading(true);
    const response = await fetch(`${host}/wallet/getbalance/${userid}`,{
      method : "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
    })

    setBalance(await response.json());
    // setProductPageLoading(false);
    setIsLoading(false);

  }

  return {isLoading,getBalance,balance};
 }