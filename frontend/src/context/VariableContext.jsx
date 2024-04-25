import { createContext, useEffect, useState ,useLayoutEffect} from "react";

export const VariableContext= createContext({});
export const VariableProvider = ({children}) => {
  const host = "https://topupsite.onrender.com";
  // const host = "http://localhost:3001";
 
  
    
 
  return(
    <VariableContext.Provider
    value={{
      host
    }}
  >
    {children}
  </VariableContext.Provider>
  )
}