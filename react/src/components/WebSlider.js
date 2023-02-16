import React, { useState } from "react";
import { Link } from "react-router-dom";
import { slides } from "../slides";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

const WebSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lenght = slides.length;

  const nextSlide = () => {
    setCurrentIndex(currentIndex === lenght - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? lenght - 1 : currentIndex - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className="slide-section">
      <RxCaretLeft className="left-arrow" onClick={prevSlide} />
      <RxCaretRight className="right-arrow" onClick={nextSlide} />
      {slides.map((slide, index) => {
        return (
          <div
            className={index === currentIndex ? "slide active" : "slide"}
            key={index}
          >
            {index === currentIndex && (
              <div className="slide">
                <img
                  src={slide.url}
                  alt="product type"
                  className="slider-image"
                />
                <div className="slide-desc">
                  <h4>{slide.subtitle}</h4>
                  <h1 className="title">{slide.title}</h1>
                  <p className="description">{slide.description}</p>
                  <p className="price">{slide.price}</p>
                  <button className="action">
                    <Link to="/">
                      <span>View More</span>
                    </Link>
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WebSlider;
