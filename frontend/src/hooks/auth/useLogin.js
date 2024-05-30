import { useContext } from "react"
import { VariableContext } from "../../context/VariableContext"


export const useLogin = () => {
  const {host} = useContext(VariableContext);

  const login = async(email,password) => {
    try{
    const response = await fetch(`${host}/auth/login`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email:email,password:password}),
    })
    const data  = await response.json();
    if(data.msg === "Invalid credentials. "){
      return;
    }
    window.localStorage.setItem("isLoggedIn",true);
    window.localStorage.setItem("token",JSON.stringify(data.token));
    window.localStorage.setItem("user",JSON.stringify(data.user));
    window.location ="/home"
    console.log("LoggedIn")


  }
  catch(error){
    console.log(error);
  }
  }
  return {login};
}