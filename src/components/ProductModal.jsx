import './ProductModal.css';
import { useState } from 'react';
import {useSwipeable} from 'react-swipeable';

function ProductModal({product, onClose}){
    const images = product.images || [product.image];
    const [current, setCurrent] = useState(0);

    const previmage = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextimage = () => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handlers = useSwipeable({
        onSwipedLeft: nextimage,
        onSwipedRight: previmage,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return(
        <div className="modal-backdrop" onClick={onClose}>
            <button className="close-button" onClick={onClose}>X</button>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="carousel" {...handlers}>
                    {images.length > 1 && (
                        <button className="carousel-btn left" onClick={previmage}>
                        &lt;
                        </button>
                    )}
                    <div className="carousel-center">
                        <img src={images[current]} alt={product.name} className="modal-image" />
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
                        <button className="carousel-btn right" onClick={nextimage}>
                        &gt;
                        </button>
                    )}
                </div>
                <div className="product-details">
                    <h2>{product.name}</h2>
                    <p>{product.brand}</p>
                    <p>{product.description1}</p>
                    <p>{product.description2}</p>
                </div>
            </div>
        </div>

    );
}

export default ProductModal;