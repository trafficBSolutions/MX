import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import images from '../utils/dynamicImportImages';

const photos = [
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
        src: images['family.jpg'], 
        height: 4032, 
        width: 3024, 
        },
        {
    src: images['Crossfit Rowing.jpg'],
    height: 4032,
    width: 3024
  },    
  {
    src: images['Crossfit Rowing2.jpg'],
    height: 4032,
    width: 3024
  },
    {
    src: images['window.jpg'],
    height: 4032,
    width: 3024
  },  
      {
    src: images['family2.jpg'],
    height: 4032,
    width: 3024
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
    src: images['wheeler.jpg'],
    width: 4032,
    height: 3024
  },
            {
    src: images['wheeler2.jpg'],
    width: 4032,
    height: 3024
  },
            {
    src: images['wheeler3.jpg'],
    width: 4032,
    height: 3024
  },
            {
    src: images['wheeler4.jpg'],
    width: 4032,
    height: 3024
  },
          {
    src: images['van.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['van2.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['van3.jpg'],
    width: 4032,
    height: 3024
  },
    {
    src: images['miniTruck.jpg'],
    width: 4032,
    height: 3024
  },
      {
    src: images['miniTruck2.jpg'],
    width: 4032,
    height: 3024
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
        { src: images['gccoc3.jpg'], height: 4032, width: 3024, alt: 'CrossFit Chrome' },
   { 
        src: images['peel4.jpg'], 
        height: 4032, 
        width: 3024, 
        },
      { 
        src: images['peel5.jpg'], 
        height: 4032, 
        width: 3024, 
        },
      { 
        src: images['peel6.jpg'], 
        height: 4032, 
        width: 3024, 
        },
      { 
        src: images['peel7.jpg'], 
        height: 4032, 
        width: 3024, 
        },
      { 
        src: images['peel8.jpg'], 
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
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['cnc2.jpg'], 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['cnc3.jpg'], 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['cnc4.jpg'], 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['cnc5.jpg'], 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['cola.jpg'], 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['peel.jpg'], 
        height: 4032, 
        width: 3024, 
        },
   
   { 
        src: images['peel2.jpg'], 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['peel3.jpg'], 
        height: 4032, 
        width: 3024, 
        },
    { 
        src: images['complete.jpg'], 
        height: 4032, 
        width: 3024, 
        },
    { 
        src: images['complete2.jpg'], 
        height: 4032, 
        width: 3024, 
        },
    { 
        src: images['complete3.jpg'], 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['yancey.jpg'], 
        height: 4032, 
        width: 3024, 
        },
   { 
        src: images['jcmural.jpg'], 
        height: 4032, 
        width: 3024, 
        },
  { src: images['jcmural2.jpg'], height: 4032, width: 3024, alt: 'Cinderblock' },
  { src: images['jcmural3.jpg'], height: 4032, width: 3024, alt: 'Cinderblock' },
   {
    src: images['fleet.jpg'],
    width: 4032,
    height: 3024
  },
{
    src: images['fleet2.jpg'],
    width: 4032,
    height: 3024
  },
   {
    src: images['fleet3.jpg'],
    width: 4032,
    height: 3024
  },
   {
    src: images['tint5.jpg'],
    width: 4032,
    height: 3024
  },
   {
    src: images['tint6.jpg'],
    width: 4032,
    height: 3024
  },
        {
    src: images['bike.jpg'],
    width: 1599,
    height: 702
  },
      {
    src: images['bike2.jpg'],
    width: 1599,
    height: 702
  },
    {
    src: images['cone decals.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['cones & stick decals.jpg'],
    width: 1599,
    height: 702
  },
   {
    src: images['sky.jpg'],
    width: 1599,
    height: 702
  },
          {
    src: images['sky3.jpg'],
    width: 1599,
    height: 702
  },
          {
    src: images['sky4.jpg'],
    width: 1599,
    height: 702
  },
          {
    src: images['sky5.jpg'],
    width: 1599,
    height: 702
  },
  {
    src: images['sky2.jpg'],
    width: 4032,
    height: 3024
  },
    {
    src: images['dirt bike.jpg'],
    width: 1599,
    height: 702
  },
        {
    src: images['cubano.jpg'],
    width: 4032,
    height: 3024
  },
      {
    src: images['cubano2.jpg'],
    width: 4032,
    height: 3024
  },
   {
    src: images['Banner BBQ.jpg'],
    width: 960,
    height: 720
  },
  {
    src: images['mallory.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['mallory2.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['danco Trailer.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['Nance.jpg'],
    width: 2048,
    height: 1536
  },
  {
    src: images['Nance 2.jpg'],
    width: 2048,
    height: 1536
  },
  {
    src: images['jt.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['magnets.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['mr.jpg'],
    width: 2048,
    height: 1536
  },
  {
    src: images['mr2.jpg'],
    width: 2048,
    height: 1536
  },
  {
    src: images['mr3.jpg'],
    width: 2048,
    height: 1536
  },
  {
    src: images['homesolution.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['box truck.jpg'],
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
    src: images['signs and barrels.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['trinity.jpg'],
    width: 4032,
    height: 3024
  },
  {
    src: images['muse.jpg'],
    width: 1599,
    height: 702
  },
  {
    src: images['muse2.jpg'],
    width: 1599,
    height: 702
  },
  {
    src: images['muse3.jpg'],
    width: 1599,
    height: 702
  },
  {
    src: images['unified trailer.jpg'],
    width: 1599,
    height: 702
  },
  {
    src: images['hood wrap.jpg'],
    width: 1599,
    height: 702
  },
  {
    src: images['jdf shirt.jpg'],
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
            <img src={photo.src} alt={`Home result ${index + 1}`} />
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
