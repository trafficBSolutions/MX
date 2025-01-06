import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import images from '../utils/dynamicImportImages';

const photos = [
  {
    src: images['../assets/MX Photos/Banner BBQ.jpg']?.default || '',
    width: 960,
    height: 720
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
  {
    src: images['../assets/MX Photos/danco Trailer.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
      {
    src: images['../assets/MX Photos/bike.jpg']?.default || '',
    width: 1599,
    height: 702
  },
      {
    src: images['../assets/MX Photos/bike2.jpg']?.default || '',
    width: 1599,
    height: 702
  },
  {
    src: images['../assets/MX Photos/cone decals.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
  {
    src: images['../assets/MX Photos/cones & stick decals.jpg']?.default || '',
    width: 1599,
    height: 702
  },
  {
    src: images['../assets/MX Photos/el cubano decals.jpg']?.default || '',
    height: 4032,
    width: 3024
  },
      {
    src: images['../assets/MX Photos/cubano.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
      {
    src: images['../assets/MX Photos/cubano2.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
  {
    src: images['../assets/MX Photos/Nance.jpg']?.default || '',
    width: 2048,
    height: 1536
  },
  {
    src: images['../assets/MX Photos/Nance 2.jpg']?.default || '',
    width: 2048,
    height: 1536
  },
  { src: images['../assets/MX Photos/jcmural.jpg]?.default || '', height: 4032, width: 3024, alt: 'Cinderblock' },
  { src: images['../assets/MX Photos/jcmural2.jpg]?.default || '', height: 4032, width: 3024, alt: 'Cinderblock' },
  { src: images['../assets/MX Photos/jcmural3.jpg]?.default || '', height: 4032, width: 3024, alt: 'Cinderblock' },
  {
    src: images['../assets/MX Photos/jt.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
  {
    src: images['../assets/MX Photos/magnets.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
  {
    src: images['../assets/MX Photos/mr.jpg']?.default || '',
    width: 2048,
    height: 1536
  },
  {
    src: images['../assets/MX Photos/mr2.jpg']?.default || '',
    width: 2048,
    height: 1536
  },
  {
    src: images['../assets/MX Photos/mr3.jpg']?.default || '',
    width: 2048,
    height: 1536
  },
  {
    src: images['../assets/MX Photos/homesolution.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
  {
    src: images['../assets/MX Photos/box truck.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
          {
    src: images['../assets/MX Photos/sky.jpg']?.default || '',
    width: 1599,
    height: 702
  },
          {
    src: images['../assets/MX Photos/sky3.jpg']?.default || '',
    width: 1599,
    height: 702
  },
          {
    src: images['../assets/MX Photos/sky4.jpg']?.default || '',
    width: 1599,
    height: 702
  },
          {
    src: images['../assets/MX Photos/sky5.jpg']?.default || '',
    width: 1599,
    height: 702
  },
  {
    src: images['../assets/MX Photos/church table.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
  {
    src: images['../assets/MX Photos/church signs.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
  {
    src: images['../assets/MX Photos/shaw.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
      {
    src: images['../assets/MX Photos/sky2.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
  {
    src: images['../assets/MX Photos/btr.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
  {
    src: images['../assets/MX Photos/signs and barrels.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
  {
    src: images['../assets/MX Photos/trinity.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
  {
    src: images['../assets/MX Photos/muse.jpg']?.default || '',
    width: 1599,
    height: 702
  },
  {
    src: images['../assets/MX Photos/muse2.jpg']?.default || '',
    width: 1599,
    height: 702
  },
  {
    src: images['../assets/MX Photos/muse3.jpg']?.default || '',
    width: 1599,
    height: 702
  },
  {
    src: images['../assets/MX Photos/unified trailer.jpg']?.default || '',
    width: 1599,
    height: 702
  },
  {
    src: images['../assets/MX Photos/hood wrap.jpg']?.default || '',
    width: 1599,
    height: 702
  },
  {
    src: images['../assets/MX Photos/dirt bike.jpg']?.default || '',
    width: 1599,
    height: 702
  },
  {
    src: images['../assets/MX Photos/jdf shirt.jpg']?.default || '',
    width: 4032,
    height: 3024
  }
];

export default function MXPhotoGallery() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentPhotoIndex((prevIndex) => Math.max(0, prevIndex - 2));
  };

  const handleNext = () => {
    setCurrentPhotoIndex((prevIndex) => Math.min(photos.length - 1, prevIndex + 2));
  };

  const visiblePhotos = photos.slice(currentPhotoIndex, currentPhotoIndex + 2);

  return (
    <div className="mx-gallery-container">
      <h2 className="photo-mx-note">PHOTO GALLERY</h2>
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
