import React, { useContext, useEffect, useState } from 'react';
import { useGetItems } from '../../hooks/useGetItems';
import { useUpdateItem } from "../../hooks/admin/useUpdateItem";
import { useUpdateInstock } from '../../hooks/admin/useUpdateInstock'; // Import the new hook
import { VariableContext } from '../../context/VariableContext';

const ChangePriceList = ({ productId }) => {
  const { getItems, items, isLoading } = useGetItems();
  const [price, setPrice] = useState(null);
  const [resellPrice, setResellPrice] = useState(null);
  const { UpdateItem } = useUpdateItem();
  const [instock, setInstock] = useState('true');
  const { token } = useContext(VariableContext);

  const { updateInstock, isLoading: isUpdatingInstock } = useUpdateInstock(); // Use the new hook

  const [message, setMessage] = useState(''); // State for message

  const handleSubmit = async (itemId) => {
    try {
      await UpdateItem(itemId, token, { price, resellPrice });
      setMessage('Price updated successfully');
    } catch (error) {
      setMessage('Error updating price');
    }
  };

  const handleInstockSubmit = async () => {
    try {
      await updateInstock(productId, instock);
      setMessage('Product instock status updated successfully');
    } catch (error) {
      setMessage('Error updating instock status');
    }
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
          {/* Message Display */}
          {message && (
            <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4">
              {message}
            </div>
          )}
          
          <div className="text-white text-lg font-medium">Instock Status</div>
          <div className="flex gap-4 mb-4">
            <label>
              <input
                type="radio"
                name="instock"
                value="true"
                checked={instock === 'true'}
                onChange={() => setInstock('true')}
              />
              In Stock
            </label>
            <label>
              <input
                type="radio"
                name="instock"
                value="false"
                checked={instock === 'false'}
                onChange={() => setInstock('false')}
              />
              Out of Stock
            </label>
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleInstockSubmit}
            disabled={isUpdatingInstock} // Disable button while updating
          >
            {isUpdatingInstock ? 'Updating...' : 'Update Instock Status'}
          </button>
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
