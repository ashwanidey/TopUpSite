import { useContext, useState } from "react";
import { VariableContext } from "../../context/VariableContext";


export const usePostPoints = () => {
  const [isLoading1, setIsLoading1] = useState(null);
  const [message, setMessage] = useState(null);

  const {host} = useContext(VariableContext);
 
    const postPoints = async(values,token)=>{
      setIsLoading1(true);
      const response = await fetch(`${host}/points/redeempoints`,{
        method : "POST",
        headers: {
          "Content-Type": "application/json",
           authorization: `Bearer ${token}`,
         
        },
        body: JSON.stringify({...values}),
      })
      const data = await response.json();

      setMessage(data.msg);
    }
  
      

  return { postPoints,message};
}
