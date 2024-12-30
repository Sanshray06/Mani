import React, { useState } from "react";
import { ChevronDown } from 'lucide-react';

const Add = ({ token }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    type: "",
    sizes: [],
    bestSeller: false,
    totalPeices: ""
  });

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null
  });

  const [previews, setPreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = ['Women', 'Men', 'Children'];
  const types = ['Necklace', 'Earrings', 'Bangles', 'Rings', 'Anklets'];
  const availableSizes = ['S', 'M', 'L', 'XL', 'None'];

  const handleSizeChange = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) 
        ? prev.sizes.filter(s => s !== size) 
        : [...prev.sizes, size]
    }));
  };

  const handleImageUpload = (name, file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload only image files');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setImages(prev => ({
      ...prev,
      [name]: file
    }));
    setPreviews(prev => ({
      ...prev,
      [name]: URL.createObjectURL(file)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!images.image1 || !images.image2) {
      setError("First two images are required");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'sizes') {
        formDataToSend.append('sizes', JSON.stringify(formData.sizes));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    Object.entries(images).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });

    try {
      const response = await fetch(`${backendUrl}/api/product/add`, {
        method: 'POST',
        headers: {
          token
        },
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      alert("Product added successfully!");
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        category: "",
        type: "",
        sizes: [],
        bestSeller: false,
        totalPeices: ""
      });
      setImages({
        image1: null,
        image2: null,
        image3: null,
        image4: null
      });
      setPreviews({
        image1: null,
        image2: null,
        image3: null,
        image4: null
      });
    } catch (err) {
      setError(err.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="bg-white shadow-lg rounded-xl p-4 md:p-6 lg:p-8 w-full max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8 text-center">
            Add New Product
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* Main Images */}
            <div>
              <p className="text-base md:text-lg font-semibold text-gray-700 mb-3">
                Main Images (Required)
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {["image1", "image2"].map((id) => (
                  <label
                    key={id}
                    htmlFor={id}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40 md:h-48 lg:h-56 cursor-pointer hover:border-blue-500 transition"
                  >
                    {previews[id] ? (
                      <img
                        src={previews[id]}
                        alt={id}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <span className="text-base md:text-lg text-gray-500">
                          Main Image {id.slice(-1)}
                        </span>
                        <p className="text-sm md:text-base text-gray-400 mt-2">
                          Click to upload
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      id={id}
                      className="hidden"
                      onChange={(e) => handleImageUpload(id, e.target.files[0])}
                      accept="image/*"
                      required
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Images */}
            <div>
              <p className="text-base md:text-lg font-semibold text-gray-700 mb-3">
                Additional Images (Optional)
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {["image3", "image4"].map((id) => (
                  <label
                    key={id}
                    htmlFor={id}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-32 md:h-40 cursor-pointer hover:border-blue-500 transition"
                  >
                    {previews[id] ? (
                      <img
                        src={previews[id]}
                        alt={id}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center p-2">
                        <span className="text-sm md:text-base text-gray-400">
                          Click to upload
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      id={id}
                      className="hidden"
                      onChange={(e) => handleImageUpload(id, e.target.files[0])}
                      accept="image/*"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows="4"
                  className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Prices and Total Pieces */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="price" className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="originalPrice" className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    id="originalPrice"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                    className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="totalPeices" className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                    Total Pieces
                  </label>
                  <input
                    type="number"
                    id="totalPeices"
                    name="totalPeices"
                    value={formData.totalPeices}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalPeices: e.target.value }))}
                    className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Category and Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                  </div>
                </div>

                <div>
                  <label className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                    Type
                  </label>
                  <div className="relative">
                    <select
                      name="type"
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                      required
                    >
                      <option value="">Select Type</option>
                      {types.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                  Sizes
                </label>
                <div className="flex flex-wrap gap-3">
                  {availableSizes.map((size) => (
                    <label
                      key={size}
                      className={`cursor-pointer px-4 py-2 rounded-lg border-2 ${
                        formData.sizes.includes(size)
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={size}
                        checked={formData.sizes.includes(size)}
                        onChange={() => handleSizeChange(size)}
                        className="hidden"
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>

              {/* Best Seller */}
              <div className="flex items-center space-x-3">
                <label htmlFor="bestSeller" className="text-base md:text-lg font-semibold text-gray-700">
                  Best Seller
                </label>
                <input
                  type="checkbox"
                  id="bestSeller"
                  name="bestSeller"
                  checked={formData.bestSeller}
                  onChange={(e) => setFormData(prev => ({ ...prev, bestSeller: e.target.checked }))}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500" />
             </div>
            
             {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <p>{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-semibold text-lg md:text-xl py-3 md:py-4 rounded-lg transition duration-300`}
              >
                {loading ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;