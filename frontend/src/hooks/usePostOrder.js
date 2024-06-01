import { useContext, useState } from "react";
import { VariableContext } from "../context/VariableContext";


export const usePostOrder = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [response, setResponse] = useState([]);
  const {host,setSelected,setInput1,setInput2,setPayment} = useContext(VariableContext);
  const [paymentUrl,setPaymentUrl] = useState(null);

  const {order,setOrder} = useContext(VariableContext)
 

  const postOrder = async(values,token)=>{
    setIsLoading(true);
    const response = await fetch(`${host}/order/createOrder`,{
      method : "POST",
      headers: {
        "Content-Type": "application/json",
         authorization: `Bearer ${token}`,
       
      },
      body: JSON.stringify({...values,apiKey:"$2b$10$NWHETA43s8Vqah.PkqfzH.ptOFbE8b7xeKo4R395t7NNZruWr5BR6"}),
    })

    const data = await response.json();
    console.log(data);
   
      // window.location  = "/confirmation"
    

    
    // setSelected(null);
    // setInput1(null);
    // setInput2(null);
    // setPayment(null);
    setIsLoading(false); 

  }

  return {isLoading,postOrder,response};
 }