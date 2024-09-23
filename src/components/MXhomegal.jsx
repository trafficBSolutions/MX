import React, { useState } from 'react';
import Gallery from 'react-photo-gallery';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
const photos = [
  {
    src: '../public/MX Photos/Banner BBQ.JPG',
    width: 960,
    height: 720
  },
  {
    src: '../public/MX Photos/mallory.jpg',
    width: 4032,
    height: 3024
  },
  {
    src: '../public/MX Photos/mallory2.jpg',
    width: 4032,
    height: 3024
  },
  {
    src: '../public/MX Photos/danco Trailer.jpg',
    width: 4032,
    height: 3024
  },
  {
    src: '../public/MX Photos/Nance.JPG',
    width: 2048,
    height: 1536
  },
  {
    src: '../public/MX Photos/Nance 2.JPG',
    width: 2048,
    height: 1536
  },
  {
    src: '../public/MX Photos/jt.jpg',
    height: 4032,
    width: 3024
  },
  {
    src: '../public/MX Photos/magnets.jpg',
    width: 4032,
    height: 3024
  },
  {
    src: '../public/MX Photos/mr.JPG',
    width: 2048,
    height: 1536
  },
  {
    src: '../public/MX Photos/mr2.JPG',
    width: 2048,
    height: 1536
  },
  {
    src: '../public/MX Photos/mr3.JPG',
    width: 2048,
    height: 1536
  },
  {
    src: '../public/MX Photos/homesolution.jpg',
    width: 4032,
    height: 3024
  },
  {
    src: '../public/MX Photos/box truck.jpg',
    width: 4032,
    height: 3024
  },
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
  {
    src: '../public/MX Photos/muse.JPG',
    width: 1599,
    height: 702
  },
  {
    src: '../public/MX Photos/muse2.JPG',
    width: 1599,
    height: 702
  },
  {
    src: '../public/MX Photos/muse3.JPG',
    width: 1599,
    height: 702
  },
  {
    src: '../public/MX Photos/jdf shirt.JPG',
    width: 4032,
    height: 3024
  },
];

export default function MXPhotoGallery() {
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
      <h2 className="photo-mx-note">PHOTO GALLERY</h2>
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