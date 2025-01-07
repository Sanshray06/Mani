import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/shopContext';

const Order = () => {
    const { currency, token, backednUrl } = useContext(ShopContext);
    const [orderData, setorderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadOrderData = async () => {
        try {
            if (!token) {
                setLoading(false);
                return null;
            }
            const response = await axios.post(
                `${backednUrl}/api/order/userorders`,
                {},
                { headers: { token } }
            );
            console.log('Single item example:', response.data.orders[0]?.items[0]);
            if (response.data.success) {
                let allOrdersItem = [];
                response.data.orders.forEach((order) => {
                    order.items.forEach((item) => {
                        allOrdersItem.push({
                            ...item,
                            status: order.status,
                            payment: order.payment,
                            paymentMethod: order.paymentMethod,
                            date: order.date
                        });
                    });
                });
                setorderData(allOrdersItem.reverse());
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError('Failed to load orders');
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrderData();
    }, [token]);

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        MY ORDERS
                    </h1>
                </div>

                <div className="mt-12 space-y-6">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="text-gray-500 text-lg">Loading orders...</div>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">{error}</div>
                    ) : orderData.length > 0 ? (
                        orderData.map((item, index) => (
                            <div key={index} className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                                    <div className="p-6">
                                        <div className="flex flex-col lg:flex-row gap-6">
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-1 gap-6">
                                                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                    <div className="relative w-24 h-24 flex-shrink-0">
                                                        <img
                                                            src={item?.Mainimage?.[0] || '/default-image.jpg'}
                                                            alt={item?.name || 'Product'}
                                                            className="w-full h-full object-cover rounded-lg shadow-sm"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg font-semibold text-gray-900 truncate">{item?.name}</h3>
                                                        <dl className="mt-2 text-sm text-gray-600 space-y-1">
                                                            <div className="flex justify-between">
                                                                <dt>Price:</dt>
                                                                <dd className="font-medium">{currency}{item?.price}</dd>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <dt>Quantity:</dt>
                                                                <dd className="font-medium">{item?.quantity}</dd>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <dt>Size:</dt>
                                                                <dd className="font-medium">{item?.size}</dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col justify-between lg:w-64 space-y-4 lg:space-y-0">
                                                <div className="space-y-2">
                                                    <p className="text-sm text-gray-500">
                                                        Order Date: {item?.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                                                    </p>
                                                    <p className="text-sm flex items-center gap-2">
                                                        Status: 
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            {item?.status || 'Processing'}
                                                        </span>
                                                    </p>
                                                </div>
                                                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
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