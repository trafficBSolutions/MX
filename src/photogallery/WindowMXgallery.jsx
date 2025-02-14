import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import images from '../utils/dynamicImportImages';
const photos = [
  { src: images['../assets/MX Photos/tint5.jpg']?.default || '', width: 4032, height: 3024},
  {src: images['../assets/MX Photos/tint6.jpg']?.default || '', width: 4032, height: 3024},
  { src: images['../assets/MX Photos/tint.jpg']?.default || '', height: 4032, width: 3024 },
  { src: images['../assets/MX Photos/tint2.jpg']?.default || '', height: 4032, width: 3024 },
  { src: images['../assets/MX Photos/tint3.jpg']?.default || '', width: 4032, height: 3024 },
  { src: images['../assets/MX Photos/tint4.jpg']?.default || '', height: 4032, width: 3024 },
];

export default function MXWindowGal() {
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
      <h2 className="photo-window-mx-note">MX WINDOW FROSTING TINTING PHOTO GALLERY</h2>
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
