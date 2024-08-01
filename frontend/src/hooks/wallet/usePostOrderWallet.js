import { useContext, useState } from "react";
import { VariableContext } from "../../context/VariableContext";



export const usePostOrderWallet = () => {
  const [isLoading1, setIsLoading1] = useState(null);
  const [message, setMessage] = useState(null);
  const {host,setSelected,setInput1,setInput2,setPayment} = useContext(VariableContext);
  const [paymentUrl,setPaymentUrl] = useState(null);

  const {order,setOrder} = useContext(VariableContext)
 

  const postOrderWallet = async(values,token)=>{
    setIsLoading1(true);
    const response = await fetch(`${host}/order/createWalletOrder`,{
      method : "POST",
      headers: {
        "Content-Type": "application/json",
         authorization: `Bearer ${token}`,
       
      },
      body: JSON.stringify({...values,apiKey:"$2b$10$NWHETA43s8Vqah.PkqfzH.ptOFbE8b7xeKo4R395t7NNZruWr5BR6"}),
    })

    const data = await response.json();
   
    if(data.msg){
      window.location  = data.redirect_url

    }else
    window.location  = data.redirect_url
    

    
    // setSelected(null);
    // setInput1(null);
    // setInput2(null);
    // setPayment(null);
    setIsLoading1(false); 

  }

  return {isLoading1,postOrderWallet,message};
 }