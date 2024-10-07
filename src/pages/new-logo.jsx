import Header from '../components/headerviews/HeaderLogo'
import '../css/logo.css'
import axios from 'axios';
import React, {useState} from 'react'
import MapLogoComponent from '../components/GoogleLogoMaps'
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
const Logo = () => {
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
        img: null,
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
              const handleFileChange = (e, fileType) => {
                const file = e.target.files[0];
                setFormData({ ...formData, [fileType]: file });
                setErrors((prevErrors) => ({ ...prevErrors, img: '' })); // Clear error on file selection
            };
              
              const handleFileRemove = (fileType) => {
                setFormData({ ...formData, [fileType]: null });
              };

              const handleSubmit = async (e) => {
                e.preventDefault();
                
                const requiredFields = ['first', 'last', 'company', 'email', 'phone', 'address', 'city', 'state', 'zip', 'message'];
                const newErrors = {};
        
                // Validate required fields
                requiredFields.forEach(field => {
                    if (!formData[field]) {
                        let fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
                        if (field === 'first') fieldLabel = 'First Name';
                        if (field === 'last') fieldLabel = 'Last Name';
                        if (field === 'company') fieldLabel = 'Company Name';
                        if (field === 'phone') fieldLabel = 'Phone Number';
                        if (field === 'address') fieldLabel = 'Address';
                        if (field === 'city') fieldLabel = 'City';
                        if (field === 'state') fieldLabel = 'State';
                        if (field === 'zip') fieldLabel = 'Zip Code';
                        newErrors[field] = `${fieldLabel} is required!`;
                    }
                });
        
                // Validate if file is selected
                if (!formData.img) {
                    newErrors.img = 'Please select a file for your logo.';
                }
        
                // If there are errors, set error messages and return
                if (Object.keys(newErrors).length > 0) {
                    setErrorMessage('Required fields are missing.');
                    setErrors(newErrors);
                    return;
                }
        
                try {
                    const formDataToSend = {
                        ...formData
                    };
                    const response = await axios.post('/new-logo', formDataToSend, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
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
                        img: null,
                        message: ''
                    });
        
                    setErrors({});
                    setPhone('');
                    setSubmissionMessage('New Logo Request Submitted! We will be with you within 48 hours!');
                } catch (error) {
                    console.error('Error submitting Logo Request:', error);
                    setSubmissionErrorMessage('Error submitting your request. Please try again.');
                }
            };
    return (
        <div>
            <Header/>
            <main className="main-logo-graphics">
            <div className="page-logo-banner">
    <div className="logo-name-container">
    <h1 className="logo-description">NEW LOGO REDESIGN</h1>
</div>
</div>
        <form className="logo-set -- box"
        onSubmit={handleSubmit}
        >
            <div className="logo-form-container container--narrow page-section">
        <div className="logo-form-info">
        <h1 className="logo-app-box">SEND AN INQUIRY OR GET A QUOTE</h1>
<h2 className="logo-fill">Please Fill Out the Form Below to Submit Your New Logo Information to get an Inquiry or Quote.</h2>
</div>
<div className="logo-actual">
  <div className="name-section-logo">
    <label className="first-logo-name-label">Name: </label>
      <div className="first-name-logo-input">

  <div className="first-logo-name">
    <div className="firstname-logo-input">
    <div className="input-first-logo-container">
<label className="first-logo-label-name">First Name *</label>
<input
name="first"
type="text"
className="firstname-logo-name-input"
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
  <div className="last-logo-name">
    <div className="last-logo-input">
    <div className="last-logo-input-container">
<label className="last-logo-label-name">Last Name *</label>
<input
name="last"
type="text"
className="lastname-logo-name-input"
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
<div className="company-logo-section">
<label className="logo-company-label">Company/Excavator: </label>
<div className="company-logo-input">
  <div className="company-logo">
    <div className="logo-company-name-input">
    <div className="logo-input-container">
      <label className="company-logo-name">Company *</label>
      <input name="company-logo-name-input" type="text" className="company-logo-name-input" text="company--input" placeholder="Enter Company Name"
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
  <div className="emailphone-logo-section">
  <label className="emailphone-logo-label">Email/Phone Number:</label>
<div className="emailphone-logo-input">
  <div className="email-logo">
    <div className="email-logo-input">
    <div className="email-logo-input-container">
<label className="email-logo-name">Email *</label>
<input
name="email"
type="text"
className="email-logo-box"
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

  <div className="phone-logo">
    <div className="logo-phone-name-input">
    <div className="logo-phone-input-container">
<label className="phone-logo-label">Phone Number *</label>
<input
name="phone"
type="text"
className="phone-logo-box"
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
<div className="address-logo-section">
<label className="address-logo-label">Company Address: </label>
<div className="address-logo-input-container">
<div className="address-logo-input">
<div className="address-logo-container">
  <div className="address-logo-inputing">
<label className="addr-logo-label">Address *</label>
<input
name="address-box"
type="text"
className="address-logo-box"
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
<div className="city-logo-input">
<label className="city-logo-label">City *</label>

<input
name="city-input"
type="text"
className="city-logo-box"
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
<div className="city-logo-state">
<div className="state-logo-input">
<label className="state-logo-label">State *</label>
<select
      name="state"
      className="state-logo-box"
      
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
    <div className="zip-logo-input">
<label className="zip-logo-label">Zip Code *</label>
<input
        name="zip"
        type="text"
        className="zip-logo-box"
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
<div className="logo-file-section">
<label className="logo-file-label">Logo/Image:</label>
<h2 className="logo-warn"><b className="logo-notice">NOTICE</b>: 
Please submit your logo you want redesigned and vectorized. If you have any questions or concerns,
 please call or text Carson Speer at <a href="tel:+17065814465">(706) 581-4465 </a>
  or come by our Sign Shop within business hours. We are open Monday-Friday 8:00am-4:00pm EST.
</h2>
<div className="logo-alt">
<div className="google-map-logo">
<MapLogoComponent/>
</div>
</div>
<h1 className="logo-logo-label">You can submit jpeg, jpg, png, pdf, and svg files:</h1>
<div className="file-logo-section">
<label htmlFor="logo-select" className="logo-logo">Logo/Image for Redesigning *</label>
<div className="choose-logo-contain">
    <label className="file-logo-label">
    {formData.img ? (
            <span>{formData.img.name}</span>
          ) : (
            <span>Choose Your Logo For Redesigning</span>
          )}
          <input type="file" name="img" accept=".pdf,.svg,.doc,.png,.jpg,.jpeg" onChange={(e) => handleFileChange(e, 'img')} 
          />
          </label>
          {formData.img && (
            <button type="button" className="remove-logo-file-button" onClick={() => handleFileRemove('img')}>Remove</button>
          )}
        
        {errors.img && <span className="error-message">{errors.img}</span>}
</div>
</div>
</div>
<div className="print-logo-note">
    <label className="print-logo-label">Printing Options For Your New Logo</label>
    <h2 className="printing-logo-h2">If you want your new logo to be used for our sign shop needs,
        please select a job here to film out of one of the printable/plottable options. Once you have submitted this form or
        if you have already submitted one of the following forms, we will contact you within 48 hours.
    </h2>
    <div className="material-services-buttons">
          <div className="signs-button">
            <a href="/custom-signs" className="custom-sign-service-button" type="button">
                    <img src="../public/service image buttons/sign.svg" alt="Custom Signage Icon" className="sign-icon" />
                <span> CUSTOMIZABLE SIGNAGE</span>
            </a>
        </div>
            <div className="decals-stickers-button">
                <a href="/decals-stickers" className="decals-stickers-service-button">
                <img src="../public/service image buttons/decal.svg" className="decal-icon"></img>
                <span>DECALS & STICKERS</span>
                </a>
            </div>
            <div className="banner-button">
                <a href="/banners" className="banner-service-button">
                <img src="../public/service image buttons/banner.svg" className="banner-icon"></img>
                <span>BANNERS</span>
                </a>
            </div>
            <div className="t-shirt-button">
                <a href="/t-shirts-sweatshirts-jackets" className="t-shirt-service-button">
                <img src="../public/service image buttons/t-shirt.svg" className="shirt-icon"></img>
                <span>T-SHIRTS SWEATSHIRTS JACKETS</span>
                </a>
            </div>
            <div className="window-button">
                <a href="/window-frost-tint" className="window-service-button">
                <img src="../public/service image buttons/window.svg" className="window-icon"></img>
                <span>WINDOW FROSTING & TINTING</span>
                </a>
            </div>
            <div className="drywall-button">
                <a href="/drywall-floor-concrete" className="drywall-service-button">
                <img src="../public/service image buttons/wall.svg" className="drywall-icon"></img>
                <span>DRYWALL FLOOR & CONCRETE DECALS</span>
                </a>
            </div>
            <div className="fleet-graphic-button">
                <a href="/fleet-graphics" className="fleet-service-button">
                <img src="../public/service image buttons/box truck.svg" className="fleet-icon"></img>
                <span>VEHICLE FLEET & DECALED GRAPHICS</span></a>
            </div>
          </div>
</div>
<div className="logo-message-container">
<label className="message-logo-label">Message: </label>
<h1 className="message-logo-note">Tell us about your logo and how you want it designed! Please specify if you need
  more specifications about your logo like if you want us to 
  design it with new colors, traces, shapes, icons, etc...,
If you need drop by to direct us to your new design, our shop is located on
723 N. Wall St, Calhoun GA, 30701. Please note that we are open Monday-Friday 8:00am-4:00pm EST and once 
we are closed, we will respond the next business day. Please also note that we do not work on Saturdays, Sundays, or Holidays.
  </h1>

<textarea className="message-logo-text" name="message" type="text" placeholder="Enter Message"
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
  <button type="submit" className="btn-logo-submit btn--full submit-logo" onClick={handleSubmit}>SUBMIT NEW LOGO</button>
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
              <li><a className="footer-material-nav-link" href="/contact-us">Contact Us</a></li>
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
export default Logo;
