import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, originalPrice, image1, image2, name, price, soldOut }) => {
  const discountPercentage = Math.round((1 - price / originalPrice) * 100);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="relative group w-full h-[200px] overflow-hidden">
        {/* Default Image */}
        <img
          src={image1}
          alt="Product"
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-100 group-hover:opacity-0"
        />
        {/* Hover Image */}
        <img
          src={image2}
          alt="Product Hover"
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-0 group-hover:opacity-100"
        />
        {/* SOLD OUT Overlay */}
        {soldOut && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">SOLD OUT</span>
          </div>
        )}
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <div className="flex items-center space-x-2 text-sm font-medium">
        <span className="line-through text-gray-500">₹{originalPrice}</span>
        <span className="text-red-600">₹{price}</span>
        <span className="text-green-600 font-semibold">{discountPercentage}% OFF</span>
      </div>
    </Link>
  );
};

export default ProductItem;
