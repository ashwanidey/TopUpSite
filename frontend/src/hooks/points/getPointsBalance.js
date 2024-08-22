import { useContext, useState } from "react";
import { VariableContext } from "../../context/VariableContext";


export const useGetPointsBalance = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [pointsBalance, setPointsBalance] = useState(null);
  const {host,productPageLoading,setProductPageLoading} = useContext(VariableContext);

  const getPointsBalance = async(userid,token)=>{
    setIsLoading(true);
    // setProductPageLoading(true);
    const response = await fetch(`${host}/points/getbalance/${userid}`,{
      method : "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
    })

    setPointsBalance(await response.json());
    // setProductPageLoading(false);
    setIsLoading(false);

  }

  return {isLoading,getPointsBalance,pointsBalance};
 }