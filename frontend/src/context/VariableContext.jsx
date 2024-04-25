import { createContext, useEffect, useState ,useLayoutEffect} from "react";

export const VariableContext= createContext({});
export const VariableProvider = ({children}) => {
  const [selectedConversation,setSelectedConversation] = useState(null);
  const [messages,setMessages] = useState([]);
 
  
    
 
  return(
    <VariableContext.Provider
    value={{
      selectedConversation,setSelectedConversation,messages,setMessages
    }}
  >
    {children}
  </VariableContext.Provider>
  )
}