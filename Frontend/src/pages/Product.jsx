import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { asset } from "../assets/assets";
import { RelatedProducts } from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency , addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [reviews, setReviews] = useState([
    { user: "John Doe", comment: "Great product!", rating: 5 },
    { user: "Jane Smith", comment: "Looks amazing, worth it!", rating: 4 },
  ]);
  const [newReview, setNewReview] = useState({ user: "", comment: "", rating: 5 });
  const [cartBounce, setCartBounce] = useState(false);

  

  // Fetch product data
  const fetchProductData = () => {
    const foundProduct = products.find((item) => item.id === parseInt(productId));
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.images[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0);
  }, [productId, products]);

  // Handle adding new review
  const handleAddReview = () => {
    if (newReview.user && newReview.comment) {
      setReviews([...reviews, newReview]);
      setNewReview({ user: "", comment: "", rating: 5 });
    }
  };

  return productData ? (
    <div>
        <div className="border-t-2 pt-10 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
          <div className="flex gap-4">
                      {/* Image Section */}
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Thumbnail Section */}
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto max-h-[400px]">
                  {productData.images.map((item, index) => (
                    <img
                      key={index}
                      src={item}
                      className={`w-16 h-16 sm:w-20 sm:h-20 object-cover cursor-pointer border rounded-lg
                        ${image === item ? "border-blue-500" : "border-gray-300"}`}
                      onClick={() => setImage(item)}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Main Image */}
                <div className="overflow-hidden relative group w--[300px] h-[300px]">
                  {/* Default Image */}
                  <img
                    src={image}
                    alt="Product"
                    className="w-full h-full object-cover opacity-100 "
                  />
                </div>
              </div>

          </div>

          {/* Product Details */}
          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, index) => (
                <img src={asset.star} alt="Star" key={index} className="w-4" />
              ))}
              <p className="pl-2">(122)</p>
            </div>
            <p className="mt-5 font-medium text-3xl">
              {productData.currency}
              {productData.price}
            </p>
            <p className="mt-5">{productData.description}</p>

            {/* Size Selector */}
            <div className="mt-5">
              <h3 className="font-medium mb-2">Select Size:</h3>
              <div className="flex gap-3">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSize === size ? "bg-black text-white" : "border-gray-400"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart & Buy Now */}
            <div className="flex gap-4 mt-8">
              <button onClick={()=>addToCart(productData.id,selectedSize)} className="px-8 py-3 bg-black text-sm active:bg-gray-700 text-white rounded-lg">Add to Cart</button>
              
            </div>

            <hr className="mt-8 sm:w-4/5" />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original Product</p>
              <p>Cash on delivery is available on this product</p>
              <p>Easy return on exchange policy within 7 days</p>
            </div>
          </div>



          {/* Review Section */}
          <div className="lg:col-span-2 mt-12">
            <h2 className="text-2xl font-medium mb-4">Customer Reviews</h2>
            <div>
              {reviews.map((review, index) => (
                <div key={index} className="border-b py-4">
                  <p className="font-medium">{review.user}</p>
                  <p>Rating: {review.rating} / 5</p>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
            {/* Add Review */}
            <div className="mt-6">
              <h3 className="text-xl mb-2">Add Your Review</h3>
              <input
                type="text"
                placeholder="Your Name"
                className="border p-2 w-full mb-2"
                value={newReview.user}
                onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
              />
              <textarea
                placeholder="Your Review"
                className="border p-2 w-full mb-2"
                rows="4"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              />
              <button
                onClick={handleAddReview}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
        <div >
          <RelatedProducts  category={productData.category} type={productData.type} />
        </div>
    </div>

      
      
    
  ) : (
    <div className="text-center text-gray-500 mt-20">Product Not Found</div>
  );
};

export default Product;
