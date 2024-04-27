import React, { useContext, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import image from "../../assets/WhatsApp Image 2024-04-25 at 10.48.28.jpeg";
import { useGetItems } from '../../hooks/useGetItems';
import { useParams } from 'react-router-dom';
import { VariableContext } from '../../context/VariableContext';
import Skeleton from '../../components/Skeleton';

const Products = () => {
  const { isLoading, getItems, items } = useGetItems();
  const { productId } = useParams();
 

  const {selected,setSelected} = useContext(VariableContext)
  
  

  const handleSelected = (data)=>{
    setSelected(data);
  
  }
 

  useEffect(() => {
    async function fetchItems() {
      await getItems(productId);
    }
    fetchItems();
  }, []); // added getItems and productId as dependencies

  return (
    <div className='w-full'>
      {!isLoading ? (
        <div className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5 w-full'>
        <Skeleton height = "7rem"/>
        <Skeleton height = "7rem"/>
        <Skeleton height = "7rem"/>
        </div>
      ) : (
        <ul className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5 w-full'>
          {items.map((item, index) => (
            <ProductCard data={item} handleSelected={(data)=>handleSelected(data)}/> // passing 'item' as prop
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
