import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import images from '../utils/dynamicImportImages';
const photos = [
  { src: images['../assets/MX Photos/CrossFit Chrome.jpg']?.default || '', height: 4032, width: 3024, alt: 'CrossFit Chrome' },
  { src: images['../assets/MX Photos/Nance.jpg']?.default || '', height: 4032, width: 3024, alt: 'Nance' },
  { src: images['../assets/MX Photos/Nance 2.jpg']?.default || '', height: 4032, width: 3024, alt: 'Nance 2' },
  { src: images['../assets/MX Photos/concrete (2).jpg']?.default || '', height: 4032, width: 3024, alt: 'Concrete' },
];

export default function MXDrywallGallery() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Handle the Previous button
  const handlePrevious = () => {
    setCurrentPhotoIndex((prevIndex) => Math.max(0, prevIndex - 2));
  };

  // Handle the Next button
  const handleNext = () => {
    setCurrentPhotoIndex((prevIndex) => Math.min(photos.length - 2, prevIndex + 2));
  };

  // Slice the photos array to show only two photos at a time
  const visiblePhotos = photos.slice(currentPhotoIndex, currentPhotoIndex + 2);

  return (
    <div className="mx-gallery-container">
      <h2 className="photo-mx-dry-note">MX DRYWALL FLOOR CONCRETE GRAPHIC PHOTO GALLERY</h2>
      <div className="gallery">
        {visiblePhotos.map((photo, index) => (
          <div className="gallery-item" key={index}>
            <img src={photo.src} alt={photo.alt} />
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
