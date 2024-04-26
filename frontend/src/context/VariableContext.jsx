import { createContext, useEffect, useState ,useLayoutEffect} from "react";

export const VariableContext= createContext({});
export const VariableProvider = ({children}) => {
  const host = "https://topupsite.onrender.com";
  // const host = "http://localhost:3001";
  const imageUrl = "https://github.com/ashwanidey/TopUpSite/blob/main/frontend/src/assets/"

  const [selected,setSelected] = useState(null);
  const [input1,setInput1] = useState(null);
  const [input2,setInput2] = useState(null);
  const [payment,setPayment] = useState("hi");
  const [order,setOrder] = useState(null);
  const [product,setProduct] = useState(null);
  const [after,setAfter] = useState(null);
 
  
    
 
  return(
    <VariableContext.Provider
    value={{
      host,imageUrl,selected,setSelected,input1,setInput1,input2,setInput2,payment,setPayment,order,setOrder,product,setProduct,after,setAfter
    }}
  >
    {children}
  </VariableContext.Provider>
  )
}