import React, { useState, useEffect } from 'react';
import '../css/banner.css';
import '../css/headerfooter.css';
import axios from 'axios';
import MXBannerGallery from '../components/photos/MXBannerGallery'
import Header from '../components/headerviews/HeaderBanner';

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
  const bannerOptions = [ 
    { name: 'Retractable Stand', disabled: false },
    { name: 'Grommet Pressed', disabled: false },
    { name: 'Reinforced Hemmed', disabled: false },
    { name: 'Pole Pockets', disabled: false },
    { name: 'Wind Slits', disabled: false },
    { name: 'Velcro Taped', disabled: false },
    { name: 'Webbing Ringed', disabled: false },
    { name: 'Roped', disabled: false },
  ];

  
  const finishOptions = [
    { name: 'Matte', disabled: false },
    { name: 'Gloss', disabled: false }
  ];
const Banner = () => {
    const [phone, setPhone] = useState('');
            const [selectedSize, setSelectedSize] = useState('');
            const [addedSizes, setAddedSizes] = useState([]);
            const [addedFinishes, setAddedFinishes] = useState([]);
            const [addedPlaces, setAddedPlaces] = useState([]);
            const [lengthUnit, setLengthUnit] = useState(''); // Default to feet
            const [widthUnit, setWidthUnit] = useState(''); // Default to feet
            const [availablefinishOptions] = useState(finishOptions);
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
              bannerSize: { length: '', width: '' },
              hang: '',
              finishing: '',
              img: null,
              message: ''
            });
            const [errors, setErrors] = useState({});
            const [submissionMessage, setSubmissionMessage] = useState('');
            const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
            const handleAddSize = () => {
              if (formData.length && formData.width && lengthUnit && widthUnit) {
                const newSize = {
                  length: `${formData.length} ${lengthUnit}`,
                  width: `${formData.width} ${widthUnit}`,
                };
                setAddedSizes([...addedSizes, newSize]); // Add new size to the state
                setFormData({ ...formData, length: '', width: '' }); // Clear input fields
                setErrors((prevErrors) => ({ ...prevErrors, bannerSize: '' })); // Clear size error
              } else {
                setErrorMessage('Please provide valid length, width, and measurement units.');
              }
            };
            const handleRemoveSize = (index) => {
              const updatedSizes = addedSizes.filter((_, i) => i !== index);
              setAddedSizes(updatedSizes); // Update state after removing the size
            };
            const handleAddPlacement = () => {
              if (formData.hang) {
                setAddedPlaces([...addedPlaces, { hang: formData.hang }]); // Add placement
                setFormData({ ...formData, hang: '' }); // Clear the selection
                setErrors((prevErrors) => ({ ...prevErrors, hang: '' })); // Clear placement error
              } else {
                setErrorMessage('Please select a placement type.');
              }
            };
            const handleRemovePlace = (index) => {
              const updatedPlaces = addedPlaces.filter((_, i) => i !== index);
              setAddedPlaces(updatedPlaces); // Update state after removing the placement
            };
            const handleAddFinish = () => {
              if (formData.finishing) {
                setAddedFinishes([...addedFinishes, { name: formData.finishing }]); // Add finish
                setFormData({ ...formData, finishing: '' }); // Clear the selection
                setErrors((prevErrors) => ({ ...prevErrors, finishing: '' })); // Clear finishing error
              } else {
                setErrorMessage('Please select a finishing option.');
              }
            };
            const handleRemoveFinish = (index) => {
              const updatedFinishes = addedFinishes.filter((_, i) => i !== index);
              setAddedFinishes(updatedFinishes); // Update state after removing the finish
            };
            
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
              setErrors((prevErrors) => ({ ...prevErrors, img: '' })); // Clear image error
            };
          const handleFileRemove = (fileType) => {
            setFormData({ ...formData, [fileType]: null });
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
            let hasErrors = false;
          
            // Validate size
            if (addedSizes.length === 0) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                bannerSize: 'Please add at least one banner size.',
              }));
              hasErrors = true;
            } else {
              setErrors((prevErrors) => ({
                ...prevErrors,
                bannerSize: '',
              }));
            }
          
            // Validate placement
            if (addedPlaces.length === 0) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                hang: 'Please add at least one banner placement.',
              }));
              hasErrors = true;
            } else {
              setErrors((prevErrors) => ({
                ...prevErrors,
                hang: '',
              }));
            }
          
            // Validate finishing
            if (addedFinishes.length === 0) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                finishing: 'Please add at least one banner finishing option.',
              }));
              hasErrors = true;
            } else {
              setErrors((prevErrors) => ({
                ...prevErrors,
                finishing: '',
              }));
            }
          
            // Validate image
            if (!formData.img) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                img: 'Please select an image/PDF/SVG file for your banner.',
              }));
              hasErrors = true;
            } else {
              setErrors((prevErrors) => ({
                ...prevErrors,
                img: '',
              }));
            }
          
            // Validate other required fields (as you already do)
            const requiredFields = ['first', 'last', 'company', 'email', 'phone', 'address', 'city', 'state', 'zip', 'message'];
            const newErrors = {};
            requiredFields.forEach((field) => {
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
          
            if (Object.keys(newErrors).length > 0) {
              setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
              return;
            }
          
            if (hasErrors) {
              return;
            }
          
            try {
              // Create FormData instance to handle file upload
              const formDataToSend = new FormData();
              formDataToSend.append('first', formData.first);
              formDataToSend.append('last', formData.last);
              formDataToSend.append('company', formData.company);
              formDataToSend.append('email', formData.email);
              formDataToSend.append('phone', formData.phone);
              formDataToSend.append('address', formData.address);
              formDataToSend.append('city', formData.city);
              formDataToSend.append('state', formData.state);
              formDataToSend.append('zip', formData.zip);
              formDataToSend.append('message', formData.message);
          
              // Append the image file (logo)
              if (formData.img) {
                formDataToSend.append('img', formData.img);
              }
          
              // Append banner size as a formatted string like "2 feet x 2 feet"
              const formattedSizes = addedSizes.map((size) => `${size.length} x ${size.width}`).join(', ');
              formDataToSend.append('bannerSize', formattedSizes);
          
              // Append placement as a single string (assuming there's only one placement)
              const formattedPlacement = addedPlaces.map((place) => place.hang).join(', ');
              formDataToSend.append('hang', formattedPlacement);
          
              // Append finishing as a single string (assuming there's only one finishing)
              const formattedFinishing = addedFinishes.map((finish) => finish.name).join(', ');
              formDataToSend.append('finishing', formattedFinishing);
          
              const response = await axios.post('/banners', formDataToSend, {
                headers: {
                  'Content-Type': 'multipart/form-data', // Ensure multipart/form-data is set
                },
              });
          
              console.log(response.data);
              setSubmissionMessage('Banner Request Submitted!');
          
              // Reset form fields after successful submission
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
                bannerSize: {length: '', width: ''},
                hang: '',
                finishing: '',
                img: null,
                message: ''
              });
              setAddedSizes([]);
              setErrors({});
              setPhone('');
              setAddedPlaces([]);
              setAddedFinishes([]);
            } catch (error) {
              console.error('Error submitting Banner Request:', error);
              setSubmissionErrorMessage('There was an error submitting your request. Please try again.');
            }
          };
          
            return (
                <div>
                    <Header />
                    <main>
                        <div className="page-banner-container">
                        <div className="banner-name-container">
                        <h1 className="banner-description">BANNERS</h1>
                            </div>
                        </div>
                        <div className="photo-gal-banner">
        <MXBannerGallery /> {/* Render the photo gallery here */}
        </div>
        <form className="banner-set -- box" onSubmit={handleSubmit}>
            <div className="banner-form-container container--narrow page-section">
                <div className="banner-form-info">
                    <h1 className="banner-app-box">SEND AN INQUIRY OR GET A QUOTE</h1>
                    <h2 className="banner-fill">Please Fill Out the Form Below to Submit Your Custom Banner
                        Information to get an Inquiry or Quote.</h2>
                </div>
                <div className="banner-actual">
                  <div className="name-section-banner">
<label className="first-banner-name-label">Name: </label>
<div className="first-name-banner-input">

  <div className="first-banner-name">
    <div className="firstname-banner-input">
    <div className="input-first-banner-container">
<label className="first-banner-label-name">First Name *</label>
<input
name="first"
type="text"
className="firstname-banner-name-input"
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
  <div className="last-banner-name">
    <div className="last-banner-input">
    <div className="last-banner-input-container">
<label className="last-banner-label-name">Last Name *</label>
<input
name="last"
type="text"
className="lastname-banner-name-input"
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
<div className="company-banner-section">
<label className="banner-company-label">Company/Excavator: </label>
<div className="company-banner-input">
  <div className="company-banner">
    <div className="banner-company-name-input">
    <div className="banner-input-container">
      <label className="company-banner-name">Company *</label>
      <input name="company-banner-name-input" type="text" className="company-banner-name-input" text="company--input" placeholder="Enter Company Name"
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
<div className="emailphone-banner-section">
<label className="emailphone-banner-label">Email/Phone Number:</label>
<div className="emailphone-banner-input">
  <div className="email-banner">
    <div className="email-banner-input">
    <div className="email-banner-input-container">
<label className="email-banner-name">Email *</label>
<input
name="email"
type="text"
className="email-banner-box"
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

  <div className="phone-banner">
    <div className="banner-phone-name-input">
    <div className="banner-phone-input-container">
<label className="phone-banner-label">Phone Number *</label>
<input
name="phone"
type="text"
className="phone-banner-box"
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
<div  className="address-banner-section">
<label className="address-banner-label">Company Address: </label>
<div className="address-banner-input-container">
<div className="address-banner-input">
<div className="address-banner-container">
  <div className="address-banner-inputing">
<label className="addr-banner-label">Address *</label>
<input
name="address-box"
type="text"
className="address-banner-box"
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
<div className="city-banner-input">
<label className="city-banner-label">City *</label>

<input
name="city-input"
type="text"
className="city-banner-box"
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
<div className="city-banner-state">
<div className="state-banner-input">
<label className="state-banner-label">State *</label>
<select
      name="state"
      className="state-banner-box"
      
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
    <div className="zip-banner-input">
<label className="zip-banner-label">Zip Code *</label>
<input
        name="zip"
        type="text"
        className="zip-banner-box"
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
<div className="size-banner-vinyl-section">
<label className="size-banner-label">Size of Banner:</label>
<div className="size-banner-section">
  <div className="length-banner-section">
    <label className="length-banner-label" htmlFor="length">Length *</label>
    <input
      className="length-banner-box"
      type="number"
      name="length"
      value={formData.length}
      onChange={handleSizeChange}
      placeholder="Enter length"
    />
    <select
      className="length-banner-select"
      value={lengthUnit}
      onChange={(e) => handleUnitChange('length', e.target.value)}
    >
      <option value="" disabled>Select Measurement</option> {/* Default option */}
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
  </div>

  <div className="width-banner-section">
    <label className="width-banner-label" htmlFor="width">Width *</label>
    <input
      className="width-banner-box"
      type="number"
      name="width"
      value={formData.width}
      onChange={handleSizeChange}
      placeholder="Enter width"
    />
    <select
      className="width-banner-select"
      value={widthUnit}
      onChange={(e) => handleUnitChange('width', e.target.value)}
    >
      <option value="" disabled>Select Measurement</option> {/* Default option */}
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
  </div>

  <button className="btn btn--full submit-banner-size" type="button" onClick={handleAddSize}>ADD SIZE</button>
  <div className="size-banner-list">
  <ul>
    {addedSizes.length > 0 ? (
      addedSizes.map((size, index) => (
        <li className="size-banner-item" key={index}>
          Length: {size.length}, Width: {size.width}
          <button className="btn btn--full remove-size" onClick={() => handleRemoveSize(index)}>REMOVE SIZE</button>
        </li>
      ))
    ) : (
      <p className="no-added-banner-size">No sizes added yet.</p>
    )}
  </ul>
</div>
      {errors.bannerSize && <span className="error-message">{errors.bannerSize}</span>}
</div>
</div>
<div className="placement-banner-section">
<label className="place-banner-label">Types of Banner Placements:</label>
<div className="placement-imgs">
    <div className="place-img-container">
        <h1 className="place-examples">Placement Examples</h1>
    </div>
<div className="place-flex-container">
<div className="place-img-container">
        <img src="../public/banner types/retract.png" alt="Placement=photo" className="place-banner-img"/>
        <h3 className="place-img-test">Retractable Stand</h3>
        <p className="retract-img-test">Retractable Stands are regular printed banners only they are not worked on by any of the banner types.
          Instead, they are placed on a retractable stand that can be pulled out and retracted when needed and are great for events and trade shows.
          You can close the banner up and store it in a bag when not in use and move it around easily.
        </p>
  </div>
  <div className="place-img-container">
        <img src="../public/banner types/banner types.jpg" alt="Placement=photo" className="place-banner-type-img"/>
        <h3 className="place-img-test">Banner Types</h3>
  </div>
    </div>
</div>
      <div className="place-banner-section">
        <label className="place-label" htmlFor="hang">Placement *</label>
        <select
          className="place-select"
          value={formData.hang}
          onChange={(e) => handleOptionChange('hang', e.target.value)}
        >
          <option value="" disabled>Select Placement</option>
          {bannerOptions.map((option, index) => (
            <option key={index} value={option.name} disabled={option.disabled}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn--full submit-banner-place" type="button" onClick={handleAddPlacement}>ADD PLACEMENT</button>
      <div className="place-banner-list">
  <ul>
    {addedPlaces.length > 0 ? (
      addedPlaces.map((hang, index) => (
        <li className="hang-item" key={index}>
          {hang.hang}
          <button className="btn btn--full remove-banner-place" onClick={() => handleRemovePlace(index)}>REMOVE PLACEMENT</button>
        </li>
      ))
    ) : (
      <p className="no-added-banner-place">No placements added yet.</p>
    )}
  </ul>
</div>
          {errors.hang && <span className="error-message">{errors.hang}</span>}
          </div>
          <div className="finishing-banner-section">
      <label className="finish-banner-label">Finishing Touch:</label>
      <div className="finish-banner-section">
        <label className="finish-label" htmlFor="finish">Finishing *</label>
        <select
          className="finish-banner-select"
          value={formData.finishing}
          onChange={(e) => handleOptionChange('finishing', e.target.value)}
        >
          <option value="" disabled>Select Finishing</option>
          {availablefinishOptions.map((option, index) => (
            <option key={index} value={option.name} disabled={option.disabled}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn--full submit-banner-finish" type="button" onClick={handleAddFinish}>ADD FINISHING</button>
      <div className="finish-banner-list">
  <ul>
    {addedFinishes.length > 0 ? (
      addedFinishes.map((finish, index) => (
        <li className="finish-item" key={index}>
          {finish.name}
          <button className="btn btn--full remove-banner-finish" onClick={() => handleRemoveFinish(index)}>REMOVE FINISHING</button>
        </li>
      ))
    ) : (
      <p className="no-added-banner-finish">No finishes added yet.</p>
    )}
  </ul>
</div>
          {errors.finishing && <span className="error-message">{errors.finishing}</span>}
          </div>
          <div className="banner-file-section">
<label className="banner-file-label">Logo/Image:</label>
<h2 className="banner-warn"><b className="banner-notice">NOTICE</b>: If you're submitting a PNG, JPG, or any file that has PIXELATED Images, there will be a vectorizing fee to vectorize your logo depending on 
    how long it takes us to vectorize. If you want to avoid the vectorization fee, it is better to submit PDFs or SVGs that already have vectorization inside. 
    These PDF/SVG files cannot have any PNGs or JPGs inside because the PDF/SVG have been exported or saved as a PDF/SVG but has a JPG/PNG file inside making it much worse to vectorize. 
    JPG/PNG files are compressed Image files making them Blurry and Pixelated. That is why vectorization plays an important role in order for your items to not print blurry or pixelated.
    <p className="log-re">Logo Redesigning(Optional)</p>
    <p className="logo-warn"><b className="logo-notice">NOTICE</b>: If you need us to design a new logo for you, you can submit your old logo on
    here: <a href="/new-logo" className="btn -- new-banner-logo-button">NEW LOGO</a>
    We will send you a quote for the logo redesigning and you can choose to accept it or not.
</p>
</h2>
<div className="file-banner-section">
<label htmlFor="logo-select" className="banner-logo">Logo/Image for Graphics *</label>
<div className="choose-logo-contain">
    <label className="file-banner-label">
    {formData.img ? (
            <span>{formData.img.name}</span>
          ) : (
            <span>Choose Your Logo For Your Graphics</span>
          )}
          <input type="file" name="img" accept=".pdf,.svg,.doc,.png,.jpg,.jpeg" onChange={(e) => {
    handleFileChange(e, 'img');
    if (e.target.files[0]) {
      setErrors((prevErrors) => ({ ...prevErrors, img: '' })); // Clear the error
    }
  }} />
          </label>
          {formData.img && (
            <button type="button" className="remove-banner-file-button" onClick={() => handleFileRemove('img')}>Remove</button>
          )}
        
        {errors.img && <span className="error-message">{errors.img}</span>}
</div>
</div>
</div>
<div className="banner-message-container">
<label className="message-banner-label">Message: </label>
<h1 className="message-banner-note">Tell us about your graphics and how you want it designed! Please Specify Logo Redesigning,
     and the Quantity of graphics needed. If you need
to request a crew to help install your banners, please specify where the location is, when 
and what time you want an MX crew will arrive.</h1>

<textarea className="message-banner-text" name="message" type="text" placeholder="Enter Message"
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
  <button type="button" className="btn btn--full submit-banner" onClick={handleSubmit}>SUBMIT CUSTOM BANNER</button>
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
export default Banner;
