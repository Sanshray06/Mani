import { useEffect, useState } from "react"
import { backendUrl } from "../App"
import { toast } from "react-toastify"
import axios from "axios"
import { asset } from "../assets/assets"

const List = ({token}) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list', {
        headers: {
          token,
          'Content-Type': 'application/json',
        }
      })
      
      console.log('Sample product:', response.data.products[0]) // Debug log
      
      if (response.data.message === 'Products retrieved successfully!') {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const removeProduct = async (id) => {
    try {
      // Optimistically remove the product from the list
      setList((prevList) => prevList.filter((item) => item._id !== id));
  
      const response = await axios.post(
        `${backendUrl}/api/product/remove`, 
        { id },
        { headers: { token } }
      );
      
      console.log('Remove Product Response:', response.data);  // Log the response
  
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Failed to delete product. Please try again.");
      // Revert optimistic UI update in case of an error
      fetchList();
    }
  };
  
  
  
  
  return (
    <div className="mb-2">
      <p>All Products List</p>
      <div className="flex flex-col gap-2">
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr]">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div 
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 p-2 border rounded"
          >
            <div>
              {item.Mainimage && item.Mainimage.length > 0 ? (
                <img 
                  src={item.Mainimage[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded" 
                  onError={(e) => {
                    console.log('Image failed to load:', item.Mainimage[0])
                    e.target.src = 'https://via.placeholder.com/150'
                  }}
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500">
                  No image
                </div>
              )}
            </div>
            <div className="font-medium">{item.name || 'No name'}</div>
            <div>{item.category || 'Uncategorized'}</div>
            <div>₹{item.price || '0'}</div>
            <div className="flex justify-center gap-2">
              <button 
                className="px-3 py-1"
                
              >
                <img onClick={()=>removeProduct(item._id)} src={asset.delete1} alt="" className="w-8 h-8" />
              </button>
            </div>
          </div>
        ))}

        {list.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  )
}

export default List