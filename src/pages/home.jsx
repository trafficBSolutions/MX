import React, { useState } from 'react';
import MXPhotoGallery from '../photogallery/HomeMXgallery';
import Header from '../components/headerviews/HeaderDrop';
import '../css/headerfooter.css';
import '../css/home.css';
import MapInvoiceComponent from '../components/GoogleMaps';
import images from '../utils/dynamicImportImages'; // Import the dynamic image loader
const Home = () => {
  const [isSignDropdownOpen, setIsSignDropdownOpen] = useState(false);
  const [isDecalDropdownOpen, setIsDecalDropdownOpen] = useState(false);
  const [isBannerDropdownOpen, setIsBannerDropdownOpen] = useState(false);
  const [isTShirtDropdownOpen, setIsTShirtDropdownOpen] = useState(false);
  const [isWindowFrostDropdownOpen, setIsWindowFrostDropdownOpen] = useState(false);
  const [isDrywallDropdownOpen, setIsDrywallDropdownOpen] = useState(false);
  const [isFleetDropdownOpen, setIsFleetDropdownOpen] = useState(false);

  const toggleSignDropdown = () => {
    setIsSignDropdownOpen(!isSignDropdownOpen);
  };

  const closeSignDropdown = () => {
    setIsSignDropdownOpen(false);
  };

  const toggleDecalDropdown = () => {
    setIsDecalDropdownOpen(!isDecalDropdownOpen);
  };

  const closeDecalDropdown = () => {
    setIsDecalDropdownOpen(false);
  };

  const toggleBannerDropdown = () => {
    setIsBannerDropdownOpen(!isBannerDropdownOpen);
  };

  const closeBannerDropdown = () => {
    setIsBannerDropdownOpen(false);
  };

  const toggleTShirtDropdown = () => {
    setIsTShirtDropdownOpen(!isTShirtDropdownOpen);
  };

  const closeTShirtDropdown = () => {
    setIsTShirtDropdownOpen(false);
  };

  const toggleWindowFrostDropdown = () => {
    setIsWindowFrostDropdownOpen(!isWindowFrostDropdownOpen);
  };

  const closeWindowFrostDropdown = () => {
    setIsWindowFrostDropdownOpen(false);
  };

  const toggleDrywallDropdown = () => {
    setIsDrywallDropdownOpen(!isDrywallDropdownOpen);
  };

  const closeDrywallDropdown = () => {
    setIsDrywallDropdownOpen(false);
  };
  const toggleFleetDropdown = () => {
    setIsFleetDropdownOpen(!isFleetDropdownOpen);
  };
  const closeFleetDropdown = () => {
    setIsFleetDropdownOpen(false);
  };


  return (
    <div>
      <Header />
      <main className="material-main">
        <div className="material-image">
          <div className="material-video-banner">
    <video className="material-page-video-banner" autoPlay loop muted playsInline>
        <source src={images['../assets/MX Photos/mx pic.mp4'].default} type="video/mp4" />
    </video>
    <div className="material-name-container">
        <img src={images['../assets/MX Logos/Material WorX.svg'].default} alt="Material WorX Logo" />
    </div>
</div>
          <div className="material-page-banner">
          <h1 className="material-slogan">Where Ideas Meet Ingenuity: Where We Can Make It Happen!</h1>
          <h2 className="material-descript">At Material WorX, 
            we bring your vision to life with custom signs, decals, 
            stickers, and apparel like t-shirts, jackets, and more. Our high-quality materials, including durable vinyl and Aluminum Composite Panels, ensure every project is built to last. We also offer professional window frosting and tinting to enhance both privacy and style. Let us handle your next project with creativity, precision, and fast, 
            reliable service. Ready to make your idea happen? Contact us today!</h2>
          </div>
          
          <section className="section-mx-featured">
          <div className="container">
            <div className="gallery-mx-container">
              <MXPhotoGallery /> {/* Render the photo gallery here */}
            </div>
          </div>
        </section>
          <div className="main-material-container">
        <div className="material-background">
          <section className="section-how" id="how">
          <div className="container">
            <span className="subheading">SERVICES</span>
            <h2 className="heading-secondary">
            You can choose from what we do.
            </h2>
          </div>
          <div className="material-logo-buttons">
          <div className="signs-button">
            <a href="/custom-signs" className="custom-sign-logo-button" type="button">
                    <img src={images["../assets/service image buttons/sign.svg"].default} alt="Custom Signage Icon" className="sign-icon" />
                <span> CUSTOMIZABLE SIGNAGE</span>
            </a>
        </div>
            <div className="decals-stickers-button">
                <a href="/decals-stickers" className="decals-stickers-logo-button">
                <img src={images["../assets/service image buttons/decal.svg"].default} className="decal-icon"></img>
                <span>DECALS & STICKERS</span>
                </a>
            </div>
            <div className="banner-button">
                <a href="/banners" className="banner-logo-button">
                <img src={images["../assets/service image buttons/banner.svg"].default} className="banner-icon"></img>
                <span>BANNERS</span>
                </a>
            </div>
            <div className="t-shirt-button">
                <a href="/t-shirts-sweatshirts-jackets" className="t-shirt-logo-button">
                <img src={images["../assets/service image buttons/t-shirt.svg"].default} className="shirt-icon"></img>
                <span>T-SHIRTS SWEATSHIRTS JACKETS</span>
                </a>
            </div>
            <div className="window-button">
                <a href="/window-frost-tint" className="window-logo-button">
                <img src={images["../assets/service image buttons/window.svg"].default} className="window-icon"></img>
                <span>WINDOW FROSTING & TINTING</span>
                </a>
            </div>
            <div className="drywall-button">
                <a href="/drywall-floor-concrete" className="drywall-logo-button">
                <img src={images["../assets/service image buttons/wall.svg"].default} className="drywall-icon"></img>
                <span>DRYWALL FLOOR & CONCRETE DECALS</span>
                </a>
            </div>
            <div className="fleet-graphic-button">
                <a href="/fleet-graphics" className="fleet-logo-button">
                <img src={images["../assets/service image buttons/box truck.svg"].default} className="fleet-icon"></img>
                <span>VEHICLE FLEET & DECALED GRAPHICS</span></a>
            </div>
          </div>
        </section>
        </div>
        <div className="material-installation">
    <h2>Installation & Maintenance</h2>
    <div className="services">
        <div className="installation">
            <h3>Sign Installation</h3>
            <p>We offer professional installation services for all your signage needs. Whether it's window frosting, vehicle wraps, banners, or large outdoor signs, our team ensures a flawless installation.</p>
            <ul>
                <li>Vehicle Graphics & Wraps</li>
                <li>Banners & Signage</li>
                <li>Window Tinting & Frosting</li>
                <li>Wall & Floor Decals</li>
                <li>Indoor and Outdoor Signage</li>
            </ul>
        </div>
        <div className="maintenance">
            <h3>Maintenance & Repair</h3>
            <p>Keep your signage looking as good as new with our maintenance and repair services. We offer regular cleaning, touch-ups, and replacements to maintain your sign's longevity.</p>
            <ul>
                <li>Regular Cleaning & Upkeep</li>
                <li>Replacement of Damaged Signs</li>
                <li>Graphic Touch-Ups & Replacements</li>
                <li>Signage Reinstallation</li>
            </ul>
        </div>
    </div>
</div>

<div className="contacting-container">
<div className="material-flexing">
  <h1 className="contact-materialX">Let's Build Your Dream Website!</h1>
  <p className="contact-descript">
    Looking for a modern, responsive website? Let's collaborate and bring your vision to life.
  </p>
  <div className="will-contact-link">
    <h2 className="will-contact">Contact William Rowell</h2>
    <p className="contact-info">
      <a className="will-phone" href="tel:+17068790106">
        <i className="fas fa-phone"></i> Call or Text: 706-879-0106
      </a>
      <span> or </span>
      <a className="will-email" href="mailto:tbsolutions9@gmail.com">
        <i className="fas fa-envelope"></i> Email: tbsolutions9@gmail.com
      </a>
    </p>
    <a className="btn home-web-button" href="/new-website">Get Started</a>
  </div>
</div>
<div className="google-map-home">
<MapInvoiceComponent/>
</div>
</div>
          </div>
        </div>
      </main>
      <footer className="material-footer">
  <div className="site-material-footer__inner">
    <img className="mx-img" alt="TBS logo" src={images["../assets/MX Logos/MX.svg"].default} />
    
    <div className="footer-navigation-content">
      <h2 className="footer-title">Navigation</h2>
      <ul className="footer-navigate">
        <li><a className="footer-material-nav-link" href="/about-us">About Us</a></li>
        <li><a className="footer-material-nav-link" href="/blog">Blog</a></li>
        <li><a className="footer-material-nav-link" href="/services">Services</a></li>
        <li><a className="footer-material-nav-link" href="/contact-us">Contact Us</a></li>
      </ul>
    </div>
    
    <div className="footer-contact">
      <h2 className="footer-title">Contact</h2>
      <p className="contact-info">
        <a className="will-phone" href="tel:+17062630175">Call: 706-263-0175</a>
        <a className="will-email" href="mailto: tbsolutions1999@gmail.com">Email: tbsolutions1999@gmail.com</a>
        <a className="will-address" href="https://www.google.com/maps/place/Traffic+%26+Barrier+Solutions%2FMaterial+WorX+Sign+Shop/@34.5115302,-84.9476215,94m/data=!3m1!1e3!4m6!3m5!1s0x886007df83843f3b:0x84510d87790af625!8m2!3d34.5117917!4d-84.948025!16s%2Fg%2F11l28zhlzt?entry=ttu&g_ep=EgoyMDI0MDkyNC4wIKXMDSoASAFQAw%3D%3D"
        >
          723 N. Wall St, Calhoun, GA, 30701</a>
      </p>
    </div>
    
    <div className="social-icons">
      <h2 className="footer-title">Follow Us</h2>
      <a className="social-icon" href="https://www.facebook.com/tbssigns2022/" target="_blank" rel="noopener noreferrer">
        <img className="facebook-img" src={images["../assets/social media/facebook.png"].default} alt="Facebook" />
      </a>
      <a className="social-icon" href="https://www.tiktok.com/@tbsmaterialworx?_t=8lf08Hc9T35&_r=1" target="_blank" rel="noopener noreferrer">
        <img className="tiktok-img" src={images["../assets/social media/tiktok.png"].default} alt="TikTok" />
      </a>
      <a className="social-icon" href="https://www.instagram.com/tbsmaterialworx?igsh=YzV4b3doaTExcjN4&utm_source=qr" target="_blank" rel="noopener noreferrer">
        <img className="insta-img" src={images["../assets/social media/instagram.png"].default} alt="Instagram" />
      </a>
    </div>
  </div>
  
</footer>
<div className="footer-copyright">
      <p className="footer-copy-p">&copy; 2025 Traffic & Barrier Solutions, LLC/Material WorX - 
        Website MERN Stack Coded & Deployed by <a className="footer-face"href="https://www.facebook.com/will.rowell.779" target="_blank" rel="noopener noreferrer">William Rowell</a> - All Rights Reserved.</p>
    </div>
    </div>
  );
};

export default Home;
