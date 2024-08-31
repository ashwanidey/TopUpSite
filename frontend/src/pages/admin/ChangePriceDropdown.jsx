import React, { useContext, useEffect, useState } from 'react';
import { useGetProducts } from '../../hooks/useGetProducts';
import { useAuth0 } from '@auth0/auth0-react';
import ChangePriceList from './ChangePriceList';
import { VariableContext } from '../../context/VariableContext';

const ChangePrice = () => {
  const [selectedOption, setSelectedOption] = useState('662bc6b94d4d7c73c57ba046');

  const { getAllProducts, products, isLoading } = useGetProducts();
  const { token } = useContext(VariableContext);

  useEffect(() => {
    async function fetch() {
      await getAllProducts(token);
    }
    fetch();
  }, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      {!isLoading && (
        <div className="mt-24 lg:mx-24 mx-4 flex flex-col gap-6">
          <select
            onChange={handleChange}
            className="p-3 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {products.map((product) => (
              <option value={product._id} key={product._id}>
                {product.name}
              </option>
            ))}
          </select>
          <div className="p-4 bg-gray-900 rounded-lg shadow-lg">
            <ChangePriceList productId={selectedOption} />
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePrice;
