import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";


const Earring = () => {
  const { products } = useContext(ShopContext);
  const [necklaceProducts, setNecklaceProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const necklaceItems = products.filter((item) => item.type === "Earings");
      setNecklaceProducts(necklaceItems);
    }
  }, [products]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="my-10">
      {/* Title Section */}
      <div className="text-center text-3xl py-8">
        <Title text1={"EARRING"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Explore our exquisite collection of necklaces, crafted to perfection for every occasion.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {necklaceProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image1={item.Mainimage[0]}
            image2={item.Mainimage[1]}
            price={item.price}
            originalPrice={item.originalPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default Earring;
