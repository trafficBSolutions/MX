import React, {useState} from 'react';
import Header from '../components/headerviews/HeaderWeb';
import '../css/web.css';
import '../css/headerfooter.css';
import axios from 'axios';
import images from '../utils/dynamicImportImages';
import { ToastContainer, toast } from 'react-toastify';
  const Web = () => {
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        domain: '',
        message: ''
    })
    const [errors, setErrors] = useState({});
            const [submissionMessage, setSubmissionMessage] = useState('');
            const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
            const handlePhoneChange = (event) => {
                const input = event.target.value;
                const rawInput = input.replace(/\D/g, ''); // Remove non-digit characters
                const formatted = rawInput.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
                
                setPhone(formatted);
                setFormData({ ...formData, phone: formatted });
              
                // Check if the input has 10 digits and clear the error if it does
                if (rawInput.length === 10) {
                  setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
                } else {
                  setErrors((prevErrors) => ({ ...prevErrors, phone: 'Please enter a valid 10-digit phone number.' }));
                }
              };
const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;
  setIsSubmitting(true);

  const requiredFields = ['name', 'company', 'email', 'phone', 'message'];
  const newErrors = {};
  let hasErrors = false;

  requiredFields.forEach((field) => {
    if (!formData[field]) {
      newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required!`;
      hasErrors = true;
    }
  });

  if (!termsAccepted) {
    newErrors.terms = 'You must agree to the terms and conditions.';
    hasErrors = true;
  }

  if (hasErrors) {
    setErrorMessage('Required fields are missing.');
    setErrors(newErrors);
    setIsSubmitting(false);
    return;
  }

  try {
    const response = await axios.post('/new-website', {
      ...formData,
      terms: termsAccepted, // send as boolean
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log(response.data);

    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      domain: '',
      message: '',
    });
    setTermsAccepted(false);
    setPhone('');
    setErrors({});
    toast.success('✅ Job submitted! Check your email for confirmation.');
    setSubmissionMessage('✅ New Website Request Submitted! Check your email for confirmation.');
  } catch (err) {
    console.error('Error submitting:', err);
    setSubmissionErrorMessage('There was an error submitting your request. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

            return (
                <div>
                    <Header/>
                    <main className="service-main">
                    <div className="page-web-banner">
    <div className="web-name-container">
    <h1 className="web-description">WEBSITE DESIGN</h1>
</div>
</div>
<div className="website-img-container">
<img alt="services" className="web-design-img" src={images["mern.svg"]} />
    </div>
<form onSubmit={handleSubmit} className="web-form -- box">
<div className="web-form-container container--narrow page-section">
<div className="web-form-info">
        <h1 className="web-app-box">SEND AN INQUIRY OR GET A QUOTE</h1>
<h2 className="web-fill">Please Fill Out the Form Below to Submit Your Website Information to get an Inquiry or Quote.</h2>
<h3 class="fill-info">Fields marked with * are required.</h3>
</div>
<div className="web-actual">
<div className="name-section-web">
      <div className="first-name-web-input">

  <div className="first-web-name">
    <div className="firstname-web-input">
    <div className="input-first-web-container">
<label className="first-web-label-name">Name *</label>
<input
name="name"
type="text"
className="firstname-web-name-input"
text="first-name--input"
placeholder="Enter First & Last Name"

value={formData.name}
onChange={(e) => {
  setFormData({ ...formData, name: e.target.value });
  if (e.target.value) {
    setErrors((prevErrors) => ({ ...prevErrors, name: '' })); // Clear the error
  }
}}
/>
{errors.name && <div className="error-message">{errors.name}</div>}
</div>
    </div>
  </div>
</div>

<div className="company-web-input">
  <div className="company-web">
    <div className="web-company-name-input">
    <div className="web-input-container">
      <label className="company-web-name">Company *</label>
      <p class="project-company-input-label">If you are wanting to submit a project that isn't for a company, please enter your name in the company field.</p>
      <input name="company-web-name-input" type="text" className="company-web-name-input" text="company--input" placeholder="Enter Company Name"
        value={formData.company} onChange={(e) => {
          setFormData({ ...formData, company: e.target.value });
          if (e.target.value) {
            setErrors((prevErrors) => ({ ...prevErrors, company: '' })); // Clear the error
          }
        }}
        />
        {errors.company && <span className="error-message">{errors.company}</span>}
        </div>
    </div>
  </div>
  </div>
<div className="emailphone-web-input">
  <div className="email-web">
    <div className="email-web-input">
    <div className="email-web-input-container">
<label className="email-web-name">Email *</label>
<input
name="email"
type="text"
className="email-web-box"
text="email--input"
placeholder="Enter Email"

value={formData.email}
onChange={(e) => {
  setFormData({ ...formData, email: e.target.value });
  if (e.target.value) {
    setErrors((prevErrors) => ({ ...prevErrors, email: '' })); // Clear the error
  }
}}
/>
{errors.email && <div className="error-message">{errors.email}</div>}
</div>
    </div>
  </div>

  <div className="phone-web">
    <div className="web-phone-name-input">
    <div className="web-phone-input-container">
<label className="phone-web-label">Phone Number *</label>
<input
name="phone"
type="text"
className="phone-web-box"
text="phone--input"
placeholder="Enter Phone Number"

value={phone}
onChange={(e) => {
  handlePhoneChange(e);
}}
/>
{errors.phone && <div className="error-message">{errors.phone}</div>}
</div>
    </div>
  </div>
</div>
</div>
<div className="web-domain">
<div className="web-domain-input-container">
  <h2 className="web-domain-name-text">
    If you already have a domain name (like www.yoursite.com), please share it with us — it helps us review your current website.
  </h2>
  <h2 className="web-domain-name-text">
    Don’t have one yet? No problem! We can still start the design and help you pick a domain name later.
  </h2>
  <h2 className="web-domain-name-text">
    <b className="web-notice">Note:</b> You will need to purchase a domain from a registrar (like <a href="https://www.domain.com/" target="_blank" rel="noopener noreferrer">www.domain.com</a> or Namecheap) before your website goes live.
  </h2>
  <div className="web-domain-input">
    <label className="web-domain-name">Web Domain</label>
    <input
      name="domain"
      type="text"
      className="web-domain-input-box"
      placeholder="Enter Domain Name: ex. www.example.com"
      value={formData.domain}
      onChange={(e) => {
        setFormData({ ...formData, domain: e.target.value });
      }}
    />
  </div>
</div>
</div>

<div className="web-message-container">
  <label className="message-web-label">Message *</label>
  <h1 className="message-web-note">
    Tell us how you'd like your website to look and function. Do you want a modern design, new branding, or custom CSS styling?<br/><br/>
    Need features like a contact form, shopping cart, or a backend system? Let us know here!<br/><br/>
    You’re also welcome to visit us in person to discuss your design ideas.<br/>
    <b>Shop Location:</b> 723 N. Wall St, Calhoun, GA 30701<br/>
    <b>Hours:</b> Monday–Friday, 8:00 AM–4:00 PM (EST)<br/>
    <i>(Closed on weekends and holidays. We'll follow up the next business day.)</i>
  </h1>

  <textarea
    className="message-web-text"
    name="message"
    type="text"
    placeholder="Enter Message"
    value={formData.message}
    onChange={(e) => {
      setFormData({ ...formData, message: e.target.value });
      if (e.target.value) {
        setErrors((prevErrors) => ({ ...prevErrors, message: '' }));
      }
    }}
  />
  {errors.message && <span className="error-message">{errors.message}</span>}
      <div className="terms-checkbox">
  <label className="terms-label">Terms & Conditions *</label>
  <input
    type="checkbox"
    id="terms"
    checked={termsAccepted}
    onChange={(e) => {
      const checked = e.target.checked;
      setTermsAccepted(checked);
      setFormData((prev) => ({ ...prev, terms: checked }));
      if (checked) {
        setErrors((prevErrors) => ({ ...prevErrors, terms: '' }));
      }
    }}
  />
<p className="terms-text">
  <strong>PLEASE READ AND CHECK:</strong><br />
  You agree to pay for the new website and domain. No cancellations after project has started.
</p>
</div>
{errors.terms && <div className="error-message">{errors.terms}</div>}
</div>
  <div className="submit-button-wrapper">
    <button
    type="submit"
    className="btn btn--full submit-sign"
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <div className="spinner-button">
        <span className="spinner"></span> Submitting...
      </div>
    ) : (
      'SUBMIT NEW WEBSITE'
    )}
  </button>
  {submissionMessage && (
    <div className="custom-toast success">{submissionMessage}</div>
  )}
  {submissionErrorMessage && (
    <div className="custom-toast error">{submissionErrorMessage}</div>
  )}
  {errorMessage && (
    <div className="custom-toast error">{errorMessage}</div>
  )}
         </div> 
</div>
    </div>
    </form>
                    </main>
      <footer className="material-footer">
  <div className="site-material-footer__inner">
    <img className="mx-img" alt="TBS logo" src={images["MX Tan.svg"]} />
    <div className="footer-navigation-content">
      <h2 className="footer-title">Navigation</h2>
    <ul className="footer-navigate">
      <li><a className="footer-material-nav-link" href="/about-us">About Us</a></li>
      <li><a className="footer-material-nav-link" href="/new-logo">New Logos</a></li>
      <li><a className="footer-material-nav-link" href="/services">Services</a></li>
      <li><a className="footer-material-nav-link-view" href="">Websites</a></li>
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
  };
export default Web;
