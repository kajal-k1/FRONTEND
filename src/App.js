
 import React from 'react';
 import { Routes, Route } from 'react-router-dom';
 import Header from './components/Header';
 import Home from './pages/Home';
import SearchResultsPage from './pages/SearchResultsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import CliqCarePage from './pages/CliqCarePage';
import CliqCareTopicPage from './pages/CliqCareTopicPage';
 import SecureShopping from './pages/SecureShopping';
import CartPage from './pages/CartPage';
  import Wishlist from './pages/WishlistPage' 
 import CategoryPage from './components/CategoryPage';
 import ProductDetail from './components/ProductDetail';
 import CheckoutPage from './pages/CheckoutPage';
 import Footer from './components/Footer';
 function App() {
   return (<>
 <Header/>
       <Routes>
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cliqcare" element={<CliqCarePage />} />
          <Route path="/cliqcare/topic/:topic" element={<CliqCareTopicPage />} />
         
          <Route path="/" element={<Home />} />
         <Route path="/secure-shopping" element={<SecureShopping />} />
         <Route path="/product/:id" element={<ProductDetail />} />
         
          <Route path="/products" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
         <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
       </Routes>
       <Footer/>
       </>
 );
 }

 export default App;
