import { useContext, useState } from "react";
import { VariableContext } from "../context/VariableContext";


function formatDateToDDMMYYYY(date) {
  let day = String(date.getDate()).padStart(2, '0');
  let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  let year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export const useOrderStatus = () => {
  let currentDate = new Date();
  let formattedDate = formatDateToDDMMYYYY(currentDate);
  const [isLoading, setIsLoading] = useState(null);
  const [response, setResponse] = useState([]);
  const { host, setSelected, setInput1, setInput2, setPayment } =
    useContext(VariableContext);

  const [order,setOrder] = useState(null);
  const [status,setStatus] = useState(null);

  const orderStatus = async (token) => {
    setIsLoading(true);
    let url = window.location.href;

    let urlObj = new URL(url);

    let params = new URLSearchParams(urlObj.search);

    let clientTxnId = params.get("client_txn_id");
    

    const response = await fetch(`${host}/order/orderstatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        client_txn_id: clientTxnId,
        date : formattedDate,
        apiKey: "$2b$10$NWHETA43s8Vqah.PkqfzH.ptOFbE8b7xeKo4R395t7NNZruWr5BR6",
      }),
    });

    const data = await response.json();

    
    setOrder(data.order);
    setStatus(data.data);
    console.log(data.data);
    setIsLoading(false);
  };

  return { isLoading, orderStatus, order,status };
};
