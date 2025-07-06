import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import ProductDetails from './components/ProductDetails';
import ProductCategoryPage from './pages/ProductCategoryPage';
import SearchResultsPage from './pages/SearchResultPage';
import Login from './components/Login';
import AdminLogin from './components/admin/AdminLogin';
import Layout from './components/Layout';
import { useContextProvider } from './context/AppContext';
import AdminLayout from './pages/admin/AdminLayout';

const App = () => {
  const { showUserLogin, isAdmin } = useContextProvider();

  return (
    <div>
      {showUserLogin && <Login />}

      <Routes>
        {/* Routes that include header/footer layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products/:slug" element={<ProductCategoryPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Route>

        {/* Routes that do not include layout */}
        <Route path="/admin" element={isAdmin ? <AdminLayout /> : <AdminLogin />} />
      </Routes>
    </div>
  );
};

export default App;
