import '../css/blog.css';
import Header from '../components/headerviews/HeaderBlog';
import images from '../utils/dynamicImportImages';
const Blog = () => {
    return (
        <div>
            <Header />
            <main className="blog-main">
            <div className="material-video-banner">
    <video className="material-page-video-banner" autoPlay loop muted playsInline>
        <source src={images['../assets/MX Photos/mx pic.mp4'].default} type="video/mp4" />
    </video>
    <div className="material-name-container">
        <img src={images['../assets/MX Logos/Material WorX.svg'].default} alt="Material WorX Logo" />
    </div>
</div>
                <div className="material-blog-container">
                    <div className="blog">
                        <h1 className="about-blog-heading">BLOG</h1>
                    </div>
                </div>

                {/* Social Media Links Section */}
                <section className="section-blog">
                    <div className="social-media-container">
                        <h1 className="social-media-heading">
                            See all of our latest jobs 
                            and updates on our social media pages!
                            Follow us on Facebook, TikTok, and Instagram!

                        </h1>
                        <div className="social-links">
                            {/* Facebook */}
                            <a className="social-icon" href="https://www.facebook.com/tbssigns2022/" target="_blank" rel="noopener noreferrer">
                                <img className="facebook-img" src={images["../assets/social media/facebook.png"].default} alt="Facebook" />
                            </a>
                            {/* TikTok */}
                            <a className="social-icon" href="https://www.tiktok.com/@tbsmaterialworx?_t=8lf08Hc9T35&_r=1" target="_blank" rel="noopener noreferrer">
                                <img className="tiktok-img" src={images["../assets/social media/tiktok.png"].default} alt="TikTok" />
                            </a>
                            {/* Instagram */}
                            <a className="social-icon" href="https://www.instagram.com/tbsmaterialworx?igsh=YzV4b3doaTExcjN4&utm_source=qr" target="_blank" rel="noopener noreferrer">
                                <img className="insta-img" src={images["../assets/social media/instagram.png"].default} alt="Instagram" />
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="material-footer">
  <div className="site-material-footer__inner">
    <img className="mx-img" alt="TBS logo" src={images["../assets/MX Logos/MX.svg"].default} />
    <div className="footer-navigation-content">
      <h2 className="footer-title">Navigation</h2>
    <ul className="footer-navigate">
      <li><a className="footer-material-nav-link" href="/about-us">About Us</a></li>
      <li><a className="footer-material-nav-link-view" href="">Blog</a></li>
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
        </div>
    );
}

export default Blog;
