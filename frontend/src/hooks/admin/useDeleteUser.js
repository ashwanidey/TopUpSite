import { useContext, useState } from "react";
import { VariableContext } from "../../context/VariableContext";

export const useDeleteUser = () => {
  const [isLoading1, setIsLoading] = useState(null);
  const [respone, setResponse] = useState([]);
  const { host } = useContext(VariableContext);

  const deleteUser = async (token,email) => {
    setIsLoading(true);
    const response = await fetch(`${host}/admin/deleteuser/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json()
    setResponse(data.msg);
    setIsLoading(false);
  };

  return { isLoading1, deleteUser, respone, setResponse};
};
