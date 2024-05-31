import { useContext, useState } from "react"
import { VariableContext } from "../../context/VariableContext"


export const useLogin = () => {
  const {host} = useContext(VariableContext);
  const [loginErr,setLoginErr] = useState(null);

  const login = async(email,password) => {
    try{
    const response = await fetch(`${host}/auth/login`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email:email,password:password}),
    })
    const data  = await response.json();
    

    if(data && !data.msg){
    window.localStorage.setItem("isLoggedIn",true);
    window.localStorage.setItem("token",JSON.stringify(data.token));
    window.localStorage.setItem("user",JSON.stringify(data.user));
    window.location ="/home"
    console.log("LoggedIn")
    }
    else{
      setLoginErr(data.msg);
    }


  }
  catch(error){
    console.log(error);
  }
  }
  return {login,loginErr};
}