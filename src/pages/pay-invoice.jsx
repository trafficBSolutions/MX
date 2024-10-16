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
export default Invoice;
