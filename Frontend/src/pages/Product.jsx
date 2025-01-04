import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { asset } from "../assets/assets";
import { RelatedProducts } from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart, navigate, buy, token} = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Review states
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    comment: "",
    rating: 5,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch product data
  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.images[0]);
    }
  };

  // Fetch comments
  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/comment/comment/${productId}`);
      if (!response.ok) throw new Error("Failed to fetch comments");
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      setError("Failed to load reviews");
      console.error(err);
    }
  };

  // Check login status
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  useEffect(() => {
    fetchProductData();
    if (productId) fetchComments();
    window.scrollTo(0, 0);
  }, [productId, products]);

  const handleAddReview = async () => {
    if (!isLoggedIn) {
      setError("Please login to add a review");
      navigate("/login");
      return;
    }
  
    if (!newReview.comment.trim()) {
      setError("Please enter a review comment");
      return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = JSON.parse(atob(base64));
    const userId = decodedToken.id;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/comment/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Ensure token is valid
        },
        body: JSON.stringify({
          productId,
          userId, // Include userId in the payload
          comment: newReview.comment,
          rating: newReview.rating,
        }),
      });
  
      if (!response.ok) throw new Error("Failed to add review");
  
      await response.json();
      fetchComments(); // Refresh the comments list after successful submission
      setNewReview({ comment: "", rating: 5 });
      setError("");
    } catch (err) {
      setError("Failed to add review");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    const res = await buy(productData.id, selectedSize);
    if (res) {
      navigate("/placeorder", {
        state: {
          cartData: [
            {
              product: productData,
              size: selectedSize,
              quantity: 1,
            },
          ],
          isBuyNow: true,
          total: productData.price,
        },
      });
    }
  };

  return productData ? (
    <div className="pb-20">
      {/* Main container with improved mobile padding */}
      <div className="border-t-2 pt-4 md:pt-10 container mx-auto px-3 md:px-4 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
        {/* Image Section */}
        <div className="w-full">
          <div className="flex flex-col gap-4">
            {/* Main Image - Larger on mobile */}
            <div className="w-full">
              <div className="aspect-square w-full relative">
                <img
                  src={image}
                  alt="Product"
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                />
              </div>
            </div>

            {/* Thumbnails - Horizontal scroll on mobile */}
            <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory">
              {productData.images.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 object-cover cursor-pointer rounded-lg border-2 snap-center
                    ${image === item ? "border-blue-500" : "border-gray-300"}`}
                  onClick={() => setImage(item)}
                  alt={`Thumbnail ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Details - Better spacing on mobile */}
        <div className="px-1 md:px-0">
          <h1 className="text-xl md:text-2xl font-medium">{productData.name}</h1>
          
          {/* Rating stars - Smaller on mobile */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, index) => (
              <img src={asset.star} alt="Star" key={index} className="w-3 md:w-4" />
            ))}
            <p className="text-sm md:text-base pl-2">(122)</p>
          </div>

          {/* Price section - Adjusted for mobile */}
          <div className="flex items-baseline gap-2 md:gap-3 p-2">
            <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              ₹{productData.price}
            </span>
            <span className="text-base md:text-lg text-gray-400 line-through">
              ₹{productData.originalPrice}
            </span>
          </div>

          {/* Discount badge - More compact on mobile */}
          <div className="animate-pulse mt-1">
            <span className="bg-green-100 text-green-800 text-sm md:text-lg font-semibold px-3 py-1 rounded-full">
              {Math.round((1 - productData.price / productData.originalPrice) * 100)}% OFF
            </span>
          </div>

          {/* Description - Better readability on mobile */}
          <p className="mt-4 text-sm md:text-base leading-relaxed">{productData.description}</p>

          {/* Size Selector - More compact on mobile */}
          <div className="mt-4 md:mt-5">
            <h3 className="font-medium text-sm md:text-base mb-2">Select Size:</h3>
            <div className="flex gap-2 md:gap-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`px-3 md:px-4 py-1.5 md:py-2 text-sm border rounded-lg ${
                    selectedSize === size ? "bg-black text-white" : "border-gray-400"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons - Full width on mobile */}
          <div className="flex gap-3 mt-6 md:mt-8">
            <button
              onClick={() => addToCart(productData._id, selectedSize)}
              className="flex-1 px-4 md:px-8 py-2.5 md:py-3 bg-black text-sm active:bg-gray-700 text-white rounded-lg"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 px-4 md:px-8 py-2.5 md:py-3 bg-blue-500 text-sm active:bg-blue-700 text-white rounded-lg"
            >
              Buy Now
            </button>
          </div>

          {/* Product info - Better spacing on mobile */}
          <hr className="mt-6 md:mt-8 w-full sm:w-4/5" />
          <div className="text-xs md:text-sm text-gray-500 mt-4 md:mt-5 flex flex-col gap-1.5">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return on exchange policy within 7 days</p>
          </div>
        </div>

        {/* Reviews Section - Better mobile layout */}
        <div className="lg:col-span-2 mt-8 md:mt-12 px-1 md:px-0">
          <h2 className="text-xl md:text-2xl font-medium mb-4">Customer Reviews</h2>

          {error && <div className="text-red-500 mb-4 text-sm md:text-base">{error}</div>}

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border-b pb-4">
                <p className="font-medium text-sm md:text-base">{review.userId?.name || "Anonymous"}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-lg">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={index < review.rating ? "text-yellow-400" : "text-gray-300"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-gray-500">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Unknown Date"}
                  </p>
                </div>
                <p className="mt-2 text-sm md:text-base">{review.comment}</p>
              </div>
            ))}

            {reviews.length === 0 && (
              <p className="text-sm text-gray-500">No reviews yet. Be the first to leave a review!</p>
            )}
          </div>

          {/* Add Review Section - Mobile optimized */}
          <div className="mt-6 md:mt-8">
            <h3 className="text-base md:text-lg font-medium mb-2">Leave a Review</h3>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Write your review here"
              className="w-full border rounded-lg p-3 md:p-4 text-sm md:text-base resize-none"
              rows={4}
            />
            <div className="flex items-center gap-2 md:gap-3 mt-3 md:mt-4">
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                className="border rounded-lg px-3 md:px-4 py-2 text-sm md:text-base"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating > 1 && "s"}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddReview}
                className="px-4 md:px-6 py-2 bg-blue-500 text-white rounded-lg text-sm md:text-base"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProducts category={productData.category} type={productData.type} />
    </div>
  ) : (
    <div className="text-center py-20">Loading...</div>
  );
};

export default Product;
