import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Title from '../components/Title';
import { asset } from '../assets/assets';
import { ShopContext } from '../context/shopContext';

const PlaceOrder = () => {
  const location = useLocation();
  const { 
    cartItems, 
    navigate, 
    backendUrl, 
    token, 
    getCartAmount, 
    delivery_fee, 
    products 
  } = useContext(ShopContext);

  // First, try to get data from location state (Buy Now flow)
  const locationState = location.state || {};
  const isFromBuyNow = Boolean(locationState.cartData?.length === 1);

  // Prepare cart data either from location state or context
  const prepareInitialCartData = () => {
    if (locationState.cartData?.length > 0) {
      return locationState.cartData;
    }

    // Convert cartItems from context to cartData format
    const cartDataFromContext = [];
    for (const productId in cartItems) {
      const productSizes = cartItems[productId];
      const product = products.find(p => p._id === productId);
      
      if (product) {
        for (const size in productSizes) {
          if (productSizes[size] > 0) {
            cartDataFromContext.push({
              product,
              size,
              quantity: productSizes[size]
            });
          }
        }
      }
    }
    return cartDataFromContext;
  };

  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  // Initialize cart data and total
  useEffect(() => {
    const initialCartData = prepareInitialCartData();
    setCartData(initialCartData);

    // Calculate total
    const calculatedTotal = initialCartData.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0);
    setTotal(locationState.total || calculatedTotal);

    console.log('=== PlaceOrder Component Initialized ===');
    console.log('Location State:', locationState);
    console.log('Prepared Cart Data:', initialCartData);
    console.log('Calculated Total:', calculatedTotal);
    console.log('Is Buy Now:', isFromBuyNow);
    console.log('Cart Items from Context:', cartItems);
    console.log('Products from Context:', products);
  }, [location.state, cartItems, products]);

  if (!cartData || cartData.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-2xl mb-6">
          <Title text1="NO" text2="ORDERS" />
        </div>
        <p className="text-gray-500">Your cart is empty. Please add items to your cart.</p>
      </div>
    );
  }

  const handlePaymentSelection = (method) => {
    console.log('Payment method selected:', method);
    setSelectedPayment(method);
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log('=== Order Submission Started ===');
    console.log('Form Data:', formData);
    console.log('Cart Data:', cartData);
    console.log('Total Amount:', total + delivery_fee);

    try {
      const orderData = {
        items: cartData.map(item => ({
          ...item.product,
          size: item.size,
          quantity: item.quantity
        })),
        shippingAddress: formData,
        paymentMethod: selectedPayment,
        totalAmount: total + delivery_fee,
        isBuyNow: isFromBuyNow
      };

      console.log('Prepared Order Data:', orderData);

      const response = await fetch(`${backendUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const responseData = await response.json();

      // Handle payment method specific logic
      switch (selectedPayment) {
        case 'stripe':
          // Add your Stripe logic here
          break;
        case 'razorpay':
          // Add your Razorpay logic here
          break;
        case 'cod':
          navigate('/order-success', { 
            state: { 
              orderId: responseData.orderId,
              orderAmount: total + delivery_fee 
            }
          });
          break;
      }
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  return (
    <form
    className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4"
    autoComplete="on"
    onSubmit={onSubmitHandler}
  >
    {/* Left Section - Delivery Information */}
    <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
      <div className="text-xl sm:text-2xl my-3">
        <Title text1="DELIVERY" text2="INFORMATION" />
      </div>
  
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              type="text"
              placeholder="First name"
              className="w-full border rounded px-3 py-2"
              required
              autoComplete="given-name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              type="text"
              placeholder="Last name"
              className="w-full border rounded px-3 py-2"
              required
              autoComplete="family-name"
            />
          </div>
        </div>
  
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            type="email"
            placeholder="Email address"
            className="w-full border rounded px-3 py-2"
            required
            autoComplete="email"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium">Street Address</label>
          <input
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            type="text"
            placeholder="Street address"
            className="w-full border rounded px-3 py-2"
            required
            autoComplete="street-address"
          />
        </div>
  
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              type="text"
              placeholder="City"
              className="w-full border rounded px-3 py-2"
              required
              autoComplete="address-level2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">State</label>
            <input
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              type="text"
              placeholder="State"
              className="w-full border rounded px-3 py-2"
              required
              autoComplete="address-level1"
            />
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Zipcode</label>
            <input
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              type="text"
              placeholder="Zipcode"
              className="w-full border rounded px-3 py-2"
              required
              autoComplete="postal-code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Country</label>
            <input
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              type="text"
              placeholder="Country"
              className="w-full border rounded px-3 py-2"
              required
              autoComplete="country-name"
            />
          </div>
        </div>
  
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            type="tel"
            placeholder="Phone number"
            className="w-full border rounded px-3 py-2"
            required
            autoComplete="tel"
          />
        </div>
      </div>
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

        <button type='submit'className="bg-black text-white py-3 px-4 rounded w-full hover:bg-gray-800 mt-6">
          Place Order
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;