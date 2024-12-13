import React, { useContext } from 'react'
import { ShopContext } from '../context/shopContext'
import Title from './Title';
const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    console.log(products);
  return (
    <div>
      <div className="text-center py-8 text-3xl">
        <Title text1= {'LATEST'} text2 = {'COLLECTIONS'} />
      </div>
    </div>
  )
}

export default LatestCollection