import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "./fetchProducts";
import './ProductPage.css';

function Archived() {
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

    // Filter archived products
    const archivedProducts = products.filter(product => product.archived === "yes");

    return (
        <div className="card">
            {archivedProducts.length === 0 ? (
                <p>No archived products found.</p>
            ) : (
                archivedProducts.map(product => (
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
    );
}

export default Archived;