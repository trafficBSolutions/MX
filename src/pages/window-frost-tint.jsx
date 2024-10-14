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
    { name: 'Black Out', disabled: false },
    { name: 'White Out', disabled: false },
    { name: 'White Frost', disabled: false },
    { name: 'Reflective', disabled: false },
    { name: 'Sputter Bronze', disabled: false },
    { name: 'Panashield', disabled: false }
  ];

const Window = () => {
    const [phone, setPhone] = useState('');
            const [lengthUnit, setLengthUnit] = useState(''); // Default to feet
            const [widthUnit, setWidthUnit] = useState(''); // Default to feet
            const [borderUnit, setBorderUnit] = useState(''); // Default to inches
            const [availablewindowOptions] = useState(windowOptions);
            const [addedSizes, setAddedSizes] = useState([]);  // To store multiple sizes
            const [addedTint, setAddedTint] = useState([]);  // To store multiple tint/frost selections
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
              windowSize: { length: '', width: '', border: '' },
              tint: '',
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
            const handleOptionChange = (type, value) => {
              setFormData({ ...formData, [type]: value });
            };
            const handleAddSize = () => {
              const { windowSize } = formData;
          
              if (windowSize.length && windowSize.width && windowSize.border && lengthUnit && widthUnit && borderUnit) {
                // Create a new size string with units
                const newSize = {
                  length: `${windowSize.length} ${lengthUnit}`,
                  width: `${windowSize.width} ${widthUnit}`,
                  border: `${windowSize.border} ${borderUnit}`,
                };
          
                // Add the new size to the list
                setAddedSizes([...addedSizes, newSize]);
          
                // Clear the error if the size was valid
                setErrors((prevErrors) => ({ ...prevErrors, windowSize: '' }));
          
                // Clear the form inputs after adding
                setFormData((prevState) => ({
                  ...prevState,
                  windowSize: { length: '', width: '', border: '' }
                }));
                setLengthUnit('');
                setWidthUnit('');
                setBorderUnit('');
              } else {
                setErrorMessage('Please enter valid Length, Width, Border, and their units.');
              }
            };
          
            // Function to handle removing window size
            const handleRemoveSize = (index) => {
              const updatedSizes = addedSizes.filter((_, i) => i !== index);  // Remove the selected size
              setAddedSizes(updatedSizes);
            };
            const handleAddTint = () => {
              if (formData.tint) {
                setAddedTint([...addedTint, formData.tint]);  // Add the selected tint
                setFormData({ ...formData, tint: '' });  // Reset the tint input
          
                // Clear the error if the tint was valid
                setErrors((prevErrors) => ({ ...prevErrors, tint: '' }));
              }
            };
          
            // Function to handle removing tint/frost option
            const handleRemoveTint = (index) => {
              const updatedTints = addedTint.filter((_, i) => i !== index);  // Remove the selected tint
              setAddedTint(updatedTints);
            };
          
            // Function to handle form submission
            const handleSubmit = async (e) => {
              e.preventDefault();
            
              // Reset messages before validation
              setSubmissionErrorMessage('');
              setSubmissionMessage('');
            
              // Required fields
              const requiredFields = ['first', 'last', 'company', 'email', 'phone', 'address', 'city', 'state', 'zip', 'message'];
            
              // Prepare newErrors object to track missing fields
              const newErrors = {};
            
              // Loop through required fields and check if they are missing
              requiredFields.forEach((field) => {
                if (!formData[field] || formData[field].trim() === '') {
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
            
              // Validate window size and tint options
              if (addedSizes.length === 0) {
                newErrors.windowSize = 'Please add at least one window size (Length, Width, and Border).';
              }
              if (addedTint.length === 0) {
                newErrors.tint = 'Please add at least one frost/tint option.';
              }
            
              // If there are errors, set error messages and stop form submission
              if (Object.keys(newErrors).length > 0) {
                setErrorMessage('Required fields are missing.');
                setErrors(newErrors);
                return;
              }
            
              // If no errors, clear the error message
              setErrorMessage('');
              setErrors({});
            
              // Convert addedSizes array to a formatted string for submission
              const formattedWindowSize = addedSizes
                .map(size => `Length: ${size.length}, Width: ${size.width}, Border: ${size.border}`)
                .join(' | ');
            
              // If no errors, proceed with submission
              try {
                const formDataToSend = {
                  ...formData,
                  windowSize: formattedWindowSize, // Join the added sizes array into a string
                  tint: addedTint.join(', '),      // Join the added tints array into a string
                };
            
                const response = await axios.post('/window-frost-tint', formDataToSend, {
                  headers: {
                    'Content-Type': 'application/json', // Make sure the Content-Type is correct
                  },
                });
            
                // Reset form after successful submission
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
                  windowSize: { length: '', width: '', border: '' },
                  tint: '',
                  message: '',
                });
                setAddedSizes([]);  // Clear added sizes
                setAddedTint([]);   // Clear added tints
                setErrors({});
                setPhone('');
                setSubmissionMessage('Window Frost/Tinting Request Submitted! We will be with you within 48 hours!');
              } catch (error) {
                console.log('Submission Error:', error);
                setSubmissionErrorMessage('There was an error submitting your request. Please try again later.');
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
                  <div className="name-section-window">
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
<div className="company-window-section">
<label className="window-company-label">Company/Excavator: </label>

<div className="company-window-input">
  <div className="company-window">
    <div className="window-company-name-input">
    <div className="window-input-container">
      <label className="company-window-name">Company *</label>
      <input name="company-window-name-input" type="text" className="company-window-name-input" text="company--input" placeholder="Enter Company Name"
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
<div className="emailphone-window-section">
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
<div className="address-window-section">
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
onChange={(e) => {
  setFormData({ ...formData, address: e.target.value });
  if (e.target.value) {
    setErrors((prevErrors) => ({ ...prevErrors, address: '' })); // Clear the error
  }
}}
/>
{errors.address && <div className="error-message">{errors.address}</div>}
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
onChange={(e) => {
  setFormData({ ...formData, city: e.target.value });
  if (e.target.value) {
    setErrors((prevErrors) => ({ ...prevErrors, city: '' })); // Clear the error
  }
}}
/>
{errors.city && <div className="error-message">{errors.city}</div>}
</div>
</div>
<div className="city-window-state">
<div className="state-window-input">
<label className="state-window-label">State *</label>
<select
      name="state"
      className="state-window-box"
      
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
    {errors.state && <div className="error-message">{errors.state}</div>}
    </div>
    <div className="zip-window-input">
<label className="zip-window-label">Zip Code *</label>
<input
        name="zip"
        type="text"
        className="zip-window-box"
        value={formData.zip}
        onChange={(e) => handleZipChange(e)}
        placeholder="Zip Code"
        maxLength={5}
        pattern="\d{5}"
        title="Zip code must be 5 digits"
      />
      {errors.zip && <div className="error-message">{errors.zip}</div>}
</div>
</div>
</div>
</div>
</div>
<div className="window-size-section">
<label className="size-window-label">Size of Window:</label>
<div className="size-window-section">
  <div className="length-window-section">
    <label className="length-window-label" htmlFor="length">Length *</label>
    <input
  className="length-window-box"
  type="number"
  name="length"  // Ensure the name is correct
  value={formData.windowSize.length}
      onChange={(e) => setFormData({ ...formData, windowSize: { ...formData.windowSize, length: e.target.value } })}
  placeholder="Enter length"
/>
    <select
      className="length-window-select"
      value={lengthUnit}
      onChange={(e) => setLengthUnit(e.target.value)}
    >
      <option value="" disabled>Select Measurement</option> {/* Default option */}
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
  </div>

  <div className="width-window-section">
    <label className="width-window-label" htmlFor="width">Width *</label>
    <input
  className="width-window-box"
  type="number"
  name="width"  // Ensure the name is correct
  value={formData.windowSize.width}
      onChange={(e) => setFormData({ ...formData, windowSize: { ...formData.windowSize, width: e.target.value } })}
  placeholder="Enter Width"
/>
    <select
      className="width-window-select"
      value={widthUnit}
      onChange={(e) => setWidthUnit(e.target.value)}
    >
      <option value="" disabled>Select Measurement</option> {/* Default option */}
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
  </div>
  </div>
  <div className="border-window-section">
  <label className="border-label" htmlFor="border">Border Radius*</label>
  <input
  className="border-window-box"
  type="number"
  name="border"  // Ensure the name is correct
  value={formData.windowSize.border}
  onChange={(e) => setFormData({ ...formData, windowSize: { ...formData.windowSize, border: e.target.value } })}
  placeholder="Enter Border Radius"
  step="0.01"
  min="0.00"
/>

  <select
    className="border-select"
    value={borderUnit}
      onChange={(e) => setBorderUnit(e.target.value)}
  >
    <option value="" disabled>Select Measurement</option> {/* Default option */}
    <option value="inches">Inches</option>
  </select>
</div>


<button className="btn btn--full submit-window-size" type="button" onClick={handleAddSize}>
  ADD SIZE
</button>
{errors.windowSize && <div className="error-message">{errors.windowSize}</div>}
  <div className="size-list">
  <ul>
    {addedSizes.length > 0 ? (
      addedSizes.map((size, index) => (
        <li className="size-item" key={index}>
          Length: {size.length}, Width: {size.width}, Border: {size.border}
          <button
            className="btn btn--full remove-size"
            onClick={() => handleRemoveSize(index)}
          >
            REMOVE SIZE
          </button>
        </li>
      ))
    ) : (
      <p className="no-added-size">No sizes added yet.</p>
    )}
  </ul>
</div>


</div>
<div className="window-stand-section">
<label className="place-window-label">Types of Frost/Tint:</label>
<div className="tint-imgs">
    <div className="place-img-container">
        <h1 className="place-examples">Frost/Tint Examples</h1>
    </div>
<div className="place-flex-container">
    <div className="place-img-container">
        <img src="../public/window tinting types/black out.png" alt="tint=photo" className="place-img"/>
        <h3 className="place-img-test">Black Out</h3>
</div>
<div className="place-img-container">
        <img src="../public/window tinting types/white out.png" alt="tint=photo" className="place-img"/>
        <h3 className="place-img-test">White Out</h3>
</div>
<div className="place-img-container">
        <img src="../public/window tinting types/white frost.png" alt="tint=photo" className="place-img"/>
        <h3 className="place-img-test">White Frost</h3>
</div>
<div className="place-img-container">
        <img src="../public/window tinting types/reflective.png" alt="tint=photo" className="place-img"/>
        <h3 className="place-img-test">Reflective</h3>
</div>
<div className="place-img-container">
        <img src="../public/window tinting types/Panashield.png" alt="tint=photo" className="place-img"/>
        <h3 className="place-img-test">Panashield</h3>
</div>
<div className="place-img-container">
        <img src="../public/window tinting types/sputterd bronze.png" alt="tint=photo" className="place-img"/>
        <h3 className="place-img-test">Sputtered Bronze</h3>
</div>
    </div>
</div>
      <div className="place-window-section">
        <label className="place-label" htmlFor="tint">Frost/Tint *</label>
        <select
          className="place-select"
          value={formData.tint}
          onChange={(e) => handleOptionChange('tint', e.target.value)}
        >
          <option value="" disabled>Select Frost/Tint</option>
          {availablewindowOptions.map((option, index) => (
            <option key={index} value={option.name} disabled={option.disabled}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn--full submit-window-place" type="button" onClick={handleAddTint}>
  ADD TINT
</button>
{errors.tint && <div className="error-message">{errors.tint}</div>}
      <div className="tint-list">
  <ul>
    {addedTint.length > 0 ? (
      addedTint.map((tint, index) => (
        <li className="tint-item" key={index}>
          {tint}
          <button
            className="btn btn--full remove-tint"
            onClick={() => handleRemoveTint(index)}
          >
            REMOVE FROST/TINT
          </button>
        </li>
      ))
    ) : (
      <p className="no-added-tint">No added frost/tints yet.</p>
    )}
  </ul>
  </div>
      </div>
<div className="window-message-container">
<label className="message-window-label">Message: </label>
<h1 className="message-window-note">Tell us about your window frost/tinting job and how you want it designed! Is your frost/tint going
    into your home, office building, etc...? If you need
to request a crew to help install your Window Frosting/Tinting, please specify where the location is, when 
and what time you want an MX crew will arrive.</h1>

<textarea className="message-window-text" name="message" type="text" placeholder="Enter Message"
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
  </div>
  <button type="button" className="btn btn--full submit-window" onClick={handleSubmit}>SUBMIT WINDOW FROSTING TINTING</button>
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
              <li><a className="footer-material-nav-link" href="/blog">Blog</a></li>
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
            );
};
export default Window;
