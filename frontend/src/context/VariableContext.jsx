import { createContext, useEffect, useState ,useLayoutEffect} from "react";

export const VariableContext= createContext({});
export const VariableProvider = ({children}) => {
  const host = "https://topupsite.onrender.com";
  // const host = "http://localhost:3001";
  const imageUrl = "https://github.com/ashwanidey/TopUpSite/blob/main/frontend/src/assets/"

  const [selected,setSelected] = useState(null);
 
  
    
 
  return(
    <VariableContext.Provider
    value={{
      host,imageUrl,selected,setSelected
    }}
  >
    {children}
  </VariableContext.Provider>
  )
}