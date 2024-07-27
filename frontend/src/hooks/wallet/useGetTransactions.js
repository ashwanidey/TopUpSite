import { useContext, useState } from "react";
import { VariableContext } from "../../context/VariableContext";


export const useGetTransactions = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [txns, setTxns] = useState([]);
  const {host,productPageLoading,setProductPageLoading} = useContext(VariableContext);

  const getTxns = async(userid,token)=>{
    setIsLoading(true);
    // setProductPageLoading(true);
    const response = await fetch(`${host}/wallet/gettransactions/${userid}`,{
      method : "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
    })

    setTxns(await response.json());
    // setProductPageLoading(false);
    setIsLoading(false);

  }

  return {isLoading,getTxns,txns};
 }