import { useContext, useState } from "react";
import { VariableContext } from "../context/VariableContext";

export const useCheckId = () => {
  const [isLoading1, setIsLoading] = useState(null);
  const [items, setItems] = useState([]);
  const {host,productPageLoading,setProductPageLoading,setVerified} = useContext(VariableContext);
  const [message,setMessage] = useState(null);

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
    const data = await response.json();
    // setItems(await response.json());
    if (data.message === "success") {
      if (data.use === "b") {
          setVerified(false);
          setMessage("Recharge for Indo IDs is not permitted");
      } else {
          setVerified(true);
          setMessage(`Username: ${data.username}`);
      }
  } else {
      setVerified(false);
      setMessage("User does not exist");
  }  
   
    setIsLoading(false);

  }

  return {isLoading1,checkId,items,message};
 }