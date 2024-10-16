import React from 'react';
import '../css/error.css';
import '../css/headerfooter.css';
import Header from '../components/headerviews/HeaderError';
import images from '../utils/dynamicImportImages';
const Error = () => {
    return (
        <div>
            <Header/>
            <main>
                <div className="error-container">
                    <div className="error-content">
                        <div className="error-content-inner">
                        <img src={images["../assets/MX Logos/Material WorX.svg"].default} alt="TBS Logo" className="error-logo" />
                        </div>
                        <div className="error-content-inn">
                        <h1 className="NotFound">404 - Page Not Found</h1>
                        <p className="error-info">
                        The page you are looking for might have been removed, had its name changed, or does not exist.
                        </p>
                        </div>
                        </div>
                        <a href="/" className="btn -- error-link">Go back to the homepage</a>
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
    )
}
export default Error;
