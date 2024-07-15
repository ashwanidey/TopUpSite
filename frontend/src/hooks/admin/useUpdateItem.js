// import { useContext, useState } from "react";
// import { VariableContext } from "../../context/VariableContext";

// export const useUpdateItem = () => {
//   const [isLoading, setIsLoading] = useState(null);
//   const [item, setItem] = useState([]);
//   const { host } = useContext(VariableContext);

//   const UpdateItem = async (itemId, token, price) => {
//     setIsLoading(true);
//     const response = await fetch(
//       `${host}/admin/updateitem/${itemId}/${price}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     setItem(await response.json());
//     setIsLoading(false);
//   };

//   return { isLoading, UpdateItem, item };
// };


import { useContext, useState } from "react";
import { VariableContext } from "../../context/VariableContext";

export const useUpdateItem = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [item, setItem] = useState([]);
  const { host } = useContext(VariableContext);

  const UpdateItem = async (itemId, token, { price, resellPrice }) => {
    setIsLoading(true);
    const response = await fetch(
      `${host}/admin/updateitem/${itemId}/${price}/${resellPrice}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setItem(await response.json());
    setIsLoading(false);
  };

  return { isLoading, UpdateItem, item };
};
