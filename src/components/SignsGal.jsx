import React, { useState } from 'react';
import Gallery from 'react-photo-gallery';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
const photos = [
  {
    src: '../public/MX Photos/church table.jpg',
    width: 4032,
    height: 3024
  },
  {
    src: '../public/MX Photos/church signs.JPG',
    width: 4032,
    height: 3024
  },
  {
    src: '../public/MX Photos/shaw.JPG',
    width: 4032,
    height: 3024
  },
  {
    src: '../public/MX Photos/btr.JPG',
    width: 4032,
    height: 3024
  },
  {
    src: '../public/MX Photos/trinity.JPG',
    width: 4032,
    height: 3024
  },
];

export default function MXSignGallery() {
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
    <div>
      <h2 className="photo-mx-note">MX CUSTOMIZABLE SIGNAGE PHOTO GALLERY</h2>
      <div style={{ position: 'relative' }}>
        <Gallery photos={visiblePhotos} />
        {currentPhotoIndex !== 0 && (
          <button className="gallery-mx-navigation-arrow-left" onClick={handlePrevious}>
            <FaArrowLeft />
          </button>
        )}
        {currentPhotoIndex + 3 < photos.length && (
          <button className="gallery-mx-navigation-arrow-right" onClick={handleNext}>
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}