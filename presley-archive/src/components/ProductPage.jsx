import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import './ProductPage.css';

function shuffleArray(array) {
  const shuffled = array.slice(); // copy the array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function ProductPage({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => String(p.id) === id);
  if (!product) {
    return <div>Product not found</div>;
  }

  const images = product.images || [product.image];
  const [current, setCurrent] = useState(0);

  const previmage = () => {
    setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextimage = () => {
    setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextimage,
    onSwipedRight: previmage,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  // Instead of recalculating suggestions on every render, use useMemo.
  const suggestions = useMemo(() => {
    const suggestionCandidates = products.filter(
      p => p.collection === product.collection && p.id !== product.id
    );
    return shuffleArray(suggestionCandidates).slice(0, 4);
  }, [products, product.collection, product.id]);

  return (
    <>
      <div className="product-page">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="carousel" {...handlers}>
            {images.length > 1 && (
              <div className="arrow" onClick={nextimage}>
                <div className="arrow-top"></div>
                <div className="arrow-bottom"></div>
              </div>
            )}
            <div className="carousel-center">
              <div className="product-image-container">
                <img src={images[current]} alt={product.name} className="modal-image" />
              </div>
              <div className="carousel-dots">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`dot${current === idx ? ' active' : ''}`}
                    onClick={() => setCurrent(idx)}
                  />
                ))}
              </div>
            </div>
            {images.length > 1 && (
              <div className="arrow-right" onClick={previmage}>
                <div className="arrow-right-top"></div>
                <div className="arrow-right-bottom"></div>
              </div>
            )}
          </div>
        </div>
        <div className="product-details">
          <h2>{product.name}</h2>
          <p>{product.brand}</p>
          <p>${product.price}</p>
          <p>{product.description1}</p>
          <p>{product.description2}</p>
          <p>{product.description3}</p>
          <p>{product.description4}</p>
          <p>{product.sold === "yes" ? "Product Sold" : " "}</p>
          <div className="buy-links">
            <a
              href={product.depop ? product.depop.replace(/[<>]/g, '').trim() : '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="depop-btn">Buy on depop</button>
            </a>
            <a
              href="https://www.instagram.com/presley_archive/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="insta-btn">Inquire on Insta</button>
            </a>
          </div>
        </div>
      </div>
      <div className="suggestion">
        <h3>You may also like</h3>
        <div className="suggestion-grid">
          {suggestions.map(p => (
            <div
              key={p.id}
              className="suggestion-item"
              onClick={() => navigate(`/product/${p.id}`)}
            >
              <img src={p.image} alt={p.name} className="suggestion-image" />
              <div className="suggestion-info">
                <h4>{p.name}</h4>
                <p>{p.brand}</p>
                <p>${p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductPage;