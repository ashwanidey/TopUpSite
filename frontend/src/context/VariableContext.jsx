import { createContext, useEffect, useState ,useLayoutEffect} from "react";
import { json } from "react-router-dom";

export const VariableContext= createContext({});
export const VariableProvider = ({children}) => {
  // const host = "http://localhost:8080";
  const host = "https://topupsite.netlify.app";
  const imageUrl = "../../assets/"
  const mlbb = "100";
  const mlbbph = "112";
  

  const admin1 = "google-oauth2|117233432545840735238"
  const admin2 = "google-oauth2|101231187167198927926"
  const admin3 = "auth0|662ca421e8cb006d9637608e"

  const [selected,setSelected] = useState(null);
  const [input1,setInput1] = useState(null);
  const [input2,setInput2] = useState(null);
  const [payment,setPayment] = useState("upi");
  const [order,setOrder] = useState(null);
  const [product,setProduct] = useState(null);
  const [after,setAfter] = useState(null);

  const [show,setShow] = useState(false);

  const [productPageLoading,setProductPageLoading] = useState(false);

  const [isLoggedIn,setIsLoggedIn]  = useState(false);
  const [user,setUser] = useState(null);
  const [token,setToken] = useState(null);

  const [verified,setVerified] = useState(null);

  const deleteUser = () => {
    localStorage.setItem("user", JSON.stringify([]));
    localStorage.setItem("token", JSON.stringify(""));
    localStorage.setItem("isLoggedIn", !isLoggedIn);
  };

  useLayoutEffect(() => {
    if(window.localStorage.getItem("isLoggedIn")){
      setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
      setUser(JSON.parse(localStorage.getItem("user")));
      setToken(JSON.parse(localStorage.getItem("token")))
    }
  },[])

  return(
    <VariableContext.Provider
    value={{
      host,imageUrl,selected,setSelected,input1,setInput1,input2,setInput2,payment,setPayment,order,setOrder,product,setProduct,after,setAfter,admin1,admin2,admin3,show,setShow,productPageLoading,setProductPageLoading,isLoggedIn,deleteUser,user,token,verified,setVerified,mlbb,mlbbph
    }}
  >
    {children}
  </VariableContext.Provider>
  )
}
