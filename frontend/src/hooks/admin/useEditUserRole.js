import { useContext, useState } from "react";
import { VariableContext } from "../../context/VariableContext";

export const useEditUserRole = () => {
  const [isLoading1, setIsLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const { host } = useContext(VariableContext);

  const editUserRole = async (token, email, role) => {
    setIsLoading(true);
    const response = await fetch(`${host}/admin/edituser/${email}?role=${role}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setResponse(data.msg);
    setIsLoading(false);
  };

  return { isLoading1, editUserRole, response, setResponse };
};