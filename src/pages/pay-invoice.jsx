import React, { useState } from 'react';
import axios from 'axios'; // To make API calls
import Header from '../components/headerviews/HeaderInvoice';
import '../css/invoice.css';
import MapInvoiceComponent from '../components/GoogleMaps';
import images from '../utils/dynamicImportImages';
const Invoice = () => {
    const [invoiceData, setInvoiceData] = useState({
        invoiceNumber: '',
        cardName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: ''
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send invoice data to the backend
            const response = await axios.post('/api/invoices', invoiceData);
            alert('Invoice payment processed!');
        } catch (error) {
            console.error('Error processing invoice payment', error);
        }
    };

    return (
        <div>
            <Header />
            <main className="main-invoice">
                <div className="material-image">
                    <img className="material-img" alt="Material WorX logo" src={images["../assets/MX Logos/Material WorX.svg"].default} />
                </div>
                <div className="material-invoice-container">
                    <div className="invoice">
                        <h1 className="about-invoice-heading">Pay Invoice</h1>
                    </div>
                </div>
                <div className="invoice-main">
                    <div className="invoice-top">
                        <h1 className="invoice-statement">INVOICE PAYMENT</h1>
                        <h1 className="invoice-statement-description">
                            Please enter your invoice number and credit card information to pay your invoice.
                        </h1>
                    </div>
                    <form className="invoice-form" onSubmit={handleSubmit}>
                        <div className="invoice-actual">
                            <label className="name-invoice-label">Invoice Form:</label>
                            <div className="invoice-displays">
                                <div className="invoice-form-container">
                                    <div className="name-invoice-form">
                                        <label className="first-invoice-label-name">Invoice Number *</label>
                                        <input
                                            className="first-invoice-input"
                                            type="text"
                                            name="invoiceNumber"
                                            placeholder="Example: 2025SS001"
                                            value={invoiceData.invoiceNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="name-card-invoice-form">
                                        <label className="name-card-label">Name on Card*</label>
                                        <input
                                            className="card-input-name"
                                            type="text"
                                            name="cardName"
                                            placeholder="Credit Card Name"
                                            value={invoiceData.cardName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="last-invoice-form">
                                        <label className="last-invoice-label-name">Credit Card *</label>
                                        <input
                                            className="last-invoice-input"
                                            type="text"
                                            name="cardNumber"
                                            placeholder="1234 5678 9012 3456"
                                            value={invoiceData.cardNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="expiration-invoice-form">
                                        <label className="expiration-invoice-label">Expiration Date *</label>
                                        <input
                                            className="expiration-invoice-input"
                                            type="text"
                                            name="expirationDate"
                                            placeholder="MM/YY"
                                            value={invoiceData.expirationDate}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="cvv-invoice-form">
                                        <label className="cvv-invoice-label">CVV *</label>
                                        <input
                                            className="cvv-invoice-input"
                                            type="text"
                                            name="cvv"
                                            placeholder="123"
                                            value={invoiceData.cvv}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="google-map-invoice">
                                    <MapInvoiceComponent />
                                </div>
                            </div>
                        </div>
                        <button type="submit">Pay Now</button>
                    </form>
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
<div className="footer-copyright">
      <p className-="footer-copy-p">&copy; 2024 Traffic & Barrier Solutions, LLC/Material WorX. 
        This website was created by William Rowell. All rights reserved.</p>
    </div>
        </div>
    )
}
export default Invoice;
