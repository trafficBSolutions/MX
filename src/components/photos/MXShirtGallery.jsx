import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
const photos = [
  {
    src: '../public/MX Photos/tbs shirts.jpg',
    width: 1226,
    height: 2653
  },
  
  {
    src: '../public/MX Photos/jdf shirt.JPG',
    width: 4032,
    height: 3024
  },
  {
    src: '../public/MX Photos/koj shirt.JPG',
    width: 4032,
    height: 3024
  },
  {
    src: '../public/MX Photos/koj.JPG',
    height: 4032,
    width: 3024
  },
];

export default function MXShirtGallery() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentPhotoIndex((prevIndex) => Math.max(0, prevIndex - 2));
  };

  const handleNext = () => {
    setCurrentPhotoIndex((prevIndex) => Math.min(photos.length - 2, prevIndex + 2));
  };

  // Slice the photos array to show only two photos at a time
  const visiblePhotos = photos.slice(currentPhotoIndex, currentPhotoIndex + 2);
  return (
    <div className="mx-gallery-container">
      <h2 className="photo-mx-note">MX T-SHIRT SWEATSHIRT JACKET PHOTO GALLERY</h2>
      <div className="gallery">
        {visiblePhotos.map((photo, index) => (
          <div className="gallery-item" key={index}>
            <img src={photo.src} alt={`Photo ${index}`} />
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        {currentPhotoIndex > 0 && (
          <button className="gallery-mx-navigation-arrow-left" onClick={handlePrevious}>
            <FaArrowLeft />
          </button>
        )}
        {currentPhotoIndex + 2 < photos.length && (
          <button className="gallery-mx-navigation-arrow-right" onClick={handleNext}>
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}