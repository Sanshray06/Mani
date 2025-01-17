import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₹';
  const delivery_fee = 40;
  const backednUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate=  useNavigate();
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(true);
  const [token,setToken] = useState('');
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [products , setProducts] = useState([]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log(cartItems);
  }, [cartItems]);

  
  const buy=async (itemId, size) =>{
    if (!size) {
      toast.error('Select Product Size');
      return false;
    }
    return true;

  }
  const removeFromCart = (itemId, size) => {
    setCartItems(prevCart => {
      const newCart = structuredClone(prevCart);
      
      if (newCart[itemId]?.[size]) {
        delete newCart[itemId][size];
        
        // Clean up empty objects
        if (Object.keys(newCart[itemId]).length === 0) {
          delete newCart[itemId];
        }
      }
      
      return newCart;
    });
  };

  const updateQuantity = async (itemId, size, quantity) => {
    if (quantity < 0) return;
    
    setCartItems(prevCart => {
      const newCart = structuredClone(prevCart);
      
      if (!newCart[itemId]) {
        newCart[itemId] = {};
      }
      
      if (quantity === 0) {
        delete newCart[itemId][size];
        if (Object.keys(newCart[itemId]).length === 0) {
          delete newCart[itemId];
        }
      } else {
        newCart[itemId][size] = quantity;
      }
      
      return newCart;
    });
    if(token){
      try {
        await axios.post(backednUrl + '/api/cart/update' , {itemId ,size,quantity},{headers:{token}})
      } catch (error) {
          console.log(error)
          toast.error(error.message)
      }
    }
  };
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }

    setCartItems(prevCart => {
      const newCart = structuredClone(prevCart);
      
      if (!newCart[itemId]) {
        newCart[itemId] = {};
      }
      
      newCart[itemId][size] = (newCart[itemId][size] || 0) + 1;
      
      toast.success('Item added to cart');
      return newCart;
    });
    if(token){
      try{
        await axios.post(backednUrl + '/api/cart/add',{itemId,size},{headers:{token}})
      }
      catch(error){
        console.log(error)
        toast.error(error.message)
      }
    }
  };
  const getUserCart = async (userToken) => {
    if (!userToken) return setCartItems({});
  
    try {
      const response = await axios.post(`${backednUrl}/api/cart/get`, {}, {
        headers: { token: userToken }
      });
      
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        setCartItems({});
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setCartItems({});
    }
  };
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      const isValidProduct = products.some(product => product._id.toString() === itemId);
      if (isValidProduct) {
        for (const size in cartItems[itemId]) {
          totalCount += cartItems[itemId][size];
        }
      }
    }
    return totalCount;
  };
  

  const getCartTotal = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find(p => p._id === itemId);
      if (product) {
        for (const size in cartItems[itemId]) {
          total += product.price * cartItems[itemId][size];
        }
      }
    }
    return total;
  };

  const clearCart = () => {
    setCartItems({});
    toast.info('Cart cleared');
  };

  const getProductsData = async () =>{
    try {
      const response = await axios.get(backednUrl + '/api/product/list')
      if(response.data){
        setProducts(response.data.products)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    getProductsData()
  },[])

  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
  },[])
  useEffect(() => {
    if (token) {
      getUserCart(token);
    } else {
      setCartItems({});
    }
  }, [token]); 
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getCartTotal,
    clearCart,
    navigate,
    buy,
    backednUrl,
    token,
    setToken,
    setCartItems
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;