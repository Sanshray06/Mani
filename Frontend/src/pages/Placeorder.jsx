import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Title from '../components/Title';
import { asset } from '../assets/assets';
import { ShopContext } from '../context/shopContext';

const PlaceOrder = () => {
  const location = useLocation();
  const { cartData, total } = location.state || { cartData: [], total: 0 };
  const [selectedPayment, setSelectedPayment] = useState('stripe');
  const {navigate}  = useContext(ShopContext);

  if (!cartData || cartData.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-2xl mb-6">
          <Title text1="NO" text2="ORDERS" />
        </div>
        <p className="text-gray-500">Your order details could not be retrieved. Please try again.</p>
      </div>
    );
  }

  const handlePaymentSelection = (method) => {
    setSelectedPayment(method);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4">
      {/* Left Section - Delivery Information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                placeholder="First name"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                placeholder="Last name"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Email address"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Street Address</label>
            <input
              type="text"
              placeholder="Street address"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">City</label>
              <input
                type="text"
                placeholder="City"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">State</label>
              <input
                type="text"
                placeholder="State"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Zipcode</label>
              <input
                type="text"
                placeholder="Zipcode"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Country</label>
              <input
                type="text"
                placeholder="Country"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              placeholder="Phone number"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </form>
      </div>

      {/* Right Section - Order Summary and Payment */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="ORDER" text2="SUMMARY" />
        </div>
        <div className="border border-gray-300 rounded p-4 space-y-4">
          {cartData.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex justify-between">
              <p>
                {item.product.name} (Size: {item.size}) x {item.quantity}
              </p>
              <p>₹{item.product.price * item.quantity}</p>
            </div>
          ))}
          <hr />
          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>₹40</p>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <p>Total</p>
            <p>₹{total + 40}</p>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mt-6">
          <div className="text-xl sm:text-2xl mb-4">
            <Title text1="PAYMENT" text2="METHOD" />
          </div>
          <div className="grid grid-cols-3 gap-4 ">
            <button
              className={`border rounded-lg flex items-center justify-center ${
                selectedPayment === 'stripe' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-50' : 'border-gray-200'
              }`}
              onClick={() => handlePaymentSelection('stripe')}
              
            >
              <img
                src={asset.OIP}
                alt="Stripe"
                className="w-full h-full object-cover rounded-lg"
              />
            </button>
            <button
              className={`border rounded-lg flex items-center justify-center ${selectedPayment=='razorpay' 
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-50' 
                : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handlePaymentSelection('razorpay')}
            >
              <img
                src={asset.th123}
                alt="Razorpay"
                className="w-full h-full object-cover rounded-lg"
              />
            </button>
            <button
              className={`border rounded-lg flex items-center justify-center ${
                selectedPayment === 'cod' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-50' : 'border-gray-200'
              }`}
              onClick={() => handlePaymentSelection('cod')}
            >
              <img
                src={asset.download}
                alt="Cash On Delivery"
                className="w-30 h-20 object-cover rounded-lg"
              />
            </button>
          </div>
        </div>

        <button onClick={()=>{navigate('/orders')}} className="bg-black text-white py-3 px-4 rounded w-full hover:bg-gray-800 mt-6">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;