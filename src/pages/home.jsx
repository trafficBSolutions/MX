import React, { useState } from 'react';
import MXPhotoGallery from '../photogallery/HomeMXgallery';
import Header from '../components/headerviews/HeaderDrop';
import '../css/headerfooter.css';
import '../css/home.css';
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
        <img src={images['../assets/MX Logos/Material WorX.svg'].default} className="material-img" alt="Material WorX logo" />
        </div>
        <div className="material-container">
          <div className="scenes">
          <h1 className="material-page-heading">BEHIND THE SCENES</h1>
          </div>
        <div className="material-video-banner">
            <video className="material-page-video-banner" autoPlay loop muted playsInline>
            <source src={images['../assets/MX Photos/mx pic.mp4'].default} type="video/mp4" /></video>
    <div className="material-name-container">
   
</div>
</div>
          <div className="material-page-banner">
          <h1 className="material-slogan">Where Ideas Meet Ingenuity: Where We Can Make It Happen!</h1>
          <h2 className="material-descript">Welcome to Material WorX, your premier destination for custom signage and apparel solutions! 
          As a leading custom sign shop, we specialize in crafting bespoke signs, decals, stickers, and apparel items such as t-shirts, 
          sweatshirts, and jackets. 
          Utilizing high-quality vinyl and Aluminum Composite Panels, we bring your vision to life with precision and creativity.
          Our diverse range of services extends beyond signage and apparel to include expert window frosting and tinting, ensuring privacy, style, 
          and functionality for your space.</h2>
          </div>
          <section className="section-mx-featured">
          <div className="container">
            <div className="gallery-mx-container">
              <MXPhotoGallery /> {/* Render the photo gallery here */}
            </div>
          </div>
        </section>
          <div className="main-material-container">
          <section className="section-how" id="how">
          <div className="container">
            <span className="subheading">SERVICES</span>
            <h2 className="heading-secondary">
            You can choose from what we do.
            </h2>
          </div>
          <div className="container grid grid--2-cols grid--center-v">
          <div className="custom-signage">
  <div className="step-text-box">
    <p className="step-number">01</p>
    <h3 className="heading-tertiary">CUSTOMIZABLE SIGNAGE</h3>
    <p className="step-description">
    Stand out with custom signage tailored to your business. From design to color, size, and messaging, we create unique signs that
     reflect your brand and vision. Get your personalized sign with a custom quote today! 
    </p>
  </div>

  <div className="step-img-box">
    <div className="img-btn-container">
      <img src={images["../assets/MX Photos/btr.jpg"].default} className="step-sign-img" alt="iPhone app preferences selection screen" />
      <a href="/custom-signs" className="btn btn--full sign-quote">GET A QUOTE FOR SIGNS</a>
    </div>
  </div>
</div>
            <div className="decals-stickers-home">
            <div className="step-text-box">
              <p className="step-number">02</p>
              <h3 className="heading-tertiary">DECALS & STICKERS</h3>
              <p className="step-description">
              Get noticed with custom decals for any surface—vehicles, helmets, windows, and more. Made from high-quality, 
              durable materials, our decals are built to last and make an impact. Contact us for your custom quote today!
              </p>
            </div>
            <div className="step-img-box">
            <div className="img-btn-container">
              <img
                src={images["../assets/MX Photos/jt.jpg"].default}
                className="step-decal-img"
                alt="iPhone app
              meal approving plan screen"
              />
              <a href="/decals-stickers" className="btn btn--full decal-quote">GET A QUOTE FOR DECALS/STICKERS</a>
            </div>
            </div>
            </div>
            <div className="custom-banner">
  <div className="step-text-box">
    <p className="step-number">03</p>
    <h3 className="heading-tertiary">BANNERS</h3>
    <p className="step-description">
    Make a statement with custom banners that stand out. Whether it's for an event, promotion, or announcement, we offer durable materials like vinyl or fabric in any size. 
    Bold graphics and crisp text ensure your message gets noticed. Request your custom quote today!
    </p>
  </div>

  <div className="step-img-box">
    <div className="img-btn-container">
      <img src={images["../assets/MX Photos/Banner BBQ.jpg"].default} className="step-banner-img" alt="iPhone app preferences selection screen" />
      <a href="/banners" className="btn btn--full banner-quote">GET A QUOTE FOR BANNERS</a>
    </div>
  </div>
</div>
<div className="custom-t-shirts">
  <div className="step-text-box">
    <p className="step-number">04</p>
    <h3 className="heading-tertiary">T-SHIRTS SWEATSHIRTS JACKETS</h3>
    <p className="step-description">
    Bring your ideas to life with custom T-shirts and other apparels made to last. Whether it's a logo, graphic, or text,
      we can ensure your apparel stands out with top-tier quality. Get your custom quote today!
    </p>
  </div>

  <div className="step-img-box">
    <div className="img-btn-container">
      <img src={images["../assets/MX Photos/jdf shirt.jpg"].default} className="step-shirt-img" alt="iPhone app preferences selection screen" />
      <a href="/t-shirts-sweatshirts-jackets" className="btn btn--full t-shirt-quote">GET A QUOTE FOR APPAREL</a>
    </div>
  </div>
</div>
<div className="custom-windowing">
  <div className="step-text-box">
    <p className="step-number">05</p>
    <h3 className="heading-tertiary">WINDOW FROSTING VINYL FOR PRIVACY</h3>
    <p className="step-description">
    Enhance privacy without sacrificing natural light with custom window frosting vinyl. Perfect for 
    offices, schools, and homes, it adds a sleek, professional touch while creating private spaces. 
    Ideal for meeting rooms, classrooms, or shower doors—get your privacy solution with a custom quote today!
    </p>
  </div>

  <div className="step-img-box">
    <div className="img-btn-container">
      <img src={images["../assets/MX Photos/WallAndGlass.jpg"].default} className="step-frost-img" alt="iPhone app preferences selection screen" />
      <a href="/window-frost-tint" className="btn btn--full window-quote">GET A QUOTE FOR FROST/TINTING</a>
    </div>
  </div>
</div>
<div className="custom-building-graphics">
  <div className="step-text-box">
    <p className="step-number">06</p>
    <h3 className="heading-tertiary">DYYWALLS FLOORS CONTRETE GRAPHICS</h3>
    <p className="step-description">
    Transform any surface with custom vinyl solutions. From durable, water-resistant floor 
    vinyls to concrete wraps and drywall decals, we offer versatile options for high-traffic areas, outdoor surfaces, 
    and indoor walls. 
    Add unique designs, branding, or graphics that stand out. Request your custom quote today!
    </p>
  </div>

  <div className="step-img-box">
    <div className="img-btn-container">
      <img src={images["../assets/MX Photos/Nance.jpg"].default} className="step-building-img" alt="iPhone app preferences selection screen" />
      <a href="/drywall-floor-concrete" className="btn btn--full building-quote">GET A QUOTE FOR DYYWALLS FLOORS CONTRETE GRAPHICS </a>
    </div>
  </div>
</div>
<div className="custom-fleet-graphics">
  <div className="step-text-box">
    <p className="step-number">07</p>
    <h3 className="heading-tertiary">VEHICLE FLEET AND DECALED GRAPHICS</h3>
    <p className="step-description">
    Turn your vehicles into moving billboards with custom fleet graphics.
     Whether for trucks, vans, or cars, our durable vinyl wraps and decals showcase your brand with bold designs and logos. 
    Boost your visibility and professionalism on the road—get your custom quote today!
    </p>
  </div>

  <div className="step-img-box">
    <div className="img-btn-container">
      <img src={images["../assets/MX Photos/box truck.jpg"].default} className="step-fleet-img" alt="iPhone app preferences selection screen" />
      <a href="/fleet-graphics" className="btn btn--full fleet-quote">GET A QUOTE FOR FLEET GRAPHICS</a>
    </div>
  </div>
</div>
            </div>
        </section>

        <div className="contacting-container">
    <h1 className="contact-materialX">
        Need a Professional Website? Contact Us Today!
    </h1>
    <p className="contact-descript">
        Whether you love the design of this website or need custom development services for your business, we are here to help. Get a modern, responsive, and visually striking website tailored to your needs!
    </p>
    <div className="will-contact-link">
        <h2 className="will-contact">
            Contact William Rowell, Product Designer & MX Website Developer:
        </h2>
        <p className="contact-info">
            <a className="will-phone" href="tel:+17068790106">
                <i className="fas fa-phone"></i> Call or Text: 706-879-0106
            </a> or
            <a className="will-email" href="mailto:tbsolutions9@gmail.com">
                <i className="fas fa-envelope"></i> Email: tbsolutions9@gmail.com
            </a> or
            
        </p>
        <a className="btn home-web-button" href="/new-website">NEW WEBSITE</a>
        <p className="contact-william-info">Material WorX Website Created by William Rowell</p>
    </div>
          </div>
          </div>
        </div>
      </main>
      <footer className="material-footer">
      <div className="social-icons">
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
        <div className="site-material-footer__inner container container--narrow">
          <div className="footer-content">
          <img className="mx-img" alt="TBS logo" src={images["../assets/MX Logos/MX.svg"].default}/>
            <ul className="footer-navigate">
              <li><a className="footer-material-nav-link" href="/about-us">About Us</a></li>
              <li><a className="footer-material-nav-link" href="/blog">Blog</a></li>
              <li><a className="footer-material-nav-link" href="/services">Services</a></li>
              <li><a className="footer-material-nav-link" href="/contact-us">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <div className="statement-box">
              <p className="trademark-warning">
                <b className="warning-trade">WARNING:</b><b> Trademark Notice</b><img className="trademark-img" src={images["../assets/MX Logos/MX.svg"].default} alt="TBS Logo"></img> is a registered trademark of Traffic & Barrier Solutions, LLC. 
                Unauthorized use of this logo is strictly prohibited and may result in legal action. 
                All other trademarks, logos, and brands are the property of their respective owners.
              </p>
            </div>
            <h1 className="footer-number" href="tel:+17062630175">706-263-0175</h1>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
