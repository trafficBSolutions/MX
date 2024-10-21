import React, { useState } from 'react';
//import Gallery from 'react-photo-gallery';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import images from '../utils/dynamicImportImages';
const photos = [

  {
    src: images['../assets/MX Photos/Banner BBQ.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
  {
    src: images['../assets/MX Photos/mallory.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
  {
    src: images['../assets/MX Photos/mallory2.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
];

export default function MXBannerGallery() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentPhotoIndex((prevIndex) => Math.max(0, prevIndex - 2));
  };

  const handleNext = () => {
    setCurrentPhotoIndex((prevIndex) => Math.min(photos.length - 1, prevIndex + 2));
  };

  // Slice the photos array to show only three photos based on the currentPhotoIndex
  const visiblePhotos = photos.slice(currentPhotoIndex, currentPhotoIndex + 2);

  return (
    <div className="mx-banner-gallery-container">
    <h2 className="photo-banner-mx-note">MX BANNER PHOTO GALLERY</h2>
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
