import React, { useRef, useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import ProductDetails from './components/ProductDetails';
import ProductCategoryPage from './pages/ProductCategoryPage';
import SearchResultsPage from './pages/SearchResultPage';
import Login from './components/Login';
import AdminLogin from './components/admin/AdminLogin';
import Layout from './components/Layout';
import AdminLayout from './pages/admin/AdminLayout';
import Products from './pages/admin/Products';
import Dashboard from './pages/admin/Dashboard';
import { useContextProvider } from './context/AppContext';
import Category from './pages/admin/Category';
import CreateCategory from './pages/admin/CreateCategory';
import { Toaster } from 'react-hot-toast';
import AddProduct from './pages/admin/AddProduct';
import ChangeAddress from './pages/ChangeAddress';
import Checkout from './pages/Checkout';
import EsewaPayment from './components/Esewa';
import EsewaSuccess from './pages/EsewaSuccess';
import EsewaFailure from './pages/EsewaFailure';
import OrderSuccess from './pages/OrderSucess';
import PageNotFound from './pages/PageNotFound';
import OrderDetails from './pages/OrderDetails';
import MyOrders from './pages/MyOrders';
import EditCategory from './pages/admin/EditCategory';
import EditProduct from './pages/admin/EditProduct';
import AdminOrders from './pages/admin/Orders';

const App = () => {
  const { showUserLogin } = useContextProvider();
  const [isAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });
  const loadingRef = useRef(null);
  const location = useLocation();

  // Show loading bar on route change
  useEffect(() => {
    loadingRef.current?.continuousStart();
    const timer = setTimeout(() => loadingRef.current?.complete(), 500);
    return () => clearTimeout(timer);
  }, [location]);

  // Inline wrapper to protect admin routes
  const AdminProtected = ({ children }) => {
    return isAdmin ? children : <Navigate to="/admin-login" replace />;
  };

  return (
    <div>
      <LoadingBar color="#4CB944" height={3} ref={loadingRef} />

      {showUserLogin && <Login />}
      <Toaster reverseOrder={false} />
      <Routes>
          <Route path="*" element={<PageNotFound />} />

        {/* Routes with user layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products/:slug" element={<ProductCategoryPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/cart/change-address" element={<ChangeAddress />} />
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="/cart/order/payment" element={<EsewaPayment />} />
          <Route path="/order" element={<MyOrders />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
        </Route>
          <Route path="/order/esewa-success" element={<EsewaSuccess />} />
          <Route path="/order/esewa-failure" element={<EsewaFailure />} />
          <Route path="/order/success" element={<OrderSuccess />} />

        {/* Admin Login Page */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin Protected Routes - no separate file */}
        <Route
          path="/admin"
          element={
            <AdminProtected>
              <AdminLayout />
            </AdminProtected>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/create" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="category" element={<Category />} />
          <Route path="orders" element={<AdminOrders />} />
          {/* <Route path="order" element={<Category />} /> */}
          <Route path="category/create" element={<CreateCategory />} />
          <Route path="category/edit/:slug" element={<EditCategory />} />
        </Route>
      </Routes>
      
    </div>
  );
};

export default App;
