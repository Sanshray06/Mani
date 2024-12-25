import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { ShopContext } from '../context/shopContext';
import { asset } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products,search,showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOrder, setSortOrder] = useState("relevant");

  useEffect(() => {
    handleFilterAndSort();
  }, [products, search, showSearch, selectedCategories, selectedTypes, sortOrder]);
  

  const handleFilterAndSort = () => {
    let filtered = [...products];
  
    if (showSearch && search) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.some(category =>
          product.category?.toLowerCase() === category.toLowerCase()
        )
      );
    }
  
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(product =>
        selectedTypes.some(type =>
          product.type?.toLowerCase() === type.toLowerCase()
        )
      );
    }
  
    if (sortOrder === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }
  
    setFilterProducts(filtered);
  };
  

  const handleCheckboxChange = (value, setState, state) => {
    setState(
      state.includes(value) ? state.filter(item => item !== value) : [...state, value]
    );
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row gap-10 border-t pt-10">
        <div className="w-full sm:w-1/4">
          <p 
            className="my-2 text-xl flex items-center cursor-pointer gap-2" 
            onClick={() => setShowFilter(!showFilter)}
          >
            FILTERS
            <img 
              className={`h-3 transform ${showFilter ? 'rotate-180' : ''}`} 
              src={asset.down} 
              alt="Toggle Filters" 
            />
          </p>

          {showFilter && (
            <div>
              <div className="border border-gray-300 pl-5 py-3 mt-6">
                <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                  {["Men", "Women", "Kids"].map((category) => (
                    <label key={category} className="flex gap-2">
                      <input 
                        type="checkbox" 
                        className="w-3" 
                        value={category} 
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCheckboxChange(category, setSelectedCategories, selectedCategories)}
                      />{category}
                    </label>
                  ))}
                </div>
              </div>

              <div className="border border-gray-300 pl-5 py-3 mt-6">
                <p className="mb-3 text-sm font-medium">TYPE</p>
                <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                  {["Rings", "Bracelets", "Anklets", "Necklace"].map((type) => (
                    <label key={type} className="flex gap-2">
                      <input 
                        type="checkbox" 
                        className="w-3" 
                        value={type} 
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleCheckboxChange(type, setSelectedTypes, selectedTypes)}
                      />{type}
                    </label>
                  ))}
                </div>
              </div>

              <button 
                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded" 
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedTypes([]);
                  setSortOrder("relevant");
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <Title text1="ALL" text2="COLLECTIONS" />
            <select 
              className="border-2 border-gray-300 text-sm px-2" 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((item, index) => (
              <ProductItem 
                key={index} 
                id={item._id} 
                image1={item.Mainimage[0]} 
                image2={item.Mainimage[1]} 
                name={item.name} 
                price={item.price} 
                originalPrice={item.originalPrice} 
              />
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Collection;
