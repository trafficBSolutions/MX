import '../css/services.css'
import Header from '../components/headerviews/HeaderService'

const Service = () => {
    return (
        <div>
            <Header/>
            <main className="service-main">
            <div className="material-image">
          <img className="material-img" alt="Material WorX logo" src="../public/MX Photos/material worx.png" />
        </div>
        <div className="material-service-container">
          <div className="service">
          <h1 className="service-page-heading">Services</h1>
          </div>
          </div>
          <div className="material-services-buttons">
          <div className="signs-button">
            <a href="/custom-signs" className="custom-sign-service-button" type="button">
                    <img src="../public/service image buttons/sign.svg" alt="Custom Signage Icon" className="sign-icon" />
                <span> CUSTOMIZABLE SIGNAGE</span>
            </a>
        </div>
            <div className="decals-stickers-button">
                <a href="/decals-stickers" className="decals-stickers-service-button">
                <img src="../public/service image buttons/decal.svg" className="decal-icon"></img>
                <span>DECALS & STICKERS</span>
                </a>
            </div>
            <div className="banner-button">
                <a href="/banners" className="banner-service-button">
                <img src="../public/service image buttons/banner.svg" className="banner-icon"></img>
                <span>BANNERS</span>
                </a>
            </div>
            <div className="t-shirt-button">
                <a href="/t-shirts-sweatshirts-jackets" className="t-shirt-service-button">
                <img src="../public/service image buttons/t-shirt.svg" className="shirt-icon"></img>
                <span>T-SHIRTS SWEATSHIRTS JACKETS</span>
                </a>
            </div>
            <div className="window-button">
                <a href="/window-frost-tint" className="window-service-button">
                <img src="../public/service image buttons/window.svg" className="window-icon"></img>
                <span>WINDOW FROSTING & TINTING</span>
                </a>
            </div>
            <div className="drywall-button">
                <a href="/drywall-floor-concrete" className="drywall-service-button">
                <img src="../public/service image buttons/wall.svg" className="drywall-icon"></img>
                <span>DRYWALL FLOOR & CONCRETE DECALS</span>
                </a>
            </div>
            <div className="fleet-graphic-button">
                <a href="/fleet-graphics" className="fleet-service-button">
                <img src="../public/service image buttons/box truck.svg" className="fleet-icon"></img>
                <span>VEHICLE FLEET & DECALED GRAPHICS</span></a>
            </div>
          </div>
          <div className="service-note-container">
            <div className="service-note">
  <h1 className="service-question">Looking for Highly Experienced Sign Services?</h1>
  <p className="service-description">
    At Material WorX, we have brought over 200 jobs of expertise in crafting high-quality, custom signage solutions. 
    Whether you need eye-catching outdoor signs, impactful indoor displays, or specialized decals, our team ensures precision, durability,
    and vibrant designs that reflect your brand's vision. Trust us to deliver on time, every time, with 
    a commitment to excellence and customer satisfaction.
  </p>
  <p className="service-contact">Click any of the buttons above to learn more about our sign shop services.
    Please contact us if you have any questions or concerns at <a href="tel:+17062630175">(706) 263-0175</a> or <a href="mailto:tbsolutions1999@gmail.com">tbsolutions1999@gmail.com</a>
  </p>
  </div>
  <section className="image-service-section">
    <div className="working-img-two">
      <img alt="services" className="working-two" src="../public/MX Photos/calhoun.jpg" />
    </div>
  </section>
</div>
<section className="logo-design-section">
    <h1 className="logo-new">New Logo?</h1>
    <div className="new-logo-para">
        <p className="new-logo-description"></p>
    </div>
    <a href="/new-logo" className="new-logo-button">New Logo</a>
</section>

            </main>
            
        <footer className="material-footer">
      <div className="social-icons">
                <a className="social-icon" href="https://www.facebook.com/tbssigns2022/" target="_blank" rel="noopener noreferrer">
                    <img className="facebook-img" src="../public/social media/facebook.png" alt="Facebook" />
                </a>
                <a className="social-icon" href="https://www.tiktok.com/@tbsmaterialworx?_t=8lf08Hc9T35&_r=1" target="_blank" rel="noopener noreferrer">
                    <img className="tiktok-img" src="../public/social media/tiktok.png" alt="TikTok" />
                </a>
                <a className="social-icon" href="https://www.instagram.com/tbsmaterialworx?igsh=YzV4b3doaTExcjN4&utm_source=qr" target="_blank" rel="noopener noreferrer">
                    <img className="insta-img" src="../public/social media/instagram.png" alt="Instagram" />
                </a>
            </div>
        <div className="site-material-footer__inner container container--narrow">
          <div className="footer-content">
            <img className="mx-img" alt="TBS logo" src="../public/MX Photos/MX-removebg-preview.png" />
            <ul className="footer-navigate">
              <li><a className="footer-material-nav-link" href="/about-us">About Us</a></li>
              <li><a className="footer-material-nav-link" href="/pay-invoice">Pay Invoice</a></li>
              <li><a className="footer-material-nav-link-view" href="">Services</a></li>
              <li><a className="footer-material-nav-link" href="/contact-us">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <div className="statement-box">
              <p className="trademark-warning">
                <b className="warning-trade">WARNING:</b><b> Trademark Notice</b><img className="trademark-img" src="../public/MX Photos/MX-removebg-preview.png" alt="TBS Logo"></img> is a registered trademark of Traffic & Barrier Solutions, LLC. 
                Unauthorized use of this logo is strictly prohibited and may result in legal action. 
                All other trademarks, logos, and brands are the property of their respective owners.
              </p>
            </div>
            <h1 className="footer-number" href="tel:+17062630175">706-263-0175</h1>
          </div>
        </div>
      </footer>
      </div>
    )
}
export default Service;
