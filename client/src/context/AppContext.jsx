import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import dumProducts from '../data/products.json';
import dumCategories from "../data/categories.json";
import axios from "axios";
import API from "../API";

export const AppContext = createContext(); 

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.BACKEND_URL;

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [categories, SetCategories] = useState([]);
  
  const fetchAdmin = async() =>{
    try {
      const {data} = await API.get('/api/admin/is-auth')
      if(data.success){
        setIsAdmin(true)
      }else{
        setIsAdmin(false)
      }
    } catch (error) {
      setIsAdmin(false)
    }
  }
  const fetchUser = async() =>{
    try {
      const {data} = await API.get('/api/user/is-auth')
      if(data.success){
        setUser(data.user);
      }else{
        setUser(false)
      }
    } catch (error) {
      setUser(false)
    }
  }

  const fetchProducts = async() =>{
    setProducts(dumProducts);
  }
  const fetchCategories = async() =>{
    SetCategories(dumCategories);
  }

  const addToCart = (itemId) =>{
    let cartData = structuredClone(cartItems);

    if(cartData[itemId]){
      cartData[itemId] += 1;
    }else{
      cartData[itemId] =1;
    }
    setCartItems(cartData);
    toast.success("Add to Cart");
  }

  // update cart item quantity
  const updateCartItem = (itemId, quantity) =>{
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
  }

  // remove form cart
  const removeFromCart = (itemId) =>{
    let cartData = structuredClone(cartItems)
    if(cartData[itemId]){
      cartData[itemId] -= 1;
      if(cartData[itemId] == 0){
        delete cartData[itemId];
      }
    }
    toast.success("Item remove from Cart");
    setCartItems(cartData);
  }

  // get item cart count
  const getCartCount = () =>{
    let totalCount = 0;
    for (const item in cartItems){
      totalCount += cartItems[item];
    }
    return totalCount;
  }

  // get Cart total amount
  const getCartAmount = () =>{
    let totalAmount = 0;
    console.log(cartItems);
    for (const items in cartItems){
      let itemInfo = products.find((product) => product.id === Number(items));
      console.log(itemInfo)
      if(cartItems[items] > 0){
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  }


  useEffect(() =>{
    fetchProducts()
    fetchAdmin()
    fetchUser()
    fetchCategories()
  },[]);
   

  const value = { navigate, user, setUser, isAdmin, setIsAdmin, showUserLogin, setShowUserLogin, products, addToCart, updateCartItem, removeFromCart, cartItems, getCartCount, getCartAmount, categories, axios };

 
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useContextProvider = () => {
    return useContext(AppContext);
}