import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductPage from './components/ProductPage';
import ProductList from './components/ProductList'; 
import Archived from './components/Archived';
import Shop from './components/Shop';
import Shipping from './components/info/Shipping';
import Authenticity from './components/info/Authenticity';
import Styling from './components/Styling';
import { fetchProducts } from './components/fetchProducts';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts();
      setProducts(data);
    }
    loadProducts();
  }
  , []);
  if (!products.length) {
    return <div class="spinner center">
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
    </div>;
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList products={products} />} />
        <Route path="/product/:id" element={<ProductPage products={products} />} />
        <Route path="/archived" element={<Archived />} />
        <Route path="/shop" element={<Shop products={products} />} />
        <Route path="/info/Shipping" element={<Shipping />} />
        <Route path="/info/Authenticity" element={<Authenticity />} />
        <Route path="/styling" element={<Styling />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;