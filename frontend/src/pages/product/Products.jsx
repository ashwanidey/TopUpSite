import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import image from "../../assets/WhatsApp Image 2024-04-25 at 10.48.28.jpeg";
import { useGetItems } from '../../hooks/useGetItems';
import { useParams } from 'react-router-dom';

const Products = () => {
  const { isLoading, getItems, items } = useGetItems();
  const { productId } = useParams();
 

  useEffect(() => {
    async function fetchItems() {
      await getItems(productId);
    }
    fetchItems();
  }, []); // added getItems and productId as dependencies

  return (
    <div className='w-full'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5 w-full'>
          {items.map((item, index) => (
            <ProductCard data={item}/> // passing 'item' as prop
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
