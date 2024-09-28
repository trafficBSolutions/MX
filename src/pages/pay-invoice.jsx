import Header from '../components/headerviews/HeaderInvoice'
import '../css/invoice.css'

const Invoice = () => {
    return (
        <div>
            <Header/>
            <main className="main-invoice">
            <div className="material-image">
          <img className="material-img" alt="Material WorX logo" src="../public/MX Photos/material worx.png" />
        </div>
        <div className="material-invoice-container">
          <div className="invoice">
          <h1 className="about-invoice-heading">Pay Invoice</h1>
          </div>
          </div>
          <div className="invoice-main">
            <div className="invoice-top">
                <h1 className="invoice-statement">INVOICE PAYMENT</h1>
                </div>
            <form className="invoice-form">
                <div className="name-invoice">
                <label className="name-invoice-label">Name:</label>
                    <div className="name-invoice-form">
                    <div className="first-invoice-name">
                        <label className="first-invoice-label-name">First Name *</label>
                        <input className="first-invoice-input" type="text" placeholder="Enter First Name"></input>
                    </div>
                    <div className="last-invoice-form">
                        <div className="last-invoice-name">
                        <label className="last-invoice-label-name">Last Name *</label>
                        <input className="last-invoice-input" type="text" placeholder="Enter Last Name"></input>
                        </div>
                    </div>
                </div>
                </div>
                <div className="company-invoice">
                    <label className="company-invoice-label">Company/Excavator:</label>
                    <div className="company-invoice-group">
                    <label className="company-invoice-label-name">Company *</label>
                    <input className="company-invoice-input" type="text" placeholder="Enter Company Name"></input>
                    </div>
                </div>
                <div className="email-phone-invoice">
                <label className="email-invoice-label">Email/Phone Number:</label>
                    <div className="email-invoice-form">
                    <div className="email-invoice-name">
                        <label className="email-invoice-label-name">Email *</label>
                        <input className="email-invoice-input" type="text" placeholder="Enter Email"></input>
                    </div>
                    <div className="phone-invoice-form">
                        <div className="phone-invoice-name">
                        <label className="phone-invoice-label-name">Phone Number *</label>
                        <input className="phone-invoice-input" type="text" placeholder="Enter Phone Number"></input>
                        </div>
                    </div>
                </div>
                </div>
            </form>
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
            <li><a className="footer-material-nav-link" href="/about-us">About Us</a></li>
              <li><a className="footer-material-nav-link-view" href="">Pay Invoice</a></li>
              <li><a className="footer-material-nav-link" href="/services">Services</a></li>
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
export default Invoice;
