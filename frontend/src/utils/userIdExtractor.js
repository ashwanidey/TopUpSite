export const extractPart = (clientId) =>  {
   
  const parts = clientId.split('|');
  
 
  return parts[1];
}