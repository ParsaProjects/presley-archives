import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "./fetchProducts";

function Shop() {
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  if(!products.length) {
    return<div class="spinner center">
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

  // Filter out archived products
  const soldProducts = products.filter(product => product.sold !== "yes");

  return (
    <div className="card">
      {soldProducts.length === 0 ? (
        <p>No sold products found.</p>
      ) : (
        soldProducts.map(product => (
          <div className="image-container" key={product.id}>
            <Link to={`/product/${product.id}`} className="product-link">
              <img src={product.image} alt={product.name} />
              <p className="product-name">{product.name}</p>
              <p className="product-brand">{product.brand}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Shop;