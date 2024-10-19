import React, { useState, useEffect } from 'react';
import '../css/dry.css';
import '../css/headerfooter.css';
import axios from 'axios';
import MXDrywallGallery from '../photogallery/DrywallMXgallery';
import Header from '../components/headerviews/HeaderDry';
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
  const placeOptions = [
    { name: 'Drywall Graphics (Examples: Homes and Office Buildings)', disabled: false },
    { name: 'Floor Graphics', disabled: false },
    { name: 'Concrete Graphics (Examples: Sidewalks and Roads)', disabled: false },
    { name: 'Brick Wall Graphics', disabled: false },
    { name: 'Cinder Block Wall Graphics (School Cinder Block Graphics)', disabled: false }
  ];
  
  const finishOptions = [
    { name: 'Matte', disabled: false },
    { name: 'Gloss', disabled: false }
  ];
const Adhesive = () => {
    const [phone, setPhone] = useState('');
            const [addedvinylSizes, setAddedvinylSizes] = useState([]);
            const [vinylLengthUnit, setVinylLengthUnit] = useState('');
            const [vinylWidthUnit, setVinylWidthUnit] = useState('');
            const [selectedPlacement, setSelectedPlacement] = useState('');
            const [addedPlacement, setAddedPlacement] = useState([]);
            const [selectedFinishing, setSelectedFinishing] = useState('');
            const [addedFinishing, setAddedFinishing] = useState([]);
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
              vinylSize: { length: '', width: '' },
              placement: '',
              finishing: '',
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
            const handleAddFinishing = () => {
              if (selectedFinishing && addedFinishing.length < 2) {
                setAddedFinishing([...addedFinishing, selectedFinishing]);
                setSelectedFinishing('');
                setErrors((prevErrors) => ({ ...prevErrors, finishing: '' }));
              } else {
                setErrorMessage('Please select a finishing option.');
              }
            };
            // Function to remove a finishing
            const handleRemoveFinishing = (index) => {
              const updatedFinishing = addedFinishing.filter((_, i) => i !== index);
              setAddedFinishing(updatedFinishing);
            };
            const handleAddPlacement = () => {
              if (selectedPlacement && addedPlacement.length < 5) {
                setAddedPlacement([...addedPlacement, selectedPlacement]);
                setSelectedPlacement('');
                setErrors((prevErrors) => ({ ...prevErrors, placement: '' }));
              } else {
                setErrorMessage('Please select a placement option.');
              }
            };
            
            
            // Function to remove a placement
            const handleRemovePlacement = (index) => {
              const updatedPlacement = addedPlacement.filter((_, i) => i !== index);
              setAddedPlacement(updatedPlacement);
            };
            const handleAddVinylSize = () => {
              const { vinylSize } = formData;
            
              if (vinylSize.length && vinylSize.width && vinylLengthUnit && vinylWidthUnit) {
                // Create a new size string with units
                const newSize = `${vinylSize.length} ${vinylLengthUnit} x ${vinylSize.width} ${vinylWidthUnit}`;
                
                // Add the new size to the list
                setAddedvinylSizes([...addedvinylSizes, newSize]);
                setErrors((prevErrors) => ({ ...prevErrors, vinylSize: '' }));
                // Clear the form inputs after adding
                setFormData((prevState) => ({
                  ...prevState,
                  vinylSize: { length: '', width: '' }
                }));
                setVinylLengthUnit('');
                setVinylWidthUnit('');
                setErrorMessage(''); // Clear any previous errors
              } else {
                setErrorMessage('Please enter both length, width, and their units.');
              }
            };
            
            const handleRemoveVinylSize = (index) => {
              const updatedVinylSizes = addedvinylSizes.filter((_, i) => i !== index);
              setAddedvinylSizes(updatedVinylSizes);
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
            if (file) {
              setErrors((prevErrors) => ({ ...prevErrors, img: '' }));
          }
          };
          
          const handleFileRemove = (fileType) => {
            setFormData({ ...formData, [fileType]: null });
          };

          const handleSubmit = async (e) => {
            e.preventDefault();
            setSubmissionErrorMessage('');
            setSubmissionMessage('');
            
            const requiredFields = ['first', 'last', 'company', 'email', 'phone', 'address', 'city', 'state', 'zip', 'message'];
            const newErrors = {};
          
            // Validation for required fields
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
                if (field === 'img') fieldLabel = 'Logo';
                newErrors[field] = `${fieldLabel} is required!`;
              }
            });
        // Check if file (logo/image) is added
  if (!formData.img) {
    newErrors.img = 'Logo/Image is required.';
  }
            // Ensure vinyl sizes, placement, and finishing are also checked
            if (!addedPlacement.length) {
              newErrors.placement = 'At least one placement is required.';
            }
            if (!addedFinishing.length) {
              newErrors.finishing = 'At least one finishing option is required.';
            }
        
            // Show errors if they exist
            if (Object.keys(newErrors).length > 0) {
              setErrorMessage('Required fields are missing.');
              setErrors(newErrors);
              return;
            }
        
            // If no errors, proceed with form submission
            try {
              const formDataToSend = {
                ...formData,
                vinylSize: addedvinylSizes.join(', '),
                placement: addedPlacement.join(', '),
                finishing: addedFinishing.join(', ')
              };
          
              const response = await axios.post('/drywall-floor-concrete', formDataToSend, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
              console.log(response.data);
              // Clear form on success
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
                vinylSize: { length: '', width: '' },
                placement: '',
                finishing: '',
                img: null,
                message: ''
              });
              setAddedvinylSizes([]);
              setAddedPlacement([]);
              setAddedFinishing([]);
              setErrors({});
              setPhone('');
              setSubmissionMessage('Drywall/Floor/Concrete Graphics Request Submitted! We will be with you within 48 hours!');
            } catch (error) {
              console.error('Error submitting Drywall/Floor/Concrete Graphics Job:', error);
            }
          };
        
            return (
                <div>
                    <Header />
                    <main>
                        <div className="page-dry-container">
                        <div className="dry-name-container">
                        <h1 className="dry-description">DRYWALL FLOOR CONCRETE GRAPHICS</h1>
                            </div>
                        </div>
                        <div className="photo-gal-dry">
        <MXDrywallGallery /> {/* Render the photo gallery here */}
        </div>
        <form className="dry-set -- box" onSubmit={handleSubmit}>
            <div className="dry-form-container container--narrow page-section">
                <div className="dry-form-info">
                    <h1 className="dry-app-box">SEND AN INQUIRY OR GET A QUOTE</h1>
                    <h2 className="dry-fill">Please Fill Out the Form Below to Submit Your Custom Drywall/Floor/Concrete Graphics
                        Information to get an Inquiry or Quote.</h2>
                </div>
                <div className="dry-actual">
                  <div className="name-section-dry">
<label className="first-dry-name-label">Name: </label>
<div className="first-dry-dry-input">

  <div className="first-dry-name">
    <div className="firstname-dry-input">
    <div className="input-first-dry-container">
<label className="first-dry-label-name">First Name *</label>
<input
name="first"
type="text"
className="firstname-dry-name-input"
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
  <div className="last-dry-name">
    <div className="last-dry-input">
    <div className="last-dry-input-container">
<label className="last-dry-label-name">Last Name *</label>
<input
name="last"
type="text"
className="lastname-dry-name-input"
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
<div className="company-dry-section">
<label className="dry-company-label">Company/Excavator: </label>

<div className="company-dry-input">
  <div className="company-dry">
    <div className="dry-company-name-input">
    <div className="dry-input-container">
      <label className="company-dry-name">Company *</label>
      <input name="company-dry-name-input" type="text" className="company-dry-name-input" text="company--input" placeholder="Enter Company Name"
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
  <div className="emailphone-dry-section">
<label className="emailphone-dry-label">Email/Phone Number:</label>
<div className="emailphone-dry-input">
  <div className="email-dry">
    <div className="email-dry-input">
    <div className="email-dry-input-container">
<label className="email-dry-name">Email *</label>
<input
name="email"
type="text"
className="email-dry-box"
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
  <div className="phone-dry">
    <div className="dry-phone-name-input">
    <div className="dry-phone-input-container">
<label className="phone-dry-label">Phone Number *</label>
<input
name="phone"
type="text"
className="phone-dry-box"
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
<div className="address-dry-section">
<label className="address-dry-label">Company Address: </label>
<div className="address-dry-input-container">
<div className="address-dry-input">
<div className="address-dry-container">
  <div className="address-dry-inputing">
<label className="addr-dry-label">Address *</label>
<input
name="address-box"
type="text"
className="address-dry-box"
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
<div className="city-dry-input">
<label className="city-dry-label">City *</label>

<input
name="city-input"
type="text"
className="city-dry-box"
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
<div className="city-dry-state">
<div className="state-dry-input">
<label className="state-dry-label">State *</label>
<select
      name="state"
      className="state-dry-box"
      
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
    <div className="zip-dry-input">
<label className="zip-dry-label">Zip Code *</label>
<input
        name="zip"
        type="text"
        className="zip-dry-box"
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
<div className="size-dry-vinyl-section">
<label className="size-dry-label">Size of Vinyl:</label>
<div className="size-dry-section">
  <div className="length-dry-section">
    <label className="length-dry-label" htmlFor="length">Length *</label>
    <input
      className="length-dry-box"
      type="number"
      name="length"
      value={formData.vinylSize.length}
      onChange={(e) => setFormData({ ...formData, vinylSize: { ...formData.vinylSize, length: e.target.value } })}
      placeholder="Enter length"
    />
    <select
      className="length-dry-select"
      value={vinylLengthUnit}
      onChange={(e) => setVinylLengthUnit(e.target.value)}
    >
      <option value="" disabled>Select Unit</option>
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
  </div>

  <div className="width-dry-section">
    <label className="width-dry-label" htmlFor="width">Width *</label>
    <input
      className="width-dry-box"
      type="number"
      name="width"
      value={formData.vinylSize.width}
      onChange={(e) => setFormData({ ...formData, vinylSize: { ...formData.vinylSize, width: e.target.value } })}
      placeholder="Enter width"
    />
    <select
      className="width-dry-select"
      value={vinylWidthUnit}
      onChange={(e) => setVinylWidthUnit(e.target.value)}
    >
      <option value="" disabled>Select Unit</option>
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
  </div>

  {/* Add button to add the size */}
  <button
    type="button"
    className="dry-vinyl-submit-size btn--full"
    onClick={handleAddVinylSize}
  >
    ADD VINYL SIZE
  </button>

  {/* Display the list of added sizes */}
  <ul>
    {addedvinylSizes.length > 0 ? (
      addedvinylSizes.map((size, index) => (
        <li className="dry-vinyl-size-li" key={index}>
          {size}
          <button
            className="dry-vinyl-remove-submit-size btn--full"
            type="button"
            onClick={() => handleRemoveVinylSize(index)}
          >
            REMOVE SIZE
          </button>
        </li>
      ))
    ) : (
      <p className="no-added-vinyl">No vinyl sizes added yet.</p>
    )}
  </ul>

  {/* Show error messages if any */}
  {errorMessage && <p className="error-message">{errorMessage}</p>}
</div>

</div>
<div className="placement-dry-section">
<label className="place-dry-label">Placement and Finishing:</label>
<div className="placement-imgs">
    <div className="place-img-container">
        <h1 className="place-examples">Placement Examples</h1>
    </div>
<div className="place-flex-container">
    <div className="place-img-container">
      <img src={images["../assets/MX Photos/Nance 2.jpg"].default} alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Drywall Graphics</h3>
</div>
<div className="place-img-container">
        <img src={images["../assets/thick adhesive vinyls/floor graphics.jpg"].default} alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Floor Graphics</h3>
</div>
<div className="place-img-container">
        <img src={images["../assets/thick adhesive vinyls/concrete graphic.jpg"].default} alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Concrete Graphics</h3>
</div>
<div className="place-img-container">
        <img src={images["../assets/thick adhesive vinyls/brick graphic.jpg"].default} alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Brick Wall Graphics</h3>
</div>
<div className="place-img-container">
        <img src={images["../assets/thick adhesive vinyls/cinder graphics.jpg"].default} alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Cinder Block Graphics</h3>
</div>
    </div>
</div>
      <div className="place-dry-section">
        <label className="place-label" htmlFor="placement">Placement *</label>
        <select
  className="place-dry-selection"
  value={selectedPlacement}
  onChange={(e) => setSelectedPlacement(e.target.value)} // Make sure this line is updating the state
>
  <option value="" disabled>Select Placement</option>
  {placeOptions.map((option, index) => (
    <option key={index} value={option.name} disabled={option.disabled}>
      {option.name}
    </option>
  ))}
</select>

        <button className="btn btn--full submit-place" type="button" onClick={handleAddPlacement}>
    ADD PLACEMENT
  </button>
  <div className="placement-list">
  <ul>
  {addedPlacement.length > 0 ? (
    addedPlacement.map((placement, index) => (
      <li className="placement-item" key={index}>
        {placement}
        <button
          className="btn btn--full remove-placement"
          onClick={() => handleRemovePlacement(index)}
        >
          REMOVE PLACEMENT
        </button>
      </li>
    ))
  ) : (
    <p className="no-added-placement">No added placements yet.</p>
  )}
</ul>

    {errors.placement && <span className="error-message">{errors.placement}</span>}
  </div>
      </div>
      <div className="dry-finish-img-section">
  <div className="matte-img-dry">
    <img className="matte-img" alt="matte" src={images["../assets/vinyls/matte.jpg"].default}/>
    <h2 className="matte-dry-note">Matte</h2>
  </div>
  <div className="gloss-img-dry">
    <img className="gloss-img" alt="gloss" src={images["../assets/vinyls/gloss.jpg"].default}/>  
    <h2 className="gloss-dry-note">Gloss</h2>
  </div>
</div>
      <label className="finish-dry-label">Finishing Touch:</label>
      <div className="finish-fleet-section">
  <label className="finish-label" htmlFor="finishing">Finishing *</label>
  <select
    name="finishing"
    className="finish-dry-select"
    value={selectedFinishing}
    onChange={(e) => setSelectedFinishing(e.target.value)}
    disabled={addedFinishing.length === 3}
  >
    <option value="">Select Finishing Type</option>
    {finishOptions.map((option, index) => (
      <option key={index} value={option.name}>
        {option.name}
      </option>
    ))}
  </select>
  <button className="btn btn--full submit-dry-finishing" type="button" onClick={handleAddFinishing}>
    ADD FINISHING
  </button>
  <div className="finishing-list">
  <ul>
  {addedFinishing.length > 0 ? (
    addedFinishing.map((finishing, index) => (
      <li className="finishing-item" key={index}>
        {finishing}
        <button
          className="btn btn--full remove-finishing"
          onClick={() => handleRemoveFinishing(index)}
        >
          REMOVE FINISHING
        </button>
      </li>
    ))
  ) : (
    <p className="no-added-vehicles">No Finishing items added yet.</p>
  )}
</ul>
    {errors.finishing && <span className="error-message">{errors.finishing}</span>}
  </div>
</div>
      </div>
<div className="dry-file-section">
<label className="dry-file-label">Logo/Image:</label>
<h2 className="dry-warn"><b className="dry-notice">NOTICE</b>: If you're submitting a PNG, JPG, or any file that has PIXELATED Images, there will be a vectorizing fee to vectorize your logo depending on 
    how long it takes us to vectorize. If you want to avoid the vectorization fee, it is better to submit PDFs or SVGs that already have vectorization inside. 
    These PDF/SVG files cannot have any PNGs or JPGs inside because the PDF/SVG have been exported or saved as a PDF/SVG but has a JPG/PNG file inside making it much worse to vectorize. 
    JPG/PNG files are compressed Image files making them Blurry and Pixelated. That is why vectorization plays an important role in order for your items to not print blurry or pixelated.
    <p className="log-re">Logo Redesigning(Optional)</p>
    <p className="logo-warn"><b className="logo-notice">NOTICE</b>: If you need us to design a new logo for you, you can submit your old logo on
    here: <a href="/new-logo" className="btn -- new-dry-logo-button">NEW LOGO</a>
    We will send you a quote for the logo redesigning and you can choose to accept it or not.
</p>
</h2>
<div className="file-dry-section">
<label htmlFor="logo-select" className="dry-logo">Logo/Image for Graphics *</label>
<div className="choose-logo-contain">
    <label className="file-dry-label">
    {formData.img ? (
            <span>{formData.img.name}</span>
          ) : (
            <span>Choose Your Logo For Your Graphics</span>
          )}
          <input type="file" name="img" accept=".pdf,.svg,.doc,.png,.jpg,.jpeg" onChange={(e) => handleFileChange(e, 'img')} />
          </label>
          {formData.img && (
            <button type="button" className="remove-dry-file-button" onClick={() => handleFileRemove('img')}>Remove</button>
          )}
        
        {errors.img && <span className="error-message">{errors.img}</span>}
</div>
</div>
</div>
<div className="dry-message-container">
<label className="message-dry-label">Message: </label>
<h1 className="message-dry-note">Tell us about your graphics and how you want it designed! Please Specify Logo Redesigning,
     and the Quantity of graphics needed. If you need
to request a crew to help install your drywall/concrete/floor graphics, please specify where the location is, when 
and what time you want an MX crew will arrive.</h1>

<textarea className="message-dry-text" name="message" type="text" placeholder="Enter Message"
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
  <button type="button" className="btn btn--full submit-dry" onClick={handleSubmit}>SUBMIT CUSTOM DRYWALL FLOOR CONCRETE GRAPHICS</button>
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
                </div>
            );
};
export default Adhesive;
