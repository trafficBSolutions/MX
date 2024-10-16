import '../css/about.css'
import Header from '../components/headerviews/HeaderAbout'
import images from '../utils/dynamicImportImages';
const About = () => {
    return (
        <div>
            <Header/>
            <main className="about-us-mx">
            <div className="material-image">
          <img className="material-img" alt="Material WorX logo" src={images["../assets/MX Logos/Material WorX.svg"].default} />
        </div>
        <div className="material-about-container">
          <div className="about">
          <h1 className="about-page-heading">ABOUT US</h1>
          </div>
          </div>
          <div className="about-main">
            <div className="mission">
                <h1 className="mission-statement">MISSION STATEMENT</h1>
                <p className="about-para">
                At Material WorX, we are dedicated to transforming creative visions into tangible, high-quality products. Specializing in custom signage, 
                decals, banners, apparel, window treatments, and fleet graphics, we deliver precision-crafted solutions that amplify your 
                brand and elevate any space. Whether it's for personal expression or professional branding, we are committed to 
                providing innovative designs with a focus on quality, durability, and customer satisfaction, ensuring every project is as unique as the people behind it.
                </p>
            </div>
            <div className="jobs-done">
                <h1 className="over-job">OVER 200 SUCCESSFUL PROJECTS, SOLIDIFYING OUR REPUTATION FOR EXCELLENCE</h1>
            </div>
            <div className="material-worx-info">
                <h1 className="material-worx-about">Material WorX</h1>
                <p className="material-statement">Material WorX was founded in 2023 by the innovative team behind Traffic & Barrier Solutions, LLC, 
                    to expand their expertise in creating high-quality, custom-branded solutions. At Material WorX, we bring creativity and precision 
                    to a wide range of products, including custom signage, decals, banners, apparel, window frosting and tinting, drywall, concrete, 
                    floor decals, and fleet vehicle graphics. With a foundation built on industry knowledge and a commitment to craftsmanship, 
                    we are dedicated to providing tailored solutions that meet the diverse needs of businesses and individuals alike. 
                    Our mission is to transform everyday materials into powerful, durable branding tools that leave a lasting impression.</p>
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
              <li><a className="footer-material-nav-link-view" href="">About Us</a></li>
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
export default About;
