import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import images from '../utils/dynamicImportImages';
const photos = [
 { 
        src: images['noah.jpg'], 
        height: 4032, 
        width: 3024, 
        },
        { 
        src: images['noah2.jpg'], 
        height: 4032, 
        width: 3024, 
        },
        { 
        src: images['baps.jpg'], 
        height: 4032, 
        width: 3024, 
        },{ 
        src: images['baps2.jpg'], 
        height: 4032, 
        width: 3024, 
        },{ 
        src: images['baps3.jpg'], 
        height: 4032, 
        width: 3024, 
        },
        { 
        src: images['ladyjackets.jpg'], 
        height: 4032, 
        width: 3024, 
        },
  { 
        src: images['furs by farrow.jpg'], 
        height: 4032, 
        width: 3024, 
        },
  { 
        src: images['therising.jpg'], 
        height: 4032, 
        width: 3024, 
        },
        { 
        src: images['therising2.jpg'], 
        height: 4032, 
        width: 3024, 
        },
        { 
        src: images['therising3.jpg'], 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['acrylic.jpg'], 
        height: 4032, 
        width: 3024, 
        },
 { 
        src: images['acrylic2.jpg'], 
        height: 4032, 
        width: 3024, 
        },
           { 
        src: images['acrylic3.jpg'], 
        height: 4032, 
        width: 3024, 
        },
  { 
        src: images['hangsign.jpg'], 
        height: 4032, 
        width: 3024, 
        },
 { 
        src: images['mr4.jpg'], 
        height: 4032, 
        width: 3024, 
        },
           { 
        src: images['mr5.jpg'], 
        height: 4032, 
        width: 3024, 
        },
        { 
        src: images['mr6.jpg'], 
        height: 4032, 
        width: 3024, 
        },
        { 
        src: images['mr7.jpg'], 
        height: 4032, 
        width: 3024, 
        },
       { 
        src: images['church.jpg'], 
        height: 4032, 
        width: 3024, 
        },
               { 
        src: images['church2.jpg'], 
        height: 4032, 
        width: 3024, 
        },
     { 
        src: images['gccoc.jpg'], 
        height: 4032, 
        width: 3024, 
        },
             { 
        src: images['gccoc2.jpg'], 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['peel4.jpg'], 
        height: 4032, 
        width: 3024, 
        },
      { 
        src: images['ch.jpg'], 
        height: 4032, 
        width: 3024, 
        },
    { 
        src: images['ch2.jpg'], 
        height: 4032, 
        width: 3024, 
        },
    { 
        src: images['ch3.jpg'], 
        height: 4032, 
        width: 3024, 
        },
    { 
        src: images['ch4.jpg'], 
        height: 4032, 
        width: 3024, 
        },
    { 
        src: images['ch5.jpg'], 
        height: 4032, 
        width: 3024, 
        },
  {
    src: images['cnc.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['cnc2.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['cnc3.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['cnc4.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['cnc5.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['cola.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['peel.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['peel2.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['peel3.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['complete.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['complete2.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['complete3.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['church table.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['church signs.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['shaw.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['btr.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['trinity.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['signs and barrels.jpg'],
    width: 4032,
    height: 3024
  },
    {
    src: images['sky2.jpg'],
    width: 4032,
    height: 3024
  },
];
export default function MXSignGallery() {
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
            <img src={photo.src} alt={`Sign result ${index + 1}`} />
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
