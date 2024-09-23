import React, { useState } from 'react';
import MXPhotoGallery from '../components/MXhomegal';
import Header from '../components/headerviews/HeaderDrop';
import '../css/headerfooter.css';
import '../css/home.css';

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
          <img className="material-img" alt="Material WorX logo" src="../public/MX Photos/material worx.png" />
        </div>
        <div className="material-container">
          <div className="scenes">
          <h1 className="material-page-heading">BEHIND THE SCENES</h1>
          </div>
        <div className="material-video-banner">
            <video className="material-page-video-banner" autoPlay loop muted playsInline>
    <source src="../public/MX Photos/mx pic.mp4" type="video/mp4"></source></video>
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
          and functionality for your space. Whether you're looking to enhance your storefront with 
          eye-catching banners or add a personalized touch to your vehicle with custom decals, our team is dedicated to exceeding your expectations.
          At Material WorX, innovation meets craftsmanship, as we combine cutting-edge technology with skilled artistry to deliver 
          unmatched quality in every project. From concept to completion, we collaborate closely with our clients to understand
          their unique needs and deliver tailor-made solutions that leave a lasting impression.
          Experience the difference with Material WorX, where creativity knows no bounds, and excellence is our standard. 
          Visit us today to explore our wide range of custom signage and apparel options, 
          and let us bring your ideas to life with style and sophistication.</h2>
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
            <span className="subheading">What We Do</span>
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
      Custom signage refers to personalized or bespoke signs that are uniquely designed and crafted to meet the specific needs and preferences of an individual or business. 
      Unlike pre-made or standard signs, custom signage allows for greater flexibility in terms of design, size, shape, color, and messaging. 
      These signs can be made from a variety of materials such as vinyl, aluminum composite panels, wood, acrylic, or metal, depending on the desired aesthetic and functionality. 
      Custom signage can serve a wide range of purposes, including branding, advertising, wayfinding, informational, or decorative purposes.
    </p>
  </div>

  <div className="step-img-box">
    <div className="img-btn-container">
      <img src="../public/MX Photos/btr.jpg" className="step-sign-img" alt="iPhone app preferences selection screen" />
      <a href="/custom-signs" className="btn btn--full sign-quote">GET A QUOTE FOR SIGNS</a>
    </div>
  </div>
</div>
            <div className="decals-stickers-home">
            <div className="step-text-box">
              <p className="step-number">02</p>
              <h3 className="heading-tertiary">DECALS & STICKERS</h3>
              <p className="step-description">
              Our wide range of decals includes custom Football Helmet Decals, Vehicle Decals, Chrome Decals, and Window Decals, all crafted from high-quality, 
              durable materials. Football Helmet Decals are designed to withstand the tough conditions of gameplay, 
              with weatherproof and UV-resistant vinyl that adheres securely while maintaining vibrant colors. 
              Vehicle Decals offer the perfect way to personalize cars, trucks, or motorcycles, made to endure outdoor elements and available in a variety of styles and sizes. 
              For a sleek, high-end look, our Chrome Decals provide a bold, reflective metallic finish that’s scratch-resistant and easy to apply, 
              ideal for vehicles and home decor. Window Decals are perfect for glass surfaces, whether for decorative purposes, branding, or privacy, 
              featuring transparent or opaque designs that let light in while remaining weatherproof and residue-free when removed. 
              No matter the application, our decals deliver long-lasting quality and visual impact.
              </p>
            </div>
            <div className="step-img-box">
            <div className="img-btn-container">
              <img
                src="../public/MX Photos/box truck.JPG"
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
    Banners are graphical displays typically made of fabric, vinyl, paper, or other durable materials, featuring text, images, or 
    both, designed to convey a message or promote a product, event, or idea. They come in various shapes and sizes, ranging from small handheld signs 
    to large-scale installations. Banners are commonly used in advertising, marketing, and event signage due to their versatility, portability, and ability to attract attention. 
    They can be hung or displayed in indoor or outdoor settings, making them an effective tool for conveying information and capturing the interest of passersby.
    </p>
  </div>

  <div className="step-img-box">
    <div className="img-btn-container">
      <img src="../public/MX Photos/Banner BBQ.JPG" className="step-banner-img" alt="iPhone app preferences selection screen" />
      <a href="/banners" className="btn btn--full banner-quote">GET A QUOTE FOR BANNERS</a>
    </div>
  </div>
</div>
<div className="custom-t-shirts">
  <div className="step-text-box">
    <p className="step-number">04</p>
    <h3 className="heading-tertiary">T-SHIRTS SWEATSHIRTS JACKETS</h3>
    <p className="step-description">
    T-shirts are transformed through a process known as heat pressing, wherein designs, graphics, or text are applied with precision and durability. 
    Utilizing cutting-edge technology, such as the Roland TrueVis VG3-540 for printing and the Graphtec FC-9000-140 for plotting, intricate designs are meticulously 
    transferred onto transfer paper or vinyl. 
    These designs are then seamlessly bonded to the fabric of the T-shirt using heat and pressure, resulting in vibrant, 
    long-lasting creations that stand out with exceptional quality.
    </p>
  </div>

  <div className="step-img-box">
    <div className="img-btn-container">
      <img src="../public/MX Photos/jdf shirt.jpg" className="step-shirt-img" alt="iPhone app preferences selection screen" />
      <a href="/t-shirts-sweatshirts-jackets" className="btn btn--full t-shirt-quote">GET A QUOTE FOR APPAREL</a>
    </div>
  </div>
</div>
<div className="custom-windowing">
  <div className="step-text-box">
    <p className="step-number">05</p>
    <h3 className="heading-tertiary">WINDOW FROSTING VINYL FOR PRIVACY</h3>
    <p className="step-description">
    Window frosting vinyl serves as a crucial tool for enhancing privacy in diverse settings such as offices, schools, shower doors, and beyond. By applying this 
    specialized vinyl to glass surfaces, it creates an opaque or translucent effect, obstructing the view from the outside while still allowing natural light to 
    permeate through. This pivotal balance between privacy and illumination is essential for fostering a comfortable and secure environment.
In offices, window frosting vinyl provides discrete divisions within the workspace, delineating areas such as meeting rooms or private offices. This ensures 
confidentiality during sensitive discussions and meetings while simultaneously adding a sophisticated aesthetic touch to the interior design.
Within educational institutions, window frosting vinyl on classroom windows, administrative offices, or library partitions serves to minimize distractions and
 promote focused learning environments. Students can engage in lessons without external disruptions, thereby optimizing their educational experience.
In residential spaces, the application of window frosting vinyl on shower doors or bathroom windows grants individuals the privacy they require without 
compromising on the influx of natural light. This creates a serene and tranquil atmosphere conducive to relaxation and personal rejuvenation.
Overall, the significance of window frosting vinyl lies in its multifaceted ability to safeguard privacy, facilitate focused activities, and contribute to 
the aesthetic appeal of various environments. By striking a delicate balance between seclusion and illumination, it emerges as an indispensable solution for
 ensuring comfort and functionality across diverse settings.
    </p>
  </div>

  <div className="step-img-box">
    <div className="img-btn-container">
      <img src="../public/MX Photos/WallAndGlass.jpg" className="step-frost-img" alt="iPhone app preferences selection screen" />
      <a href="/window-frost-tint" className="btn btn--full window-quote">GET A QUOTE FOR FROST/TINTING</a>
    </div>
  </div>
</div>
<div className="custom-building-graphics">
  <div className="step-text-box">
    <p className="step-number">06</p>
    <h3 className="heading-tertiary">DYYWALLS FLOORS CONTRETE GRAPHICS</h3>
    <p className="step-description">
    Floor Vinyls: Printable vinyl for floors typically includes options such as vinyl plank flooring or vinyl sheet flooring. These are often designed to be durable, 
    water-resistant, and scratch-resistant, making them suitable for high-traffic areas. Printable vinyl flooring can come in a variety of styles, including wood-look, 
    stone-look, or abstract patterns.
Concrete Vinyls: For concrete surfaces, printable vinyl may include options such as vinyl wraps or decals specifically designed for use on concrete. 
These vinyls are often formulated to adhere well to concrete surfaces and withstand outdoor conditions. They may be used for decorative purposes, 
such as adding graphics or signage to concrete walls or floors.
Drywall Vinyls: Printable vinyl for drywall applications can include options such as printable wallpaper or wall decals. These vinyls are designed to adhere well to drywall 
surfaces and can be used for decorative purposes, branding, or creating custom designs on walls.
    </p>
  </div>

  <div className="step-img-box">
    <div className="img-btn-container">
      <img src="../public/MX Photos/Nance.JPG" className="step-building-img" alt="iPhone app preferences selection screen" />
      <a href="/window-frost-tint" className="btn btn--full building-quote">GET A QUOTE FOR FROST/TINTING</a>
    </div>
  </div>
</div>
<div className="custom-fleet-graphics">
  <div className="step-text-box">
    <p className="step-number">07</p>
    <h3 className="heading-tertiary">VEHICLE FLEET GRAPHICS</h3>
    <p className="step-description">
    Vehicle fleet graphics are vinyl decals or wraps meticulously designed to transform vehicles into impactful marketing tools. Whether adorning business trucks, 
    delivery vans, or even personal vehicles, these graphics serve as dynamic canvases for brand messaging, logos, and eye-catching designs.
     By applying vinyl graphics, businesses can effortlessly promote their brand identity and convey key messages to audiences on the move. From sleek logos to elaborate designs, 
    vehicle fleet graphics offer a customizable and durable solution for businesses seeking to enhance their visibility and professionalism on the road.
    </p>
  </div>

  <div className="step-img-box">
    <div className="img-btn-container">
      <img src="../public/MX Photos/Fleet.jpg" className="step-fleet-img" alt="iPhone app preferences selection screen" />
      <a href="/fleet-graphics" className="btn btn--full fleet-quote">GET A QUOTE FOR FLEET GRAPHICS</a>
    </div>
  </div>
</div>
            </div>
        </section>

              <div className="contacting-container">
    <h1 className="contact-materialX">
        If you have any questions about your design or need any assistance with your item, please contact us:
    </h1>

<div className="bryson-contact-link">
    <h1 className="bryson-contact">
        OWNER: BRYSON DAVIS: <a className="bryson-phone" href="tel:+17062630175">706-263-0175</a> or <a className="bryson-email" href="mailto:tbsolutions3@gmail.com">tbsolutions3@gmail.com</a>
    </h1>
</div>
<div className="carson-contact-link">
    <h1 className="carson-contact">
        SUPERVISOR: CARSON SPEER: <a className="carson-phone" href="tel:+17065814465">706-581-4465</a> or <a className="carson-email" href="mailto:tbsolutions4@gmail.com">tbsolutions4@gmail.com</a>
    </h1>
</div>
<div className="will-contact-link">
    <h1 className="will-contact">
        PRODUCT DESIGNER: WILLIAM ROWELL: <a className="will-phone" href="tel:+17068790106">706-879-0106</a> or <a className="will-email" href="mailto:tbsolutions9@gmail.com">tbsolutions9@gmail.com</a>
    </h1>
</div>
<div className="jonkell-contact-link">
    <h1 className="jonkell-contact">
        PRODUCT MANUFACTURER: JONKELL TOLBERT: <a className="jonkell-phone" href="tel:+17068799246">706-879-9246</a> or <a className="jonkell-email" href="mailto:tbsolutions55@gmail.com">tbsolutions55@gmail.com</a>
    </h1>
</div>
</div>
          </div>
        </div>
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
              <li><a className="footer-material-nav-link" href="/custom-signs">Custom Signs</a></li>
              <li><a className="footer-material-nav-link" href="/decals-stickers">Decals & Stickers</a></li>
              <li><a className="footer-material-nav-link" href="/banners">Banners</a></li>
              <li><a className="footer-material-nav-link" href="/t-shirts-sweatshirts-jackets">T-Shirts Sweatshirts Jackets</a></li>
              <li><a className="footer-material-nav-link" href="/window-frost-tint">Window Frosting & Tinting</a></li>
              <li><a className="footer-material-nav-link" href="/drywall-floor-concrete">Drywall Floor & Concrete Graphics</a></li>
              <li><a className="footer-material-nav-link" href="/fleet-graphics">Fleet Graphics</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <div className="statement-box">
              <p className="statement">
                <b className="safety-b">Safety Statement: </b>
                At TBS, safety is our top priority. We are dedicated to ensuring the well-being of our employees, clients, 
                and the general public in every aspect of our operations. Through comprehensive safety training, 
                strict adherence to regulatory standards, and continuous improvement initiatives, 
                we strive to create a work environment where accidents and injuries are preventable. 
                Our commitment to safety extends beyond compliance—it's a fundamental value embedded in everything we do. 
                Together, we work tirelessly to promote a culture of safety, accountability, and excellence, because when it comes to traffic control, there's no compromise on safety.
              </p>
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
  );
};

export default Home;