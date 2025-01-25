import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FloatingSymbols from './FloatingSymbols'; // Import the FloatingSymbols component
import './PhotoCarousel.css';

const photos = [
  { month: 'January 2024', src: `${process.env.PUBLIC_URL}/assets/January2024.jpg` },
  { month: 'February 2024', src: `${process.env.PUBLIC_URL}/assets/February2024.jpg` },
  { month: 'March 2024', src: `${process.env.PUBLIC_URL}/assets/March2024.jpg` },
];

const PhotoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="carousel-container">
      <FloatingSymbols /> {/* Ensure this is above the carousel images for background effect */}
      
      {/* Tagline */}
      <div className="carousel-tagline">
      Every Moment Was a Memory in the Making 😭❤️
      </div>

      <div className="carousel-images">
        {/* Left Image */}
        <img 
          src={photos[(currentIndex - 1 + photos.length) % photos.length].src} 
          alt="Previous"
          className="carousel-image prev"
        />

        {/* Center Image */}
        <img 
          src={photos[currentIndex].src} 
          alt={photos[currentIndex].month}
          className="carousel-image center"
        />

        {/* Right Image */}
        <img 
          src={photos[(currentIndex + 1) % photos.length].src} 
          alt="Next"
          className="carousel-image next"
        />

        {/* Navigation Buttons */}
        <div className="carousel-buttons">
          <button 
            onClick={handlePrev} 
            className="carousel-button left"
          >
            <ChevronLeft size={24} color="black" />
          </button>
          <button 
            onClick={handleNext} 
            className="carousel-button right"
          >
            <ChevronRight size={24} color="black" />
          </button>
        </div>
      </div>

      {/* Month Label */}
      <div className="carousel-month-label">{photos[currentIndex].month}</div>
    </div>
  );
};

export default PhotoCarousel;
