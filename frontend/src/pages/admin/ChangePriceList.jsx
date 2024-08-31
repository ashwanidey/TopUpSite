import React, { useContext, useEffect, useState } from "react";
import { useGetItems } from "../../hooks/useGetItems";
import { useUpdateItem } from "../../hooks/admin/useUpdateItem";
import { useAuth0 } from "@auth0/auth0-react";
import { VariableContext } from "../../context/VariableContext";

const ChangePriceList = ({ productId }) => {
  const { getItems, items, isLoading } = useGetItems();
  const [price, setPrice] = useState(null);
  const [resellPrice, setResellPrice] = useState(null); // State for resell price
  const { UpdateItem } = useUpdateItem();
  const { token } = useContext(VariableContext);

  const handleSubmit = async (itemId) => {
    await UpdateItem(itemId, token, { price, resellPrice }); // Update function to include resell price
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
        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col gap-6">
          {items.map((item) => (
            <div
              className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-gray-700 rounded-md"
              key={item._id}
            >
              <div className="text-white text-lg font-medium">{item.name}</div>
              <input
                type="text"
                placeholder="Price"
                className="p-2 w-full sm:w-1/3 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="text"
                placeholder="Resell Price"
                className="p-2 w-full sm:w-1/3 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setResellPrice(e.target.value)}
              />
              <button
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleSubmit(item._id)}
              >
                Submit
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ChangePriceList;
