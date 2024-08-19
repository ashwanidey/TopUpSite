import { useContext, useState } from "react";
import { VariableContext } from "../../context/VariableContext";

export const usePostTransaction = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [response, setResponse] = useState([]);
  const { host, setSelected, setInput1, setInput2, setPayment } =
    useContext(VariableContext);
  const [paymentUrl, setPaymentUrl] = useState(null);

  const { order, setOrder } = useContext(VariableContext);

  const postOrder = async (values, token) => {
    setIsLoading(true);
    const response = await fetch(`${host}/wallet/topup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...values }),
    });

    const data = await response.json();


    // UPI Gateway
    // window.location = data.data.payment_url;

    //PhonePe
    window.location = data.url;

    // setSelected(null);
    // setInput1(null);
    // setInput2(null);
    // setPayment(null);
    setIsLoading(false);
  };

  return { isLoading, postOrder, response };
};
