import { useContext, useState } from "react";
import { VariableContext } from "../../context/VariableContext";

export const useUpdateInstock = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { host } = useContext(VariableContext);
  const { token } = useContext(VariableContext);

  const updateInstock = async (productId, instock) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${host}/admin/updateinstock`,
        {
          method: "POST", // Changed to POST
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure token is defined or pass as a parameter
          },
          body: JSON.stringify({ productId, instock })
        }
      );
      setResponse(await response.json());
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, updateInstock, response };
};
