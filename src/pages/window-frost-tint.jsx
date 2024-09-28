import React, { useState, useEffect } from 'react';
import '../css/window.css';
import '../css/headerfooter.css';
import axios from 'axios';
import MXWindowGal from '../components/MXWindowGal'
import Header from '../components/headerviews/HeaderWindow';

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
  const sizeOptions = [
    { name: 'Select Measurement', disabled: true }, // Add this default option
    { name: 'Feet', disabled: false },
    { name: 'Inches', disabled: false },
  ];
  const windowOptions = [
    { name: 'Select Tint', disabled: true }, // Default option
    { name: 'Black Out', disabled: false },
    { name: 'White Out', disabled: false },
    { name: 'White Frost', disabled: false },
    { name: 'Reflective', disabled: false },
    { name: 'Sputter Bronze', disabled: false },
    { name: 'Panashield', disabled: false }
  ];

const Window = () => {
    const [phone, setPhone] = useState('');
            const [selectedSize, setSelectedSize] = useState('');
            const [addedSizes, setAddedSizes] = useState([]);
            const [lengthUnit, setLengthUnit] = useState(''); // Default to feet
            const [widthUnit, setWidthUnit] = useState(''); // Default to feet
            const [availablewindowOptions, setAvailablewindowOptions] = useState(windowOptions);
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
              length: '',
              width: '',
              stand: null,
              finishing: null,
              img: null,
              message: ''
            });
            const [errors, setErrors] = useState({});
            const [submissionMessage, setSubmissionMessage] = useState('');
            const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
            const handleStateChange = (e) => {
              setSelectedState(e.target.value);
              setErrors({ ...errors, state: '' }); // Clear state error when state changes
            };
            const handlePhoneChange = (event) => {
              const input = event.target.value;
              const formatted = input.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
              setPhone(formatted);
              setFormData({ ...formData, phone: formatted });
            };
          const handleSizeChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
          };
        
          // Handle Feet/Inches dropdown change
          const handleUnitChange = (type, unit) => {
            if (type === 'length') {
              setLengthUnit(unit);
            } else if (type === 'width') {
              setWidthUnit(unit);
            }
          };
        
          const handleOptionChange = (type, value) => {
            setFormData({ ...formData, [type]: value });
          };

            const handleSubmit = async (e) => {
              e.preventDefault();
              const requiredFields = ['first', 'last', 'company', 'email', 'phone', 'address', 'city', 'state', 'zip', 'length', 'width', 'message'];
    const newErrors = {};
          
            
              requiredFields.forEach(field => {
                if (!formData[field]) {
                  let fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
                  if (field === 'first') fieldLabel = 'First Name';
                  if (field === 'last') fieldLabel = 'Last Name';
                  if (field === 'company') fieldLabel = 'Company Name';
                  if (field === 'phone') fieldLabel = 'Phone Number';
                  if (field ==='address') fieldLabel = 'Address';
                  if (field === 'city') fieldLabel = 'City';
                  if (field ==='state') fieldLabel = 'State';
                  if (field === 'zip') fieldLabel = 'Zip Code';
                  if (field === 'img') fieldLabel = 'Logo';
                  newErrors[field] = `${fieldLabel} is required!`;
                }
              });
          
              if (Object.keys(newErrors).length > 0) {
                  setErrorMessage('Required fields are Missing.');
                setErrors(newErrors);
                return;
              }
          
              try {
                const sizeData = {
                  length: `${formData.length} ${lengthUnit}`,
                  width: `${formData.width} ${widthUnit}`
                };
                const windowData = {
                    window: `${formData.window} ${windowUnit}`,
                    finish: `${formData.finish} ${finishUnit}`
                  };
                const formDataToSend = {
                  ...formData,
                  size: sizeData,
                };
                const response = await axios.post('/window-frost-tint', formDataToSend, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                });
                console.log(response.data);
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
                  length: '',
                  width: '',
                  stand: null,
                  finishing: null,
                  img: null,
                  message: ''
                });
          
                setErrors({});
                setPhone('');
                setSubmissionMessage('Window Frost/Tinting Request Submitted! We will be with you within 48 hours!');
              } catch (error) {
                console.error('Error submitting Window Job:', error);
              }
            };
            return (
                <div>
                    <Header />
                    <main>
                        <div className="page-window-container">
                        <div className="window-name-container">
                        <h1 className="window-description">WINDOW FROSTING & TINTING</h1>
                            </div>
                        </div>
                        <div className="photo-gal-window">
        <MXWindowGal /> {/* Render the photo gallery here */}
        </div>
        <form className="window-set -- box" onSubmit={handleSubmit}>
            <div className="window-form-container container--narrow page-section">
                <div className="window-form-info">
                    <h1 className="window-app-box">SEND AN INQUIRY OR GET A QUOTE</h1>
                    <h2 className="window-fill">Please Fill Out the Form Below to Submit Your Custom Window Frost or Tinting
                        Information to get an Inquiry or Quote.</h2>
                </div>
                <div className="window-actual">
<label className="first-window-name-label">Name: </label>
<div className="first-name-window-input">

  <div className="first-window-name">
    <div className="firstname-window-input">
    <div className="input-first-window-container">
<label className="first-window-label-name">First Name *</label>
<input
name="first"
type="text"
className="firstname-window-name-input"
text="first-name--input"
placeholder="Enter First Name"

value={formData.first}
onChange={(e) => setFormData({ ...formData, first: e.target.value })}

/>


</div>
    </div>
  </div>
  <div className="last-window-name">
    <div className="last-window-input">
    <div className="last-window-input-container">
<label className="last-window-label-name">Last Name *</label>
<input
name="last"
type="text"
className="lastname-window-name-input"
text="last-name--input"
placeholder="Enter Last Name"

value={formData.last}
onChange={(e) => setFormData({ ...formData, last: e.target.value })}

/>
{errors.last && <div className="error-message">{errors.last}</div>}
</div>
    </div>
  </div>
</div>

<label className="window-company-label">Company/Excavator: </label>

<div className="company-window-input">
  <div className="company-window">
    <div className="window-company-name-input">
    <div className="window-input-container">
      <label className="company-window-name">Company *</label>
      <input name="company-window-name-input" type="text" className="company-window-name-input" text="company--input" placeholder="Enter Company Name"
        value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}

        />
        {errors.company && <span className="error-message">{errors.company}</span>}
        </div>
    </div>
  </div>
  </div>

<label className="emailphone-window-label">Email/Phone Number:</label>
<div className="emailphone-window-input">
  <div className="email-window">
    <div className="email-window-input">
    <div className="email-window-input-container">
<label className="email-window-name">Email *</label>
<input
name="email"
type="text"
className="email-window-box"
text="email--input"
placeholder="Enter Email"

value={formData.email}
onChange={(e) => setFormData({ ...formData, email: e.target.value })}

/>
{errors.email && <div className="error-message">{errors.email}</div>}
</div>
    </div>
  </div>

  <div className="phone-window">
    <div className="window-phone-name-input">
    <div className="window-phone-input-container">
<label className="phone-window-label">Phone Number *</label>
<input
name="phone"
type="text"
className="phone-window-box"
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

<label className="address-window-label">Company Address: </label>
<div className="address-window-input-container">
<div className="address-window-input">
<div className="address-window-container">
  <div className="address-window-inputing">
<label className="addr-window-label">Address *</label>
<input
name="address-box"
type="text"
className="address-window-box"
text="address--input"
placeholder="Enter Address"
value={formData.address}
onChange={(e) => setFormData({ ...formData, address: e.target.value })}
/>
{errors.address && <span className="error-message">{errors.address}</span>}
</div>
<div className="city-window-input">
<label className="city-window-label">City *</label>

<input
name="city-input"
type="text"
className="city-window-box"
text="city--input"
placeholder="City"
value={formData.city}
onChange={(e) => setFormData({ ...formData, city: e.target.value })}
/>
{errors.city && <span className="error-message">{errors.city}</span>}
</div>
</div>
<div className="city-window-state">
<div className="state-window-input">
<label className="state-window-label">State *</label>
<select
      name="state"
      className="state-window-box"
      
      value={formData.state}
      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
    >
      <option value="">Select State</option>
      {states.map(state => (
        <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
      ))}
    </select>
    {errors.state && <span className="error-message">{errors.state}</span>}
    </div>
    <div className="zip-window-input">
<label className="zip-window-label">Zip Code *</label>
<input
        name="zip"
        type="text"
        className="zip-window-box"
        value={formData.zip}
        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
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
<label className="size-window-label">Size of Window:</label>
<div className="size-window-section">
  <div className="length-window-section">
    <label className="length-label" htmlFor="length">Length *</label>
    <input
      className="length-window-box"
      type="number"
      name="length"
      value={formData.length}
      onChange={handleSizeChange}
      placeholder="Enter length"
    />
    <select
      className="length-select"
      value={lengthUnit}
      onChange={(e) => handleUnitChange('length', e.target.value)}
    >
      <option value="" disabled>Select Measurement</option> {/* Default option */}
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
  </div>

  <div className="width-window-section">
    <label className="width-label" htmlFor="width">Width *</label>
    <input
      className="width-window-box"
      type="number"
      name="width"
      value={formData.width}
      onChange={handleSizeChange}
      placeholder="Enter width"
    />
    <select
      className="width-select"
      value={widthUnit}
      onChange={(e) => handleUnitChange('width', e.target.value)}
    >
      <option value="" disabled>Select Measurement</option> {/* Default option */}
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
  </div>
  <div className="border-window-section">
    <label className="border-label" htmlFor="border">Border Radius*</label>
    <input
      className="border-window-box"
      type="number"
      name="border"
      value={formData.border}
      onChange={handleSizeChange}
      placeholder="Enter width"
    />
    <select
      className="border-select"
      value={widthUnit}
      onChange={(e) => handleUnitChange('width', e.target.value)}
    >
      <option value="" disabled>Select Measurement</option> {/* Default option */}
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
  </div>

  <button className="btn btn--full submit-window-size" type="submit">SUBMIT SIZE</button>

  {submissionMessage && <p>{submissionMessage}</p>}
  {Object.keys(errors).map((error) => (
    <p key={error} className="error-message">{errors[error]}</p>
  ))}
</div>
<label className="place-window-label">Types of Frost/Tint:</label>
<div className="placement-imgs">
    <div className="place-img-container">
        <h1 className="place-examples">Placement Examples</h1>
    </div>
<div className="place-flex-container">
    <div className="place-img-container">
        <img src="../public/window tinting types/black out.png" alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Black Out</h3>
</div>
<div className="place-img-container">
        <img src="../public/window tinting types/white out.png" alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">White Out</h3>
</div>
<div className="place-img-container">
        <img src="../public/window tinting types/white frost.png" alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">White Frost</h3>
</div>
<div className="place-img-container">
        <img src="../public/window tinting types/reflective.png" alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Reflective</h3>
</div>
<div className="place-img-container">
        <img src="../public/window tinting types/Panashield.png" alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Panashield</h3>
</div>
<div className="place-img-container">
        <img src="../public/window tinting types/sputterd bronze.png" alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Sputtered Bronze</h3>
</div>
    </div>
</div>
      <div className="place-window-section">
        <label className="place-label" htmlFor="place">Placement *</label>
        <select
          className="place-select"
          value={formData.type}
          onChange={(e) => handleOptionChange('type', e.target.value)}
        >
          {availablewindowOptions.map((option, index) => (
            <option key={index} value={option.name} disabled={option.disabled}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

<div className="window-message-container">
<label className="message-window-label">Message: </label>
<h1 className="message-window-note">Tell us about your window frost/tinting job and how you want it designed! Is your frost/tint going
    into your home, office building, etc...? If you need
to request a crew to help install your Window Frosting/Tinting, please specify where the location is, when 
and what time you want an MX crew will arrive.</h1>

<textarea className="message-window-text" name="message" type="text" placeholder="Enter Message"
  value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
  />
  {errors.message && <span className="error-message">{errors.message}</span>}
  {submissionMessage && (
<div className="submission-message">{submissionMessage}</div>
)}
  </div>
  <button type="button" className="btn btn--full submit-window" onClick={handleSubmit}>SUBMIT WINDOW FROSTING/TINTING</button>
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
            <img className="mx-img" alt="TBS logo" src="../public/MX Photos/MX-removebg-preview.png" />
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
export default Window
