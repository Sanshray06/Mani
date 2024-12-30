import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { asset } from "../assets/assets";
import { backendUrl } from "../App";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backendUrl + '/api/product/list', {
        headers: {
          token,
          'Content-Type': 'application/json',
        }
      });
      
      if (response.data.message === 'Products retrieved successfully!') {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeProduct = async (id) => {
    try {
      setList((prevList) => prevList.filter((item) => item._id !== id));
  
      const response = await axios.post(
        `${backendUrl}/api/product/remove`, 
        { id },
        { headers: { token } }
      );
  
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
        fetchList(); // Revert if error
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Failed to delete product. Please try again.");
      fetchList();
    }
  };
  
  const handleQuantityInc = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/inc`, 
        { id },
        { headers: { token } }
      );
      console.log(response.data);
      fetchList(); // Refresh list after increment
    } catch (error) {
      console.error(`Error updating quantity:`, error);
      toast.error("Failed to update quantity. Please try again.");
      fetchList(); // Revert on error
    }
  };

  const handleQuantityDec = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/reduce`, 
        { id },
        { headers: { token } }
      );
      console.log(response.data);
      fetchList(); // Refresh list after decrement
    } catch (error) {
      console.error(`Error updating quantity:`, error);
      toast.error("Failed to update quantity. Please try again.");
      fetchList(); // Revert on error
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Products List</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] gap-4 p-4 bg-gray-50 rounded-t-lg border-b">
            <div className="font-semibold text-gray-600">Image</div>
            <div className="font-semibold text-gray-600">Name</div>
            <div className="font-semibold text-gray-600">Quantity</div>
            <div className="font-semibold text-gray-600">Category</div>
            <div className="font-semibold text-gray-600">Price</div>
            <div className="font-semibold text-gray-600 text-center">Actions</div>
          </div>

          <div className="divide-y">
            {Array.isArray(list) && list.length > 0 ? (
              list.map((item, index) => (
                <div 
                  key={item._id || index}
                  className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
                >
                  <div>
                    {item?.Mainimage?.[0] ? (
                      <img 
                        src={item.Mainimage[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm" 
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150';
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="font-medium text-gray-800">{item?.name || 'No name'}</div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityDec(item._id)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                      disabled={!item?.totalPeices || item.totalPeices <= 0}
                    >
                      <img className="w-6 h-6" src={asset.remove} alt="Decrease" />
                    </button>
                    <span className="font-medium w-8 text-center">{item?.totalPeices || 0}</span>
                    <button
                      onClick={() => handleQuantityInc(item._id)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <img className="w-6 h-6" src={asset.add1} alt="Increase" />
                    </button>
                  </div>
                  <div className="text-gray-600">{item?.category || 'Uncategorized'}</div>
                  <div className="font-medium text-gray-800">₹{item?.price || '0'}</div>
                  <div className="flex justify-center">
                    <button 
                      onClick={() => removeProduct(item._id)}
                      className="p-2 rounded-full hover:bg-red-50 transition-colors group"
                    >
                      <img src={asset.delete1} alt="Delete" className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No products found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
