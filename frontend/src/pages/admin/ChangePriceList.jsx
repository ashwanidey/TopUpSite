import React, { useContext, useEffect, useState } from "react";
import { useGetItems } from "../../hooks/useGetItems";
import { useUpdateItem } from "../../hooks/admin/useUpdateItem";
import { useAuth0 } from "@auth0/auth0-react";
import { VariableContext } from "../../context/VariableContext";

const ChangePriceList = ({ productId }) => {
  const { getItems, items, isLoading } = useGetItems();
  const [price, setPrice] = useState(null);
  const { UpdateItem, item } = useUpdateItem();
  const { getAccessTokenSilently } = useAuth0();
  const { token } = useContext(VariableContext);

  const handleSubmit = async (itemId) => {
    // const token = await getAccessTokenSilently();
    await UpdateItem(itemId, token, price);
  };

  useEffect(() => {
    async function fetch() {
      await getItems(productId);
    }
    fetch();
  }, [productId]);

  return (
    <>
      {!isLoading && (
        <div className="bg-gray-400 p-5 flex flex-col gap-4">
          {items.map((item) => {
            return (
              <div className="flex gap-4">
                <div>{item.name}</div>
                <input type="text" onChange={(e) => setPrice(e.target.value)} />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleSubmit(item._id)}
                >
                    Submit
                </button>

              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ChangePriceList;
