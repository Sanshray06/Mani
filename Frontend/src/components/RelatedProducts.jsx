import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/shopContext';
import Title from './Title';
import ProductItem from './ProductItem';

export const RelatedProducts = ({ category, type }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => type === item.type);
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category,type]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl font-bold mb-6">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item.id}
            image1={item.mainImage[0]}
            image2={item.mainImage[1]}
            name={item.name}
            price={item.price}
            originalPrice={item.originalPrice}
          />
        ))}
      </div>
    </div>
  );
};