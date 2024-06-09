import { useContext, useState } from "react";
import { VariableContext } from "../../context/VariableContext";

export const useGetAllTxn = () => {
  const [isLoading1, setIsLoading] = useState(null);
  const [txn, setTxn] = useState([]);
  const { host } = useContext(VariableContext);

  const getTxn = async (token) => {
    setIsLoading(true);
    const response = await fetch(`${host}/admin/alltxn`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setTxn(await response.json());
    setIsLoading(false);
  };

  return { isLoading1, getTxn, txn, setTxn };
};
