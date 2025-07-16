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
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [address, setAddress] = useState([]);
  
  const fetchAdmin = async () => {
    try {
      const {data} = await API.get('/api/admin/is-auth', { credentials: 'include' });
      if (data.success) {
        localStorage.setItem('isAdmin', 'true');
      } else {
        localStorage.removeItem('isAdmin');
      }
    } catch (error) {
      localStorage.removeItem('isAdmin');
    }
  };

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
    try {
      const { data } = await API.get('/api/product');
      if (data.success) {
        setProducts(data.products);
      } else {
        setProducts(null);
      }
    } catch (error) {
      setProducts(null);
    }
  }
  const fetchCategories = async() =>{
    try {
      const { data } = await API.get('/api/category');
      if (data.success) {
        setCategories(data.categories);
      } else {
        setCategories(null);
      }
    } catch (error) {
      setCategories(null);
    }
  }

  const fetchCartFromDB = async (customerId) => {
    try {
      const userId = customerId || user?._id;
      if (!userId) {
        return;
      }
      const { data } = await API.get(`/api/cart/user/${userId}`);
      if (data.success && data.cartItems) {
        const cartData = {};
        data.cartItems.forEach(item => {
          cartData[item.product._id] = item.quantity;
        });
        setCartItems(cartData);
      }
    } catch (error) {
      console.error("Failed to fetch cart from DB:", error.message);
    }
  };

//   useEffect(() => {
//     const fetchAddress = async () => {
//     try {
//         const { data } = await API.get(`/api/address/user/${user._id}`);
//         if (data.success && data.addresses.length > 0) {
//         setAddress(data.addresses[0]); // You can allow multiple later
//         }
//     } catch (err) {
//         toast.error("Failed to fetch address");
//     }
//     };

//     if (user?._id) {
//     fetchAddress();
//     }
// }, [user]);

  // const addToCart = (itemId) =>{
  //   let cartData = structuredClone(cartItems);

  //   if(cartData[itemId]){
  //     cartData[itemId] += 1;
  //   }else{
  //     cartData[itemId] =1;
  //   }
  //   setCartItems(cartData);
  //   toast.success("Add to Cart");
  // }

const addToCart = async (itemId) => {
  const product = products.find((p) => p._id === itemId);
  if (!product) {
    toast.error("Product not found");
    return;
  }

  const currentQty = cartItems[itemId] || 0;
  const newQty = currentQty + 1;

  if (newQty > product.stock) {
    toast.error(`Only ${product.stock} items in stock`);
    return;
  }

  let cartData = structuredClone(cartItems);
  cartData[itemId] = newQty;
  setCartItems(cartData);

  try {
    console.log(user._id)
    await API.put("/api/cart/update", {
      userId: user._id,
      cartItems: [{ product: itemId, quantity: 1 }],
    });
  } catch (error) {
    console.error("Failed to update cart:", error.message);
  }

  toast.success("Added to cart");
};

  // update cart item quantity
  const updateCartItem = (itemId, quantity) =>{
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
  }

  // remove form cart
  // const removeFromCart = (itemId) =>{
  //   let cartData = structuredClone(cartItems)
  //   if(cartData[itemId]){
  //     cartData[itemId] -= 1;
  //     if(cartData[itemId] == 0){
  //       delete cartData[itemId];
  //     }
  //   }
  //   toast.success("Item remove from Cart");
  //   setCartItems(cartData);
  // }

  const removeFromCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
      setCartItems(cartData);

      try {
        await API.put("/api/cart/update", {
          userId: user._id,
          cartItems: [{ product: itemId, quantity: -1 }],
        });
      } catch (error) {
        console.error("Failed to remove from cart:", error.message);
      }

      toast.success("Removed from cart");
    }
  };

  const removeProductFromCart = async (itemId) => {
    try {
      await API.put("/api/cart/remove", {
        userId: user._id,
        productId: itemId
      });

      const newCart = { ...cartItems };
      delete newCart[itemId];
      setCartItems(newCart);

      toast.success("Product removed from cart");
    } catch (error) {
      console.error("Failed to remove item:", error.message);
      toast.error("Failed to remove item");
    }
  };

  // get item cart count
  const getCartCount = () =>{
    // let totalCount = 0;
    //   // console.log(cartItems.length)
    // for (const item in cartItems){
    //   totalCount += cartItems[item];
    // }
    // return totalCount;
    return Object.keys(cartItems).length;
  }

  // get Cart total amount
  const getCartAmount = () =>{
    let totalAmount = 0;
    for (const items in cartItems){
      let itemInfo = products.find((product) => product._id === items);
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

  useEffect(() => {
    if (user?._id) fetchCartFromDB();
  }, [user]);
   

  const value = { navigate, user, setUser, isAdmin, setIsAdmin, showUserLogin, setShowUserLogin, products, address, addToCart, updateCartItem, removeFromCart, fetchCartFromDB, removeProductFromCart, cartItems, setCartItems, getCartCount, getCartAmount, categories, axios };

 
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useContextProvider = () => {
    return useContext(AppContext);
}