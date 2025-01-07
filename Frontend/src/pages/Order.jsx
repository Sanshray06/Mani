import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/shopContext';
import Title from '../components/Title';
import { toast } from 'react-toastify';

const Order = () => {
    const { currency } = useContext(ShopContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [images, setImages] = useState({}); // To store images for each item

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                let userId;

                if (token) {
                    try {
                        const tokenParts = token.split('.');
                        const payloadBase64 = tokenParts[1];
                        const decodedPayload = atob(payloadBase64);
                        const payload = JSON.parse(decodedPayload);
                        userId = payload.id;
                    } catch (error) {
                        console.error('Error decoding token:', error);
                        toast.error('Authentication error');
                        setError('Authentication error');
                        return;
                    }
                }

                if (!token || !userId) {
                    toast.error('Please login to view orders');
                    setError('Please login to view orders');
                    return;
                }

                const response = await fetch(`http://localhost:4000/api/order/allOrders/${userId}`, {
                    headers: { 'token': token }
                });

                if (!response.ok) throw new Error("Failed to fetch orders");
                const data = await response.json();
                setOrders(data);

                // Fetch images for each order item
                data.forEach(async (order) => {
                    for (const item of order.items) {
                        try {
                            const itemResponse = await axios.get(`http://localhost:4000/api/order/item/${item.id1}`);
                            setImages(prevState => ({
                                ...prevState,
                                [item._id]: itemResponse.data.imageUrl // Assuming the API returns the image URL
                            }));
                        } catch (error) {
                            console.error(`Error fetching image for item ${item._id}:`, error);
                        }
                    }
                });

            } catch (error) {
                console.error('Error fetching orders:', error);
                toast.error('Error fetching orders');
                setError('Error fetching orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const ITEMS_TO_SHOW = 4;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MY ORDERS
          </h1>
        </div>

        <div className="mt-12 space-y-6">
          {error ? (
            <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">{error}</div>
          ) : orders?.length > 0 ? (
            orders.slice(-4).reverse().map((order, index) => {
              const displayedItems = order.items.slice(0, ITEMS_TO_SHOW);
              const remainingItems = order.items.length - ITEMS_TO_SHOW;

              return (
                <div key={index} className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                          {displayedItems.map((item) => (
                            <div key={item._id} className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                              <div className="relative w-24 h-24 flex-shrink-0">
                                <img
                                  src={images[item._id] || 'default-image.jpg'}
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-lg shadow-sm"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                                <dl className="mt-2 text-sm text-gray-600 space-y-1">
                                  <div className="flex justify-between">
                                    <dt>Price:</dt>
                                    <dd className="font-medium">{currency}{item.price}</dd>
                                  </div>
                                  <div className="flex justify-between">
                                    <dt>Quantity:</dt>
                                    <dd className="font-medium">{item.quantity}</dd>
                                  </div>
                                  <div className="flex justify-between">
                                    <dt>Size:</dt>
                                    <dd className="font-medium">{item.size}</dd>
                                  </div>
                                </dl>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex flex-col justify-between lg:w-64 space-y-4 lg:space-y-0">
                          <div className="space-y-2">
                            <p className="text-sm text-gray-500">
                              Order Date: {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-sm flex items-center gap-2">
                              Status: 
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Delivered
                              </span>
                            </p>
                            {remainingItems > 0 && (
                              <p className="text-sm text-blue-600">
                                +{remainingItems} more {remainingItems === 1 ? 'item' : 'items'}
                              </p>
                            )}
                          </div>
                          <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No orders found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

};

export default Order;
