import React, { useState } from "react";

const Add = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    mainImages: [],
    additionalImages: [],
    category: "",
    type: "",
    sizes: [],
    bestSeller: false,
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (field, index, file) => {
    const newImages = [...formData[field]];
    newImages[index] = URL.createObjectURL(file);
    setFormData({ ...formData, [field]: newImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Product added successfully!");
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
                {Array(2).fill().map((_, index) => (
                  <label
                    key={`main-${index}`}
                    htmlFor={`mainImage${index}`}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40 md:h-48 lg:h-56 cursor-pointer hover:border-blue-500 transition"
                  >
                    {formData.mainImages[index] ? (
                      <img
                        src={formData.mainImages[index]}
                        alt={`Main ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <span className="text-base md:text-lg text-gray-500">Main Image {index + 1}</span>
                        <p className="text-sm md:text-base text-gray-400 mt-2">Click to upload</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id={`mainImage${index}`}
                      className="hidden"
                      onChange={(e) => handleImageUpload("mainImages", index, e.target.files[0])}
                      accept="image/*"
                      required
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
                {Array(4).fill().map((_, index) => (
                  <label
                    key={`additional-${index}`}
                    htmlFor={`additionalImage${index}`}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-32 md:h-40 cursor-pointer hover:border-blue-500 transition"
                  >
                    {formData.additionalImages[index] ? (
                      <img
                        src={formData.additionalImages[index]}
                        alt={`Additional ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center p-2">
                        <span className="text-sm md:text-base text-gray-400">Click to upload</span>
                      </div>
                    )}
                    <input
                      type="file"
                      id={`additionalImage${index}`}
                      className="hidden"
                      onChange={(e) => handleImageUpload("additionalImages", index, e.target.files[0])}
                      accept="image/*"
                    />
                  </label>
                ))}
              </div>
            </div>

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
                    Price ($)
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
                    Original Price ($)
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
                <div>
                  <label htmlFor="category" className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                    Type
                  </label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label htmlFor="sizes" className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                  Sizes (comma-separated)
                </label>
                <input
                  type="text"
                  id="sizes"
                  name="sizes"
                  className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter sizes (e.g., S, M, L)"
                  value={formData.sizes}
                  onChange={(e) => {
                    setFormData({ ...formData, sizes: e.target.value.split(",").map(size => size.trim()) });
                  }}
                />
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

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-base md:text-lg font-semibold text-gray-700 mb-2">
                  Date (Epoch)
                </label>
                <input
                  type="number"
                  id="date"
                  name="date"
                  className="w-full px-4 py-3 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter date in epoch format"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
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