import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import images from '../utils/dynamicImportImages';
const photos = [
  {
    src: images['Samples.svg'],
    height: 4032,
    width: 3024
  },
  
  {
    src: images['CrossFit Chrome.jpg'],
    height: 4032,
    width: 3024
  },
  {
    src: images['window decal.jpg'],
    height: 4032,
    width: 3024
  },
  {
    src: images['muse2.jpg'],
    width: 4032,
    height: 3024
  },
];
export default function MXDecalGallery() {
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

      {/* Navigation buttons inside modal */}
      <div className="modal-buttons">
        <button
          className="modal-nav-button left"
          onClick={() => {
            const currentIndex = photos.findIndex((p) => p.src === modalImage);
            if (currentIndex > 0) {
              setModalImage(photos[currentIndex - 1].src);
            }
          }}
        >
          <FaArrowLeft />
        </button>

        {/* Optional download button */}
        <a
          href={modalImage}
          download
          className="modal-download-button"
        >
          Download
        </a>
        <button
          className="modal-nav-button right"
          onClick={() => {
            const currentIndex = photos.findIndex((p) => p.src === modalImage);
            if (currentIndex < photos.length - 1) {
              setModalImage(photos[currentIndex + 1].src);
            }
          }}
        >
          <FaArrowRight />
        </button>
        {/* Close button */}
        <button className="close-button" onClick={() => setIsModalOpen(false)}>
          ×
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
