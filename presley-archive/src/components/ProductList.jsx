import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "./fetchProducts";
import ImageSlider from "./ImageSlider";
import './ProductList.css';

function ProductList() {
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

  // Filter out not mypick products

  const mypickedProducts = products.filter(product => product.mypick === "yes");
  const sliderImages = ["https://i.imgur.com/ozN8nrs.jpg", "https://i.imgur.com/q1RVVJd.jpg", "https://i.imgur.com/kQexwF6.jpg", "https://i.imgur.com/0Q3Ep7q.jpg"];
  
  return (
    <>
      <div className="card">
        
        {mypickedProducts.length === 0 ? (
      <p>No picked products found.</p>
        ) : (
          mypickedProducts.map(product => (
            <div className="image-container" key={product.id}>
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="image-wrapper">
                  <img src={product.image} alt={product.name} />
                  {product.sold === "yes" && (
                    <span className="product-sold">sold out</span>
                  )}
                </div>
                <p className="product-name">{product.name}</p>
                <p className="product-brand">{product.brand}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </Link>
            </div>
          ))
        )}
      </div>
      
      <div className="random-images">
        {/* Image slide show using sliderImages array */}
        <ImageSlider images={sliderImages} />
      </div>
    </>
    
  );
}

export default ProductList;