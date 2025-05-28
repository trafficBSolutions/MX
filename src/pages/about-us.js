import '../css/about.css'
import Header from '../components/headerviews/HeaderAbout'
import images from '../utils/dynamicImportImages';
import '../css/headerfooter.css';
const About = () => {
    return (
        <div>
            <Header/>
            <main className="about-us-mx">
            <div className="material-video-banner">
    <video className="material-page-video-banner" autoPlay loop muted playsInline>
        <source src={images['mx pic.mp4']} type="video/mp4" />
    </video>
    <div className="material-name-container">
        <img src={images['Material WorX.svg']} alt="Material WorX Logo" />
    </div>
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
  <div className="site-material-footer__inner">
    <img className="mx-img" alt="TBS logo" src={images["MX Tan.svg"]} />
    <div className="footer-navigation-content">
      <h2 className="footer-title">Navigation</h2>
    <ul className="footer-navigate">
      <li><a className="footer-material-nav-link-view" href="">About Us</a></li>
      <li><a className="footer-material-nav-link" href="/new-logo">New Logos</a></li>
      <li><a className="footer-material-nav-link" href="/services">Services</a></li>
      <li><a className="footer-material-nav-link" href="/new-website">Websites</a></li>
      <li><a className="footer-material-nav-link" href="/contact-us">Contact Us</a></li>
    </ul>
    </div>
    <div className="footer-contact">
      <h2 className="footer-title">Contact</h2>
      <p className="contact-info">
        <a className="will-phone" href="tel:+17062630175">Call: (706) 263-0175</a>
        <a className="will-email" href="mailto: tbsolutions1999@gmail.com">Email: tbsolutions1999@gmail.com</a>
        <a className="will-address" href="https://www.google.com/maps/place/Traffic+%26+Barrier+Solutions%2FMaterial+WorX+Sign+Shop/@34.5115302,-84.9476215,94m/data=!3m1!1e3!4m6!3m5!1s0x886007df83843f3b:0x84510d87790af625!8m2!3d34.5117917!4d-84.948025!16s%2Fg%2F11l28zhlzt?entry=ttu&g_ep=EgoyMDI0MDkyNC4wIKXMDSoASAFQAw%3D%3D"
      >
        723 N. Wall St, Calhoun, GA, 30701</a>
      </p>
    </div>

    <div className="social-icons">
      <h2 className="footer-title">Follow Us</h2>
      <a className="social-icon" href="https://www.facebook.com/tbssigns2022/" target="_blank" rel="noopener noreferrer">
        <img className="facebook-img" src={images["facebook.png"]} alt="Facebook" />
      </a>
      <a className="social-icon" href="https://www.tiktok.com/@tbsmaterialworx?_t=8lf08Hc9T35&_r=1" target="_blank" rel="noopener noreferrer">
        <img className="tiktok-img" src={images["tiktok.png"]} alt="TikTok" />
      </a>
      <a className="social-icon" href="https://www.instagram.com/tbsmaterialworx?igsh=YzV4b3doaTExcjN4&utm_source=qr" target="_blank" rel="noopener noreferrer">
        <img className="insta-img" src={images["instagram.png"]} alt="Instagram" />
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
export default About;
