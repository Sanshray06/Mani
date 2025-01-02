import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/shopContext';
import Title from '../components/Title';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, removeFromCart, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [inputValues, setInputValues] = useState({});
  useEffect(() => {
    if (Object.keys(cartItems).length === 0) {
      setCartData([]);
    }
  }, [cartItems]);
  

  useEffect(() => {
    if (products.length > 0 && Object.keys(cartItems).length > 0) {
      const tempData = [];
      const tempInputValues = {};
      for (const itemId in cartItems) {
        const product = products.find((p) => p._id.toString() === itemId);
        if (product) {
          for (const size in cartItems[itemId]) {
            const quantity = cartItems[itemId][size];
            if (quantity > 0) {
              tempData.push({ id: itemId, size, quantity, product });
              tempInputValues[`${itemId}-${size}`] = quantity;
            }
          }
        }
      }
      setCartData(tempData);
      setInputValues(tempInputValues);
    }
  }, [cartItems, products]);
  
  const handleInputChange = (itemId, size, value) => {
    const numericValue = value ? parseInt(value) : 0;
    setInputValues((prev) => ({
      ...prev,
      [`${itemId}-${size}`]: numericValue,
    }));
  };

  const handleBlur = (itemId, size) => {
    const quantity = parseInt(inputValues[`${itemId}-${size}`], 10);
    if (!Number.isNaN(quantity) && quantity > 0) {
      updateQuantity(itemId, size, quantity);
    } else {
      removeFromCart(itemId, size);
    }
  };

  const handleRemoveItem = (itemId, size) => {
    removeFromCart(itemId, size);
  };

  const calculateTotal = () => {
    return cartData.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  if (cartData.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-2xl mb-6">
          <Title text1="YOUR" text2="CART" />
        </div>
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your cart is currently empty</p>
          <p className="text-gray-400 text-sm">Add items to your cart to see them here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] px-4 py-8">
      <div className="text-2xl mb-6">
        <Title text1="YOUR" text2="CART" />
      </div>
      <div className="space-y-6">
        {cartData.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="py-4 border-b text-gray-700 grid gap-4 sm:grid-cols-[3fr_1fr_1fr_1fr] grid-cols-[1fr] items-center"
          >
            <div className="flex items-start gap-4">
              <img
                src={item.product.Mainimage[0]}
                alt={item.product.name}
                className="w-16 sm:w-20 object-cover rounded"
              />
              <div>
                <p className="font-medium text-base sm:text-lg">{item.product.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm sm:text-base">{currency}{item.product.price.toFixed(2)}</p>
                  <span className="px-2 py-1 text-xs sm:text-sm bg-gray-100 rounded">{item.size}</span>
                </div>
              </div>
            </div>
            <input
              type="number"
              min="0"
              value={inputValues[`${item.id}-${item.size}`] || ''}
              onChange={(e) => handleInputChange(item.id, item.size, e.target.value)}
              onBlur={() => handleBlur(item.id, item.size)}
              className="border rounded px-2 py-1 w-full sm:w-20 text-sm sm:text-base"
            />
            <p className="text-right font-medium text-sm sm:text-base">
              {currency}{(item.product.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => handleRemoveItem(item.id, item.size)}
              className="text-red-500 hover:text-red-700 text-sm sm:text-base"
            >
              &#x2716;
            </button>
          </div>
        ))}
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <div className="text-2xl mb-4">
              <Title text1="CART" text2="TOTALS" />
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency}{calculateTotal().toFixed(2)}</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>{currency}40.00</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <b>Total</b>
                <b>
                  {currency}
                  {(calculateTotal() + (calculateTotal() > 0 ? 40 : 0)).toFixed(2)}
                </b>
              </div>
              <div className="text-right mt-6">
                <button
                  onClick={() => navigate('/placeorder', { state: { cartData, total: calculateTotal() } })}
                  className="bg-black text-white px-6 py-3 text-sm"
                >
                  PROCEED TO PAY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
