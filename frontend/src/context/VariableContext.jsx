import { createContext, useEffect, useState ,useLayoutEffect} from "react";

export const VariableContext= createContext({});
export const VariableProvider = ({children}) => {
  const host = "https://topupsite.onrender.com";
  // const host = "http://localhost:3001";
  const imageUrl = "https://github.com/ashwanidey/TopUpSite/blob/main/frontend/src/assets/"
 
  
    
 
  return(
    <VariableContext.Provider
    value={{
      host,imageUrl
    }}
  >
    {children}
  </VariableContext.Provider>
  )
}