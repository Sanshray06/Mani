import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext'
import Title from './Title';
import ProductItem from './ProductItem';
const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    const [latestProducts , setLatestProducts] = useState([]);

    useEffect(()=>{
      setLatestProducts(products);
    },[products])
  return (
    <div>
      <div className="text-center py-8 text-xl md:text-3xl">
        <Title text1= {'LATEST'} text2 = {'COLLECTIONS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda ex ea itaque totam obcaecati quam dolore id consequuntur. Ratione deleniti delectus facere, architecto nulla consequuntur repudiandae cum? Esse, molestiae sequi?
        </p>
      </div>
      {/* latest products */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          latestProducts.map((item,index)=>(
            <ProductItem 
              key={item._id} 
              id={String(item._id)} 
              image1={item.Mainimage?.[0] || ''} 
              image2={item.Mainimage?.[1] || ''} 
              name={item.name} 
              price={item.price} 
              originalPrice={item.originalPrice} 
            />
          ))
        }
      </div>
    



    </div>
  )
}

export default LatestCollection