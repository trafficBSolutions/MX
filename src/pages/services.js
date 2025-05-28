import '../css/services.css'
import Header from '../components/headerviews/HeaderService'
import images from '../utils/dynamicImportImages'
const Service = () => {
    return (
        <div>
            <Header/>
            <main className="service-main">
            <div className="material-video-banner">
    <video className="material-page-video-banner" autoPlay loop muted playsInline>
        <source src={images['../assets/MX Photos/mx pic.mp4'].default} type="video/mp4" />
    </video>
    <div className="material-name-container">
        <img src={images['../assets/MX Logos/Material WorX.svg'].default} alt="Material WorX Logo" />
    </div>
</div>
        <div className="material-service-container">
          <div className="service">
          <h1 className="service-page-heading">SERVICES</h1>
          </div>
          </div>
          <div className="section-container service-note-container">
  <div className="section-text">
    <h1 className="service-question">Looking for Highly Experienced Sign Services?</h1>
    <p className="service-description">
      At Material WorX, we bring expertise in crafting custom signage solutions.
      From outdoor signs to decals, we ensure precision, durability, and vibrant designs. 
      Trust us to deliver on time with a commitment to excellence.
    </p>
    <p className="service-contact">
      Contact us at <a href="tel:+17062630175">(706) 263-0175</a> or <a href="mailto:tbsolutions1999@gmail.com">tbsolutions1999@gmail.com</a>
    </p>
  </div>
  <img className="service-img" src={images["../assets/MX Photos/calhoun.jpg"].default} alt="Material WorX" />
</div>
<div className="material-services-buttons">
  <h1 className="service-button-heading">CHOOSE YOUR CUSTOM SIGN SHOP ITEM</h1>
          <div className="signs-button">
            <a href="/custom-signs" className="custom-sign-service-button" type="button">
                    <img src={images["../assets/service image buttons/sign.svg"].default} alt="Custom Signage Icon" className="sign-icon" />
                <span className="sign-span-service"> CUSTOMIZABLE SIGNAGE</span>
            </a>
        </div>
            <div className="decals-stickers-button">
                <a href="/decals-stickers" className="decals-stickers-service-button">
                <img src={images["../assets/service image buttons/decal.svg"].default} className="decal-icon"></img>
                <span>DECALS & STICKERS</span>
                </a>
            </div>
            <div className="banner-button">
                <a href="/banners" className="banner-service-button">
                <img src={images["../assets/service image buttons/banner.svg"].default} className="banner-icon"></img>
                <span>BANNERS</span>
                </a>
            </div>
            <div className="t-shirt-button">
                <a href="/t-shirts-sweatshirts-jackets" className="t-shirt-service-button">
                <img src={images["../assets/service image buttons/t-shirt.svg"].default} className="shirt-icon"></img>
                <span>T-SHIRTS SWEATSHIRTS JACKETS</span>
                </a>
            </div>
            <div className="window-button">
                <a href="/window-frost-tint" className="window-service-button">
                <img src={images["../assets/service image buttons/window.svg"].default} className="window-icon"></img>
                <span>WINDOW FROSTING & TINTING</span>
                </a>
            </div>
            <div className="drywall-button">
                <a href="/drywall-floor-concrete" className="drywall-service-button">
                <img src={images["../assets/service image buttons/wall.svg"].default} className="drywall-icon"></img>
                <span>DRYWALL FLOOR & CONCRETE DECALS</span>
                </a>
            </div>
            <div className="fleet-graphic-button">
                <a href="/fleet-graphics" className="fleet-service-button">
                <img src={images["../assets/service image buttons/box truck.svg"].default} className="fleet-icon"></img>
                <span>VEHICLE FLEET & DECALED GRAPHICS</span></a>
            </div>
          </div>
<div className="section-container logo-design-section">
  <img src={images["../assets/service image buttons/new logo symbol.svg"].default} className="new-logo-img"alt="Logo Design" />
  <div className="section-text">
    <h1 className="logo-new">Need a New Logo?</h1>
    <p className="new-logo-description">
      Our team creates unique logos that represent your brand’s identity. Let us design a logo that captures your brand's vision.
    </p>
    <a href="/new-logo" className="action-button">Get a New Logo</a>
  </div>
</div>

<div className="section-container web-design-section">
  <div className="section-text">
    <h1 className="web-design-title">Need a New Website?</h1>
    <p className="web-design-description">
      We create custom websites tailored to your business. Tired of Wix? Upgrade to a fully-coded site with more features.
    </p>
    <a href="/new-website" className="action-button">Get a New Website</a>
  </div>
  <img src={images["../assets/service image buttons/mern.svg"].default} alt="Web Design" />
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
      <li><a className="footer-material-nav-link-view" href="">Services</a></li>
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
    )
}
export default Service;
