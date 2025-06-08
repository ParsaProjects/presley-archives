import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

function ImageSlider({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  if (!Array.isArray(images) || length === 0) return null;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // Automatically change slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prevCurrent => (prevCurrent === length - 1 ? 0 : prevCurrent + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  return (
    <> {/* Use a React Fragment to wrap the two top-level divs */}
      <div className="slider">
        <div className="slide">
          {/* Render the current slide image */}
          <img src={images[current]} alt={`Slide ${current}`} className="slide-image" />
        </div>
      </div>

      {/* This container will now be *below* the slider image */}
      <div className="dots-and-arrows-wrapper"> {/* New wrapper for the white background */}
        <div className="dots-and-arrows-container">
          <div className="dots-container">
            {images.map((_, index) => (
              <span
                key={index}
                className={index === current ? 'dot active' : 'dot'}
                onClick={() => setCurrent(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageSlider;