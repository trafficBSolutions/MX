import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import images from '../utils/dynamicImportImages';

const photos = [
      { 
        src: images['../assets/MX Photos/peel5.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
      { 
        src: images['../assets/MX Photos/peel6.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
      { 
        src: images['../assets/MX Photos/peel7.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
      { 
        src: images['../assets/MX Photos/peel8.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
      { 
        src: images['../assets/MX Photos/peel4.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
      { 
        src: images['../assets/MX Photos/ch.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
    { 
        src: images['../assets/MX Photos/ch2.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
    { 
        src: images['../assets/MX Photos/ch3.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
    { 
        src: images['../assets/MX Photos/ch4.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
    { 
        src: images['../assets/MX Photos/ch5.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
    { 
        src: images['../assets/MX Photos/cnc.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['../assets/MX Photos/cnc2.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['../assets/MX Photos/cnc3.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['../assets/MX Photos/cnc4.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['../assets/MX Photos/cnc5.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['../assets/MX Photos/cola.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['../assets/MX Photos/peel.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
   
   { 
        src: images['../assets/MX Photos/peel2.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['../assets/MX Photos/peel3.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
    { 
        src: images['../assets/MX Photos/complete.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
    { 
        src: images['../assets/MX Photos/complete2.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
    { 
        src: images['../assets/MX Photos/complete3.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['../assets/MX Photos/yancey.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['../assets/MX Photos/jcmural.jpg']?.default || '', 
        height: 4032, 
        width: 3024, 
        },
  { src: images['../assets/MX Photos/jcmural2.jpg']?.default || '', height: 4032, width: 3024, alt: 'Cinderblock' },
  { src: images['../assets/MX Photos/jcmural3.jpg']?.default || '', height: 4032, width: 3024, alt: 'Cinderblock' },
   {
    src: images['../assets/MX Photos/fleet.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
{
    src: images['../assets/MX Photos/fleet2.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
   {
    src: images['../assets/MX Photos/fleet3.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
   {
    src: images['../assets/MX Photos/tint5.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
   {
    src: images['../assets/MX Photos/tint6.jpg']?.default || '',
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
    src: images['../assets/MX Photos/sky2.jpg']?.default || '',
    width: 4032,
    height: 3024
  },
    {
    src: images['../assets/MX Photos/dirt bike.jpg']?.default || '',
    width: 1599,
    height: 702
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
    src: images['../assets/MX Photos/Nance.jpg']?.default || '',
    width: 2048,
    height: 1536
  },
  {
    src: images['../assets/MX Photos/Nance 2.jpg']?.default || '',
    width: 2048,
    height: 1536
  },
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
    src: images['../assets/MX Photos/jdf shirt.jpg']?.default || '',
    width: 4032,
    height: 3024
  }
];
export default function MXPhotoGallery() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handlePrevious = () => {
    setCurrentPhotoIndex((prevIndex) => Math.max(0, prevIndex - (window.innerWidth <= 320 ? 1 : 4)));
  };

  const handleNext = () => {
    setCurrentPhotoIndex((prevIndex) =>
      Math.min(photos.length - 1, prevIndex + (window.innerWidth <= 320 ? 1 : 4))
    );
  };

  const visiblePhotos = photos.slice(currentPhotoIndex, currentPhotoIndex + 4);

  return (
    <div className="mx-gallery-container">
      <h2 className="photo-mx-note">PHOTO GALLERY</h2>
      <div className="gallery">
        {visiblePhotos.map((photo, index) => (
          <div className="gallery-item" key={index} onClick={() => {
            setModalImage(photo.src);
            setIsModalOpen(true);
          }}>
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

      {/* Modal Fullscreen View */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Full View" />
            <button className="close-button" onClick={() => setIsModalOpen(false)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}
