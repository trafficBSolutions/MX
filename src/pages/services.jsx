import '../css/services.css'
import Header from '../components/headerviews/HeaderService'

const Service = () => {
    return (
        <div>
            <Header/>
            <main className="service-main">
            <div className="material-image">
            <img className="material-img" alt="Material WorX logo" src="../public/MX Logos/Material WorX.svg" />
        </div>
        <div className="material-service-container">
          <div className="service">
          <h1 className="service-page-heading">SERVICES</h1>
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
  <p className="service-contact">Click any of the buttons below to learn more about our sign shop services.
    Please contact us if you have any questions or concerns at <a href="tel:+17062630175">(706) 263-0175</a> or <a href="mailto:tbsolutions1999@gmail.com">tbsolutions1999@gmail.com</a>
  </p>
  <div className="material-services-buttons">
          <div className="signs-button">
            <a href="/custom-signs" className="custom-sign-service-button" type="button">
                    <img src="../public/service image buttons/sign.svg" alt="Custom Signage Icon" className="sign-icon" />
                <span className="sign-span-service"> CUSTOMIZABLE SIGNAGE</span>
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
  </div>
  <section className="image-service-section">
    <div className="working-img-two">
      <img alt="services" className="working-two" src="../public/MX Photos/calhoun.jpg" />
    </div>
  </section>
</div>
<section className="logo-design-section">
<div className="new-logo-img-container">
      <img alt="services" className="new-logo-img" src="../public/service image buttons/new logo symbol.svg" />
    </div>
<div className="new-logo-para">
<h1 className="logo-new">Need a New Logo?</h1>
        <p className="new-logo-description">
        Our team can 
      create a unique and memorable logo that represents your brand's identity.
      We offer a range of logo design services, including custom logo design, logo revisions, and logo branding.
      Our team will work closely with you to understand your brand's values and goals, and create a logo that reflects your brand's personality and message.
      We use the latest design tools and techniques to create a logo that is both visually appealing and effective in representing your brand.
        </p>
        <div className="new-logo-button-container">
    <a href="/new-logo" className="new-logo-button">New Logo</a>
    </div>
    </div>
</section>
<section className="web-design-section">
      <div className="web-design-container">
        <div className="web-design-text">
          <h1 className="web-design-title">Need a New Website?</h1>
          <p className="web-design-description">
            Our web developer and graphic designer: William Rowell can create a custom website that is tailored to your business's needs and goals.
            We offer a range of website design services, including website design, website development, and website maintenance.
            Our team will work closely with you to understand your business's needs and goals, and create a website that is both visually appealing and effective in representing your business.
            We use the latest design tools and techniques to create a website that is both visually appealing and effective in representing your business.
            </p>
            <p className="web-wix-tease">Tired of a simple bland Wix website with not many user friendly features?
              We can upgrade your website from Wix to a hard coded and better CSS styled website that is more user friendly with coded Backend Programming and has more features than Wix.
              If you have a Wix website and want to upgrade it to what websites were meant to be before Wix came out, contact us today!
            </p>
            </div>
            <div className="web-design-button-container">
              <a href="/new-website" className="web-design-button">Get a New Website</a>
              </div>
      </div>
      <div className="web-design-img-container">
        <img alt="services" className="web-design-img" src="../public/service image buttons/mern.svg" />
      </div>
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
          <img className="mx-img" alt="TBS logo" src="../public/MX Logos/MX.svg"/>
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
                <b className="warning-trade">WARNING:</b><b> Trademark Notice</b><img className="trademark-img" src="../public/MX Logos/MX.svg" alt="TBS Logo"></img> is a registered trademark of Traffic & Barrier Solutions, LLC. 
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
