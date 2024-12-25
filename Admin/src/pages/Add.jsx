import React, { useState } from "react";
import { ChevronDown } from 'lucide-react';
import { backendUrl } from "../App";
import axios from "axios";

const Add = ({token}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    type: "",
    sizes: [], // Initialize as empty array
    bestSeller: false,
  });
  
  const [imageFiles, setImageFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [imagePreview, setImagePreview] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const categories = ['Women', 'Men', 'Children'];
  const types = ['Necklace', 'Earings', 'Bangles', 'Rings', 'Anklets'];
  const sizes = ['S', 'M', 'L', 'XL','None'];

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "sizes") {
      // Handle size selection
      const newSizes = formData.sizes.includes(value)
        ? formData.sizes.filter(size => size !== value)
        : [...formData.sizes, value];
      
      setFormData(prev => ({
        ...prev,
        sizes: newSizes
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageUpload = (fieldName, file) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload only image files');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setImageFiles(prev => ({
        ...prev,
        [fieldName]: file
      }));

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(prev => ({
        ...prev,
        [fieldName]: previewUrl
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!imageFiles.image1 || !imageFiles.image2) {
      setError("First two images are required");
      setLoading(false);
      return;
    }

    const submitFormData = new FormData();
  
    // Append all form fields except sizes
    Object.keys(formData).forEach(key => {
      if (key === 'sizes') {
        // Convert sizes array to string
        submitFormData.append('sizes', JSON.stringify(formData.sizes));
      } else {
        submitFormData.append(key, formData[key]);
      }
    });
  
    // Append image files
    Object.keys(imageFiles).forEach(key => {
      if (imageFiles[key]) {
        submitFormData.append(key, imageFiles[key]);
      }
    });
  
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        submitFormData,
        {
          headers: {
            token,
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      if (response.data) {
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
        });
        setImageFiles({
          image1: null,
          image2: null,
          image3: null,
          image4: null,
        });
        setImagePreview({
          image1: null,
          image2: null,
          image3: null,
          image4: null,
        });
      }
    } catch (error) {
      //console.error('Error details:', error);
      setError(error.response?.data?.message || "Failed to add product");
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
            {/* Main Images Section */}
            <div>
              <p className="text-base md:text-lg font-semibold text-gray-700 mb-3">
                Main Images (Required)
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {['image1', 'image2'].map((fieldName) => (
                  <label
                    key={fieldName}
                    htmlFor={fieldName}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40 md:h-48 lg:h-56 cursor-pointer hover:border-blue-500 transition"
                  >
                    {imagePreview[fieldName] ? (
                      <img
                        src={imagePreview[fieldName]}
                        alt={fieldName}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <span className="text-base md:text-lg text-gray-500">
                          {fieldName === 'image1' ? 'Main Image 1' : 'Main Image 2'}
                        </span>
                        <p className="text-sm md:text-base text-gray-400 mt-2">Click to upload</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id={fieldName}
                      className="hidden"
                      onChange={(e) => handleImageUpload(fieldName, e.target.files[0])}
                      accept="image/*"
                      required={fieldName === 'image1' || fieldName === 'image2'}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Images Section */}
            <div>
              <p className="text-base md:text-lg font-semibold text-gray-700 mb-3">
                Additional Images (Optional)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {['image3', 'image4'].map((fieldName) => (
                  <label
                    key={fieldName}
                    htmlFor={fieldName}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-32 md:h-40 cursor-pointer hover:border-blue-500 transition"
                  >
                    {imagePreview[fieldName] ? (
                      <img
                        src={imagePreview[fieldName]}
                        alt={fieldName}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center p-2">
                        <span className="text-sm md:text-base text-gray-400">Click to upload</span>
                      </div>
                    )}
                    <input
                      type="file"
                      id={fieldName}
                      className="hidden"
                      onChange={(e) => handleImageUpload(fieldName, e.target.files[0])}
                      accept="image/*"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Rest of the form fields remain the same */}
            {/* Form Fields */}
            <div className="space-y-6 md:space-y-8">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                  rows="4"
                  className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              {/* Price Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleInputChange}
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
                    className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter original price"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Category and Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleSelectChange}
                      className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none bg-white"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                    Type
                  </label>
                  <div className="relative">
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleSelectChange}
                      className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none bg-white"
                      required
                    >
                      <option value="">Select Type</option>
                      {types.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div className="mt-6">
                <label className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                  Sizes
                </label>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
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
                        name="sizes"
                        value={size}
                        checked={formData.sizes.includes(size)}
                        onChange={(e) => handleSelectChange({
                          target: { name: 'sizes', value: size }
                        })}
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
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                  checked={formData.bestSeller}
                  onChange={(e) => setFormData({ ...formData, bestSeller: e.target.checked })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold text-lg md:text-xl py-3 md:py-4 rounded-lg hover:bg-blue-700 transition duration-300 mt-8"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;