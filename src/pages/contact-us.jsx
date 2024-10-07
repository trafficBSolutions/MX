import '../css/contact.css'
import Header from '../components/headerviews/HeaderContact'
import React, {useState} from 'react'
import axios from 'axios'
import MapComponent from '../components/GoogleMapComponent'
const Contact = () => {
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        first: '',
        last: '',
        company: '',
        email: '',
        phone: '',
        message: ''
    });
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
          
              // Clear previous error and submission messages
              setErrorMessage(''); // Clear error message at the start
              setSubmissionErrorMessage('');
              setSubmissionMessage('');
          
              const requiredFields = ['first', 'last', 'company', 'email', 'phone', 'message'];
              const newErrors = {};
          
              // Validation check for required fields
              requiredFields.forEach(field => {
                  if (!formData[field]) {
                      let fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
                      if (field === 'first') fieldLabel = 'First Name';
                      if (field === 'last') fieldLabel = 'Last Name';
                      if (field === 'company') fieldLabel = 'Company Name';
                      if (field === 'phone') fieldLabel = 'Phone Number';
                      newErrors[field] = `${fieldLabel} is required!`;
                  }
              });
          
              // If there are any errors, set the error message and stop submission
              if (Object.keys(newErrors).length > 0) {
                  setErrors(newErrors);
                  setErrorMessage('Required fields are missing.');
                  return;
              }
          
              // Clear the error message if all validations pass
              setErrorMessage('');  // This ensures the error message is cleared before submission
          
              try {
                  const formDataToSend = { ...formData };
                  const response = await axios.post('/contact-us', formDataToSend, {
                      headers: {
                          'Content-Type': 'application/json',
                      }
                  });
          
                  // Success: clear the form and show success message
                  console.log(response.data);
                  setFormData({
                      first: '',
                      last: '',
                      company: '',
                      email: '',
                      phone: '',
                      message: ''
                  });
                  setErrors({});
                  setPhone('');
                  setSubmissionMessage('Message has been sent! We will be with you within 48 hours.');
              } catch (error) {
                  console.error('Error submitting message:', error);
                  setSubmissionErrorMessage('An error occurred while submitting. Please try again.');
              }
          };
          
    return (
        <div>
            <Header/>
    <main className="contact-main">
        <div className="material-image">
        <img className="material-img" alt="Material WorX logo" src="../public/MX Logos/Material WorX.svg" />
    </div>
    <h1 className="contact-material">Contact Material WorX</h1>
    <div className="contact-flexi">
    <form className="contact-set"
        onSubmit={handleSubmit}>
<div className="contact-actual">
  <div className="name-section-contact">
    <label className="first-contact-name-label">Name: </label>
      <div className="first-name-contact-input">

  <div className="first-contact-name">
    <div className="firstname-contact-input">
    <div className="input-first-contact-container">
<label className="first-contact-label-name">First Name *</label>
<input
  name="first"
  type="text"
  className="firstname-contact-name-input"
  placeholder="Enter First Name"
  value={formData.first}
  onChange={(e) => {
    setFormData({ ...formData, first: e.target.value });
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, first: '' }));  // Clear the first name error
    }
  }}
/>
{errors.first && <div className="error-message">{errors.first}</div>}

</div>
    </div>
  </div>
  <div className="last-contact-name">
    <div className="last-contact-input">
    <div className="last-contact-input-container">
<label className="last-contact-label-name">Last Name *</label>
<input
  name="last"
  type="text"
  className="lastname-contact-name-input"
  placeholder="Enter Last Name"
  value={formData.last}
  onChange={(e) => {
    setFormData({ ...formData, last: e.target.value });
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, last: '' }));  // Clear the last name error
    }
  }}
/>
{errors.last && <div className="error-message">{errors.last}</div>}

</div>
    </div>
  </div>
</div>
</div>
<div className="company-contact-section">
<label className="contact-company-label">Company/Excavator: </label>
<div className="company-contact-input">
  <div className="company-contact">
    <div className="contact-company-name-input">
    <div className="contact-input-container">
      <label className="company-contact-name">Company *</label>
      <input name="company-contact-name-input" type="text" className="company-contact-name-input" text="company--input" placeholder="Enter Company Name"
        value={formData.company} onChange={(e) => {
          setFormData({ ...formData, company: e.target.value });
          if (e.target.value) {
            setErrors((prevErrors) => ({ ...prevErrors, company: '' })); // Clear the error
          }
        }}
        />
        {errors.company && <div className="error-message">{errors.company}</div>}
        </div>
    </div>
  </div>
  </div>
  </div>
  <div className="emailphone-contact-section">
  <label className="emailphone-contact-label">Email/Phone Number:</label>
<div className="emailphone-contact-input">
  <div className="email-contact">
    <div className="email-contact-input">
    <div className="email-contact-input-container">
<label className="email-contact-name">Email *</label>
<input
name="email"
type="text"
className="email-contact-box"
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

  <div className="phone-contact">
    <div className="contact-phone-name-input">
    <div className="contact-phone-input-container">
<label className="phone-contact-label">Phone Number *</label>
<input
name="phone"
type="text"
className="phone-contact-box"
text="phone--input"
placeholder="Enter Phone Number"
value={phone}
onChange={handlePhoneChange}
/>
{errors.phone && <div className="error-message">{errors.phone}</div>}
</div>

    </div>
  </div>
</div>
</div>
<div className="contact-message-container">
<label className="message-contact-label">Message: </label>
<textarea className="message-contact-text" name="message" type="text" placeholder="Enter Message"
  value={formData.message} onChange={(e) => {
    setFormData({ ...formData, message: e.target.value });
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, message: '' })); // Clear the error
    }
  }}
  />
  {errors.message && <span className="error-message">{errors.message}</span>}
  {submissionMessage && (
  <div className="submission-message">{submissionMessage}</div>
)}

{submissionErrorMessage && (
  <div className="submission-error-message">{submissionErrorMessage}</div>
)}

  </div>
  <button type="submit" className="btn-contact-submit btn--full submit-contact" onClick={handleSubmit}>SUBMIT MESSAGE</button>
  {submissionErrorMessage &&
            <div className="submission-error-message">{submissionErrorMessage}</div>
          }
          {errorMessage &&
            <div className="submission-error-message">{errorMessage}</div>
          }
</div>
</form>
<div className="contact-alt">
<div className="google-map-contact">
<MapComponent/>
</div>
<div className="contact-alternative">
  <div className="phone-number-contacting">
    <img
      src="../public/service image buttons/phone-call.svg"
      className="phone-img-contact"
      alt="Phone icon"
    />
    <p>
      <a className="phone-paragraph" href="tel:+17062630175">(706) 263-0175</a>
    </p>
  </div>
  <div className="email-contacting">
    <img
      src="../public/service image buttons/email.svg"
      className="email-img-contact"
      alt="Email icon"
    />
    <p>
      <a className="email-paragraph" href="mailto:tbsolutions1999@gmail.com">
        tbsolutions1999@gmail.com
      </a>
    </p>
  </div>
  <div className="address-contacting">
    <img
      src="../public/service image buttons/address.svg"
      className="address-img-contact"
      alt="Address icon"
    />
    <p>
      <a
        className="address-paragraph"
        href="https://www.google.com/maps/place/Traffic+%26+Barrier+Solutions%2FMaterial+WorX+Sign+Shop/@34.5115302,-84.9476215,94m/data=!3m1!1e3!4m6!3m5!1s0x886007df83843f3b:0x84510d87790af625!8m2!3d34.5117917!4d-84.948025!16s%2Fg%2F11l28zhlzt?entry=ttu&g_ep=EgoyMDI0MDkyNC4wIKXMDSoASAFQAw%3D%3D"
      >
        723 N. Wall St, Calhoun, GA, 30701
      </a>
    </p>
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
          <img className="mx-img" alt="TBS logo" src="../public/MX Logos/MX.svg"/>
            <ul className="footer-navigate">
              <li><a className="footer-material-nav-link" href="/about-us">About Us</a></li>
              <li><a className="footer-material-nav-link" href="/pay-invoice">Pay Invoice</a></li>
              <li><a className="footer-material-nav-link" href="/services">Services</a></li>
              <li><a className="footer-material-nav-link-view" href="">Contact Us</a></li>
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
export default Contact;
