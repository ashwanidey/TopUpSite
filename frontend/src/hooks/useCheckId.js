import { useContext, useState } from "react";
import { VariableContext } from "../context/VariableContext";

export const useCheckId = () => {
  const [isLoading1, setIsLoading] = useState(null);
  const [items, setItems] = useState([]);
  const {host,productPageLoading,setProductPageLoading} = useContext(VariableContext);

  const checkId = async(userid,zoneid)=>{
    setIsLoading(true);
    // setProductPageLoading(true);
    const response = await fetch(`${host}/order/checkid`,{
      method : "POST",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: `Bearer ${token}`,
      },
      body : JSON.stringify({
        userid : userid,
        zoneid : zoneid
      })
    })

    setItems(await response.json());
   
    setIsLoading(false);

  }

  return {isLoading1,checkId,items};
 }