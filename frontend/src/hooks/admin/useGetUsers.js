import { useContext, useState } from "react";
import { VariableContext } from "../../context/VariableContext";

export const useGetUsers = () => {
  const [isLoading1, setIsLoading] = useState(null);
  const [users, setUsers] = useState([]);
  const { host } = useContext(VariableContext);

  const getUsers = async (token) => {
    setIsLoading(true);
    const response = await fetch(`${host}/admin/usersdata`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(await response.json());
    setIsLoading(false);
  };

  return { isLoading1, getUsers, users, setUsers };
};
