import React, {useState} from 'react';
import Header from '../components/headerviews/HeaderWeb'
import '../css/web.css'
import '../css/headerfooter.css'
import axios from 'axios';
import images from '../utils/dynamicImportImages';
const states = [
    { abbreviation: 'AL', name: 'Alabama' },
    { abbreviation: 'AK', name: 'Alaska' },
    { abbreviation: 'AZ', name: 'Arizona' },
    { abbreviation: 'AR', name: 'Arkansas' },
    { abbreviation: 'CA', name: 'California' },
    { abbreviation: 'CO', name: 'Colorado' },
    { abbreviation: 'CT', name: 'Connecticut' },
    { abbreviation: 'DE', name: 'Delaware' },
    { abbreviation: 'FL', name: 'Florida' },
    { abbreviation: 'GA', name: 'Georgia' },
    { abbreviation: 'HI', name: 'Hawaii' },
    { abbreviation: 'ID', name: 'Idaho' },
    { abbreviation: 'IL', name: 'Illinois' },
    { abbreviation: 'IN', name: 'Indiana' },
    { abbreviation: 'IA', name: 'Iowa' },
    { abbreviation: 'KS', name: 'Kansas' },
    { abbreviation: 'KY', name: 'Kentucky' },
    { abbreviation: 'LA', name: 'Louisiana' },
    { abbreviation: 'ME', name: 'Maine' },
    { abbreviation: 'MD', name: 'Maryland' },
    { abbreviation: 'MA', name: 'Massachusetts' },
    { abbreviation: 'MI', name: 'Michigan' },
    { abbreviation: 'MN', name: 'Minnesota' },
    { abbreviation: 'MS', name: 'Mississippi' },
    { abbreviation: 'MO', name: 'Missouri' },
    { abbreviation: 'MT', name: 'Montana' },
    { abbreviation: 'NE', name: 'Nebraska' },
    { abbreviation: 'NV', name: 'Nevada' },
    { abbreviation: 'NH', name: 'New Hampshire' },
    { abbreviation: 'NJ', name: 'New Jersey' },
    { abbreviation: 'NM', name: 'New Mexico' },
    { abbreviation: 'NY', name: 'New York' },
    { abbreviation: 'NC', name: 'North Carolina' },
    { abbreviation: 'ND', name: 'North Dakota' },
    { abbreviation: 'OH', name: 'Ohio' },
    { abbreviation: 'OK', name: 'Oklahoma' },
    { abbreviation: 'OR', name: 'Oregon' },
    { abbreviation: 'PA', name: 'Pennsylvania' },
    { abbreviation: 'RI', name: 'Rhode Island' },
    { abbreviation: 'SC', name: 'South Carolina' },
    { abbreviation: 'SD', name: 'South Dakota' },
    { abbreviation: 'TN', name: 'Tennessee' },
    { abbreviation: 'TX', name: 'Texas' },
    { abbreviation: 'UT', name: 'Utah' },
    { abbreviation: 'VT', name: 'Vermont' },
    { abbreviation: 'VA', name: 'Virginia' },
    { abbreviation: 'WA', name: 'Washington' },
    { abbreviation: 'WV', name: 'West Virginia' },
    { abbreviation: 'WI', name: 'Wisconsin' },
    { abbreviation: 'WY', name: 'Wyoming' }
  ];
  const Web = () => {
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        first: '',
        last: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
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
              const handleZipChange = (event) => {
                const input = event.target.value;
                const rawInput = input.replace(/\D/g, ''); // Remove non-digit characters
              
                setFormData({ ...formData, zip: rawInput });
              
                // Check if the input has 5 digits and clear the error if it does
                if (rawInput.length === 5) {
                  setErrors((prevErrors) => ({ ...prevErrors, zip: '' }));
                } else {
                  setErrors((prevErrors) => ({ ...prevErrors, zip: 'Please enter a valid 5-digit zip code.' }));
                }
              };
              const handleSubmit = async (e) => {
                e.preventDefault();
                
                console.log(formData);  // Debug log to ensure domain is captured
            
                const requiredFields = ['first', 'last', 'company', 'email', 'phone', 'address', 'city', 'state', 'zip', 'message'];
                const newErrors = {};
            
                // Validate required fields
                requiredFields.forEach(field => {
                    if (!formData[field]) {
                        let fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
                        newErrors[field] = `${fieldLabel} is required!`;
                    }
                });
            
                // If there are errors, set error messages and return
                if (Object.keys(newErrors).length > 0) {
                    setErrorMessage('Required fields are missing.');
                    setErrors(newErrors);
                    return;
                }
            
                try {
                    const formDataToSend = {
                        ...formData  // Spread the formData object to include all fields, including the optional domain
                    };
            
                    // Send the form data as JSON
                    const response = await axios.post('/new-website', formDataToSend, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
            
                    console.log(response.data);
            
                    // Clear form and reset state on successful submission
                    setFormData({
                        first: '',
                        last: '',
                        company: '',
                        email: '',
                        phone: '',
                        address: '',
                        city: '',
                        state: '',
                        zip: '',
                        domain: '',  // Reset the domain field as well
                        message: ''
                    });
            
                    setErrors({});
                    setPhone('');
                    setSubmissionMessage('Website Request Submitted! We will be with you within 48 hours!');
                } catch (error) {
                    console.error('Error submitting Website Request:', error);
                    setSubmissionErrorMessage('Error submitting your request. Please try again.');
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
<img alt="services" className="web-design-img" src={images["../assets/service image buttons/mern.svg"].default} />
    </div>
<form onSubmit={handleSubmit} className="web-form -- box">
<div className="web-form-container container--narrow page-section">
<div className="web-form-info">
        <h1 className="web-app-box">SEND AN INQUIRY OR GET A QUOTE</h1>
<h2 className="web-fill">Please Fill Out the Form Below to Submit Your Website Information to get an Inquiry or Quote.</h2>
</div>
<div className="web-actual">
<div className="name-section-web">
      <div className="first-name-web-input">

  <div className="first-web-name">
    <div className="firstname-web-input">
    <div className="input-first-web-container">
<label className="first-web-label-name">First Name *</label>
<input
name="first"
type="text"
className="firstname-web-name-input"
text="first-name--input"
placeholder="Enter First Name"

value={formData.first}
onChange={(e) => {
  setFormData({ ...formData, first: e.target.value });
  if (e.target.value) {
    setErrors((prevErrors) => ({ ...prevErrors, first: '' })); // Clear the error
  }
}}
/>
{errors.first && <div className="error-message">{errors.first}</div>}
</div>
    </div>
  </div>
  <div className="last-web-name">
    <div className="last-web-input">
    <div className="last-web-input-container">
<label className="last-web-label-name">Last Name *</label>
<input
name="last"
type="text"
className="lastname-web-name-input"
text="last-name--input"
placeholder="Enter Last Name"

value={formData.last}
onChange={(e) => {
  setFormData({ ...formData, last: e.target.value });
  if (e.target.value) {
    setErrors((prevErrors) => ({ ...prevErrors, last: '' })); // Clear the error
  }
}}
/>
{errors.last && <div className="error-message">{errors.last}</div>}
</div>
    </div>
  </div>
</div>
</div>
<div className="company-web-section">
<div className="company-web-input">
  <div className="company-web">
    <div className="web-company-name-input">
    <div className="web-input-container">
      <label className="company-web-name">Company *</label>
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
  </div>
  <div className="emailphone-web-section">
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
<div className="address-web-section">
<div className="address-web-input-container">
<div className="address-web-input">
<div className="address-web-container">
  <div className="address-web-inputing">
<label className="addr-web-label">Address *</label>
<input
name="address-box"
type="text"
className="address-web-box"
text="address--input"
placeholder="Enter Address"
value={formData.address}
onChange={(e) => {
  setFormData({ ...formData, address: e.target.value });
  if (e.target.value) {
    setErrors((prevErrors) => ({ ...prevErrors, address: '' })); // Clear the error
  }
}}
/>
{errors.address && <span className="error-message">{errors.address}</span>}
</div>
<div className="city-web-input">
<label className="city-web-label">City *</label>

<input
name="city-input"
type="text"
className="city-web-box"
text="city--input"
placeholder="City"
value={formData.city}
onChange={(e) => {
  setFormData({ ...formData, city: e.target.value });
  if (e.target.value) {
    setErrors((prevErrors) => ({ ...prevErrors, city: '' })); // Clear the error
  }
}}
/>
{errors.city && <span className="error-message">{errors.city}</span>}
</div>
</div>
<div className="city-web-state">
<div className="state-web-input">
<label className="state-web-label">State *</label>
<select
      name="state"
      className="state-web-box"
      
      value={formData.state}
      onChange={(e) => {
        setFormData({ ...formData, state: e.target.value });
        if (e.target.value) {
          setErrors((prevErrors) => ({ ...prevErrors, state: '' })); // Clear the error
        }
      }}
    >
      <option value="">Select State</option>
      {states.map(state => (
        <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
      ))}
    </select>
    {errors.state && <span className="error-message">{errors.state}</span>}
    </div>
    <div className="zip-web-input">
<label className="zip-web-label">Zip Code *</label>
<input
        name="zip"
        type="text"
        className="zip-web-box"
        value={formData.zip}
        onChange={(e) => handleZipChange(e)}
        placeholder="Zip Code"
        maxLength={5}
        pattern="\d{5}"
        title="Zip code must be 5 digits"
      />
      {errors.zip && <span className="error-message">{errors.zip}</span>}
</div>
</div>
</div>
</div>
</div>
<div className="web-domain">
    <div className="web-domain-input-container">
        <h2 className="web-domain-name-text">If you have a current domain, it will be easier 
            to see what your current website looks like. If you don't have a domain and you're just starting out a new website,
            you can use a domain name generator to find a domain name that is available. However, 
            you do not have to submit a domain name if you don't have one.
        </h2>
        <h2 className="web-domain-name-text"><b className="web-notice">NOTICE: </b>If you don't have a domain name, 
            you will have to purchase a domain name from a domain name registrar once we have built your website
            and it is ready to go live.
        </h2>
        <div className="web-domain-input">
            <label className="web-domain-name">Web Domain *</label>
            <input
                name="domain"  // Update this to "domain" to match the formData field name
                type="text"
                className="web-domain-input-box"
                placeholder="Enter Domain Name: ex. www.example.com"
                value={formData.domain}  // Make sure this links to formData.domain
                onChange={(e) => {
                    setFormData({ ...formData, domain: e.target.value });  // Update formData.domain when the user types
                }}
            />
        </div>
    </div>
</div>

      <div className="web-message-container">
<label className="message-web-label">Message *</label>
<h1 className="message-web-note">Tell us about your website and how you want it designed! Please specify if you need
  more specifications about your website like if you want us to 
  design it with new CSS Styling, or if you want us to add a Backend to your website.
If you need drop by to direct us to your new design, our shop is located on
723 N. Wall St, Calhoun GA, 30701. Please note that we are open Monday-Friday 8:00am-4:00pm EST and once 
we are closed, we will respond the next business day. Please also note that we do not work on Saturdays, Sundays, or Holidays.
  </h1>

<textarea className="message-web-text" name="message" type="text" placeholder="Enter Message"
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
  <button type="submit" className="btn -- submit-web" onClick={handleSubmit}>SUBMIT WEBSITE DESIGN</button>
  {submissionErrorMessage &&
            <div className="submission-error-message">{submissionErrorMessage}</div>
          }
          {errorMessage &&
            <div className="submission-error-message">{errorMessage}</div>
          }
</div>
    </div>
    </form>
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
export default Web;
