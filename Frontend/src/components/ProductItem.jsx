import React from 'react'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image1, image2, name, price }) => {
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className="overflow-hidden relative group w-full h-[200px]">
        {/* Default Image */}
        <img
          src={image1}
          alt=""
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-100 group-hover:opacity-0"
        />
        {/* Hover Image */}
        <img
          src={image2}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-0 group-hover:opacity-100"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="font-medium text-sm">₹{price}</p>
    </Link>
  )
}

export default ProductItem
