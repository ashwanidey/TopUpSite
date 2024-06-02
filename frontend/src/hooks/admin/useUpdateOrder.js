import { useContext, useState } from "react";
import { VariableContext } from "../../context/VariableContext";

export const useUpdateOrder = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [order, setOrder] = useState([]);
  const { host } = useContext(VariableContext);

  const UpdateOrder = async (orderId, token, status1, reason) => {
    setIsLoading(true);
    const response = await fetch(
      `${host}/admin/updateorder/${orderId}/${status1}/${reason}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrder(await response.json());
    setIsLoading(false);
  };

  return { isLoading, UpdateOrder, order };
};
