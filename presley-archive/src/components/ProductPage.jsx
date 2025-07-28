import React, { useState, useMemo, useRef, useEffect } from 'react';
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
      p => p.collection === product.collection && p.id !== product.id && p.sold !== "yes"
    );
    return shuffleArray(suggestionCandidates).slice(0, 4);
  }, [products, product.collection, product.id]);

  const imageContainerRef = useRef(null);

  useEffect(() => {
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [product.id]);

  // Clean up depop URL if needed
  const depopSlug = product.depop || '';
  const cleanDepopUrl = `https://www.depop.com/products/presley_archive${depopSlug}`;

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
            <div className="carousel-center" ref={imageContainerRef}>
              <div className="product-image-container">
                <img src={images[current]} alt={product.name} className="modal-image" />
              </div>
              <div className="carousel-counter">
                {images.length > 1 ? `${current + 1} / ${images.length}` : null}
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
        <div className="prod-details">
          <h2 className="prod-name">{product.name}</h2>
          <div className="prod-place">
            <p className="prod-price">${product.price}</p>
            <p className="prod-sold">{product.sold === "yes" ? "sold out" : " "}</p>
          </div> 
          <p className="prod-brand">{product.brand}</p>
          <p className="prod-description1">{product.description1}</p>
          <p className="prod-description2">{product.description2}</p>
          <p className="prod-description3">{product.description3}</p>
          <p className="prod-description4">{product.description4}</p>
          
          <div className="buy-links">
            <a
              href={cleanDepopUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="depop-btn">buy on depop</button>
            </a>
            <a
              href="https://www.instagram.com/presley_archive/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="insta-btn">inquire via instagram</button>
            </a>
          </div>
        </div>
      </div>
      <div className="suggestion">
        <h3 className="suggestion-title">you may also like</h3>
        <div className="suggestion-grid">
          {suggestions.filter(p => p.sold !== "yes").length === 0 ? (
            <div className="no-suggestions">no suggestions available.</div>
          ) : (
            suggestions
              .filter(p => p.sold !== "yes")
              .map(p => (
                <div
                  key={p.id}
                  className="suggestion-item"
                  onClick={() => navigate(`/product/${p.id}`)}
                >
                  <img
                    src={p.image || "/placeholder.jpg"}
                    alt={p.name}
                    className="suggestion-image"
                  />
                  <div className="suggestion-info">
                    <h4 className="p-name">{p.name}</h4>
                    <p className="p-brand">{p.brand}</p>
                    <p className="p-price">
                      ${typeof p.price === "number" ? p.price.toFixed(2) : p.price}
                    </p>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </>
  );
}

export default ProductPage;