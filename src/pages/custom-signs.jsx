import React, { useState, useEffect } from 'react';
import '../css/signs.css';
import '../css/headerfooter.css';
import axios from 'axios';
import MXSignGallery from '../photogallery/SignMXgallery';
import Header from '../components/headerviews/HeaderSign';
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
      const sizeAluminumBlankOptions = [
        {name: '12"x6"', disabled: false},
        {name: '18"x6"'},
        {name: '24"x6"'},
        {name: '24"x8"'},
        {name: '18"x12"'},
        {name: '24"x18"'},
        {name: '30"x24"'},
        {name: '36"x24"'},
        {name: '12"x12"'},
        {name: '18"x18"'},
        {name: '24"x24"'},
        {name: '24"x24" Octagon(Stop Sign)'},
        {name: '24"x24" Triangle(Yield Sign)'},
        {name: '30"x30"'},
        {name: '30"x30" Octagon(Stop Sign)'},
        {name: '30"x30" Triangle(Yield Sign)'},
        {name: '30"x30" Pentagon(School Zone Sign)'},
        {name: '36"x36"'},
        {name: '36"x36" Octagon(Stop Sign)'},
        {name: '36"x36" Triangle(Yield Sign)'},
        {name: '36"x36" Pentagon(School Zone Sign)'},
        {name: '48"x48"'},
        {name: '48"x48" Octagon(Stop Sign)'},
        {name: '48"x48" Triangle(Yield Sign)'},
        {name: '48"x48" Pentagon(School Zone Sign)'},
        {name: 'Other: Please Specify in Message'},
      ]
      const finishOptions = [
        { name: 'Matte', disabled: false },
        { name: 'Gloss', disabled: false },
        { name: 'Chrome', disabled: false },
        { name: 'High Intensity Prismatic (Reflective)', disabled: false },
        { name: 'Diamond Grade (Reflective)', disabled: false }
      ];
      const signTypeOptions = [
        { name: 'Aluminum Sign Blank', disabled: false, value: 'Aluminum Sign Blank' },
        { name: 'Aluminum Composite Material (ACM)', disabled: false, value: 'Aluminum Composite Material (ACM)' },
        { name: 'Corrugated Plastic', disabled: false, value: 'Corrugated Plastic' },
        { name: 'Yard Signs (18"x24" Corrugated Plastic)', disabled: false, value: 'Yard Signs' },
        { name: 'Clear Acrylic', disabled: false, value: 'Clear Acrylic' },
        { name: 'Colored Acrylic', disabled: false, value: 'Colored Acrylic' },
        { name: 'LED', disabled: false, value: 'LED' },
      ];
      const signSides = [
        { name: 'Single-Sided', disabled: false },
        { name: 'Double-Sided', disabled: false }
      ];
      const sizeOptions = [
        { name: 'Feet', disabled: false },
        { name: 'Inches', disabled: false },
      ];
      const acmColors = [
        { name: 'White', disabled: false },
        { name: 'Black', disabled: false },
        { name: 'Silver', disabled: false }
      ];
      const signThickness = [
        { name: '1/8"(3mm)', disabled: false },
        { name: '1/4"(6mm)', disabled: false },
      ];
      const AcrylicColor = [
        { name: 'Red', disabled: false },
        { name: 'Orange', disabled: false },
        { name: 'Yellow', disabled: false },
        { name: 'Green', disabled: false },
        { name: 'Light Blue', disabled: false },
        { name: 'Blue', disabled: false },
        { name: 'Purple', disabled: false },
      ];
        const Signs = () => {
          const [phone, setPhone] = useState('');
          const [signSize, setSignSize] = useState('');
          const [lengthError, setLengthError] = useState('');
          const [acmColorError, setAcmColorError] = useState('');
          const [acrylicColorError, setAcrylicColorError] = useState('');
          const [signThicknessError, setSignThicknessError] = useState('');
          const [quantityError, setQuantityError] = useState('');
          const [widthError, setWidthError] = useState('');
          const [signType, setSignType] = useState(''); // Sign type selected by user
          const [customLength, setCustomLength] = useState(''); // Custom length for sign
          const [customWidth, setCustomWidth] = useState(''); // Custom width for sign
          const [lengthUnit, setLengthUnit] = useState('feet'); // Length measurement unit
          const [widthUnit, setWidthUnit] = useState('feet'); // Width measurement unit
          const [selectedFinishing, setSelectedFinishing] = useState('');
          const [addedFinishing, setAddedFinishing] = useState([]);
          const [acmColor, setAcmColor] = useState('');
          const [acrylicColor, setAcrylicColor] = useState('');
          const [signThicknessValue, setSignThicknessValue] = useState('');
          const [signSidesValue, setSignSidesValue] = useState('');
          const [errors, setErrors] = useState({});
          const [errorMessage, setErrorMessage] = useState('');
          const [submissionMessage, setSubmissionMessage] = useState('');
          const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
          const [quantity, setQuantity] = useState(0); // Default quantity
          const [addedSigns, setAddedSigns] = useState([]);
          const [signTypeError, setSignTypeError] = useState(''); // Error for sign type
          const [signSizeError, setSignSizeError] = useState(''); // Error for sign size
          const [signSidesError, setSignSidesError] = useState(''); // Error for sign sides
          const [finishingError, setFinishingError] = useState(''); // Error for finishing

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
  const handleAddSigns = () => {
    let isValid = true;
  
    // Reset all previous errors
    setSignTypeError('');
    setSignSizeError('');
    setSignSidesError('');
    setFinishingError('');
    setLengthError('');
    setWidthError('');
    setSignThicknessError('');
    setAcmColorError('');
    setAcrylicColorError('');
    setQuantityError('');
    setErrorMessage('');
  
    // Validate Sign Type
    if (!signType) {
      setSignTypeError('Please select a sign type.');
      isValid = false;
    }
  
    // Validate Sign Size based on sign type
    if (signType === 'Aluminum Sign Blank' && !signSize) {
      setSignSizeError('Please select a sign size.');
      isValid = false;
    } else if (
      signType === 'Aluminum Composite Material (ACM)' ||
      signType === 'Corrugated Plastic' ||
      signType === 'Clear Acrylic' ||
      signType === 'Colored Acrylic'
    ) {
      // For custom signs, validate length and width
      if (!customLength || customLength <= 0) {
        setLengthError('Please enter a length greater than 0.');
        isValid = false;
      }
      if (!customWidth || customWidth <= 0) {
        setWidthError('Please enter a width greater than 0.');
        isValid = false;
      }
      // Validate thickness for these custom signs
      if (!signThicknessValue) {
        setSignThicknessError('Please select a sign thickness.');
        isValid = false;
      }
      if (!signSidesValue) {
        setSignSidesError('Please select the number of sides.');
        isValid = false;
      }
    }
  
    // Validate Sign Sides only for Aluminum Sign Blank and Yard Signs
    if (signType === 'Aluminum Sign Blank' || signType === 'Yard Signs') {
      if (!signSidesValue) {
        setSignSidesError('Please select the number of sides.');
        isValid = false;
      }
    }
  
    // Validate Finishing
    if (!selectedFinishing) {
      setFinishingError('Please select a finishing type.');
      isValid = false;
    }
  
    // Validate ACM color for ACM signs
    if (signType === 'Aluminum Composite Material (ACM)' && !acmColor) {
      setAcmColorError('Please select an ACM color.');
      isValid = false;
    }
  
    // Validate Acrylic color for Colored Acrylic signs
    if (signType === 'Colored Acrylic' && !acrylicColor) {
      setAcrylicColorError('Please select an acrylic color.');
      isValid = false;
    }
  
    // Check for quantity
    if (quantity <= 0) {
      setQuantityError('Please enter a valid quantity greater than 0.');
      isValid = false;
    }
  
    // If validation fails, return early to prevent submission
    if (!isValid) {
      return;
    }
  
    // Construct the new sign object with custom length, width, and units for non-Aluminum signs
    const newSign = {
      signType,
      signSize: signType === 'Yard Signs' ? '18"x24"' : `${customLength} ${lengthUnit} x ${customWidth} ${widthUnit}`,
      signSides: signSidesValue, // Add this line to include sides for all sign types
      finishing: selectedFinishing,
      thickness:
        signType === 'Aluminum Composite Material (ACM)' ||
        signType === 'Corrugated Plastic' ||
        signType === 'Clear Acrylic' ||
        signType === 'Colored Acrylic'
          ? signThicknessValue
          : null,
      acmColor: signType === 'Aluminum Composite Material (ACM)' ? acmColor : null,
      acrylicColor: signType === 'Colored Acrylic' ? acrylicColor : null,
      quantity,
    };
  
    setAddedSigns([...addedSigns, newSign]);
  
    // Clear the submission error once a sign has been successfully added
    setSubmissionErrorMessage('');
  
    // Reset fields after adding the sign
    setSignType('');
    setSignSize('');
    setSignSidesValue('');
    setSelectedFinishing('');
    setSignThicknessValue('');
    setAcmColor('');
    setAcrylicColor('');
    setCustomLength('');
    setCustomWidth('');
    setQuantity(0);
  };
  
  

  const handleRemoveSigns = (index) => {
    const updatedSigns = addedSigns.filter((_, i) => i !== index);
    setAddedSigns(updatedSigns);
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
            const handleFileChange = (e, fileType) => {
              const file = e.target.files[0];
              setFormData({ ...formData, [fileType]: file });
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
          
          const handleFileRemove = (fileType) => {
            setFormData({ ...formData, [fileType]: null });
          };


          const handleSubmit = async (e) => {
            e.preventDefault();
          
            let hasErrors = false;
          
            // Check if there are no added signs
            if (addedSigns.length === 0) {
              setSubmissionErrorMessage('You must add at least one sign before submitting.');
              hasErrors = true;
            } else {
              setSubmissionErrorMessage('');
            }
          
            // Field validation for required form fields (like first name, last name, etc.)
            const requiredFields = ['first', 'last', 'company', 'email', 'phone', 'address', 'city', 'state', 'zip', 'message'];
            const newErrors = {};
          
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
          
            setErrors(newErrors);
            if (Object.keys(newErrors).length > 0) {
              setErrorMessage('Required fields are missing.');
              setErrors(newErrors);
              return;
            }
            if (hasErrors) {
              return;
            }
          
            // Proceed with form submission logic if there are no errors
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
          
              // Append added signs
              formDataToSend.append('signs', JSON.stringify(addedSigns));
          
              const response = await axios.post('/custom-signs', formDataToSend, {
                headers: {
                  'Content-Type': 'multipart/form-data', // Ensure multipart/form-data is set
                },
              });
          
              console.log(response.data);
              setSubmissionMessage('Customizable Signage Request Submitted!');
          
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
                img: null,
                message: ''
              });
              setAddedSigns([]);
              setErrors({});
              setPhone('');
              setAcmColor('');
              setAcrylicColor('');
              setSignThicknessValue('');
            } catch (error) {
              console.error('Error submitting custom sign:', error);
              setSubmissionErrorMessage('There was an error submitting your request. Please try again.');
            }
          };
          
    return (
        <div>
        <Header />
      <main>
      <div className="page-sign-banner">
    <div className="sign-name-container">
    <h1 className="sign-description">CUSTOMIZABLE SIGNAGE</h1>
</div>
</div>

        <div className="photo-gal-sign">
        <MXSignGallery /> {/* Render the photo gallery here */}
        </div>
        
        <div className="material-type-container">
        <h1 className="sign-app-box">MATERIALS AVAILABLE FOR SIGNS</h1>
  <div className="material-container">
    <img className="orafol-img" src={images["../assets/MX Logos/Orafol-Logo.svg"].default}></img>
    <img className="substance-img" src={images["../assets/MX Logos/substance-logo.svg"].default}></img>
</div>
</div>
        <form className="sign-set -- box"
        onSubmit={handleSubmit}
        >
          
        <div className="sign-form-container container--narrow page-section">
        <div className="sign-form-info">
        <h1 className="sign-app-box">SEND AN INQUIRY OR GET A QUOTE</h1>
<h2 className="sign-fill">Please Fill Out the Form Below to Submit Your Custom Sign Information to get an Inquiry or Quote.</h2>
</div>
<div className="sign-actual">
  <div className="name-section-sign">
<div className="first-name-sign-input">

  <div className="first-sign-name">
    <div className="firstname-sign-input">
    <div className="input-first-sign-container">
<label className="first-sign-label-name">First Name *</label>
<input
  name="first"
  type="text"
  className="firstname-sign-name-input"
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
  <div className="last-sign-name">
    <div className="last-sign-input">
    <div className="last-sign-input-container">
<label className="last-sign-label-name">Last Name *</label>
<input
  name="last"
  type="text"
  className="lastname-sign-name-input"
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
<div className="company-sign-section">
<div className="company-sign-input">
  <div className="company-sign">
    <div className="sign-company-name-input">
    <div className="sign-input-container">
      <label className="company-sign-name">Company *</label>
      <input
  name="company-sign-name-input"
  type="text"
  className="company-sign-name-input"
  placeholder="Enter Company Name"
  value={formData.company}
  onChange={(e) => {
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
<div className="emailphone-sign-section">
<div className="emailphone-sign-input">
  <div className="email-sign">
    <div className="email-sign-input">
    <div className="email-sign-input-container">
<label className="email-sign-name">Email *</label>
<input
  name="email"
  type="text"
  className="email-sign-box"
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

  <div className="phone-sign">
    <div className="sign-phone-name-input">
    <div className="sign-phone-input-container">
    <label className="phone-sign-label">Phone Number *</label>
<input
  name="phone"
  type="text"
  className="phone-sign-box"
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
<div className="address-sign-section">
<div className="address-sign-input-container">
<div className="address-sign-input">
<div className="address-sign-container">
  <div className="address-sign-inputing">
<label className="addr-sign-label">Address *</label>
<input
  name="address-box"
  type="text"
  className="address-sign-box"
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
<div className="city-sign-input">
<label className="city-sign-label">City *</label>

<input
name="city-input"
type="text"
className="city-sign-box"
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
<div className="city-sign-state">
<div className="state-sign-input">
<label className="state-sign-label">State *</label>
<select
      name="state"
      className="state-sign-box"
      
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
    <div className="zip-sign-input">
  <label className="zip-sign-label">Zip Code *</label>
  <input
    name="zip"
    type="text"
    className="zip-sign-box"
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
{/* Sign Type Selection */}
<div className="type-sign-section">
  <label className="sign-type-label">Sign Type *</label>
  <select 
  className="sign-type-input" 
  value={signType} 
  onChange={(e) => {
    setSignType(e.target.value);
    if (e.target.value) {
      setSignTypeError(''); // Clear error once a valid sign type is selected
    }
  }}>
  <option value="" disabled>Select Sign Type</option> {/* Default option */}
  {signTypeOptions.map((option, index) => (
    <option key={index} value={option.value} disabled={option.disabled}>
      {option.name}
    </option>
  ))}
</select>
{signTypeError && <div className="error-message">{signTypeError}</div>}

{/* Conditional Rendering for Sign Size, Thickness, Sides */}
{signType === 'Aluminum Sign Blank' && (
  <>
    {/* Show size options, sides, finishing, and quantity for Aluminum Sign Blank */}
    <label className="sign-size-label">Sign Size *</label>
    <select 
      value={signSize} 
      className="sign-size-input"
      onChange={(e) => {
        setSignSize(e.target.value);
        if (e.target.value) {
          setSignSizeError(''); // Clear error once a valid sign size is selected
        }
      }}>
      <option value="">Select Sign Size</option> {/* Default option */}
      {sizeAluminumBlankOptions.map((option, index) => (
        <option key={index} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
    {signSizeError && <div className="error-message">{signSizeError}</div>}

    <label className="sign-sides-labeling">Sign Sides *</label>
    <select 
      value={signSidesValue} 
      onChange={(e) => {
        setSignSidesValue(e.target.value);
        if (e.target.value) {
          setSignSidesError(''); // Clear error once valid sides are selected
        }
      }}
      className="sign-sides-input">
      <option value="">Select Sides</option> {/* Default option */}
      {signSides.map((option, index) => (
        <option key={index} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
    {signSidesError && <div className="error-message">{signSidesError}</div>}

    <label className="finish-sign-label" htmlFor="finishing">Finishing *</label>
    <select
      name="finishing"
      className="finish-sign-select"
      value={selectedFinishing}
      onChange={(e) => setSelectedFinishing(e.target.value)}
    >
      <option value="">Select Finishing Type</option>
      {finishOptions.map((option, index) => (
        <option key={index} value={option.name}>{option.name}</option>
      ))}
    </select>
    {finishingError && <div className="error-message">{finishingError}</div>}

    <label className="sign-quantity-label">How Many Signs *</label>
    <input
      type="number"
      className="sign-quantity-input"
      value={quantity}
      min="1"
      onChange={(e) => setQuantity(e.target.value)}
      placeholder="Enter quantity"
    />
    {quantityError && <div className="error-message">{quantityError}</div>}
  </>
)}

{/* Yard Signs Section */}
{signType === 'Yard Signs' && (
  <>
    <input
      type="text"
      value="18in x 24in"
      readOnly
      className="sign-size-input"
    />
    <label className="sign-sides-labeling">Sign Sides *</label>
    <select 
    className="sign-sides-input"
    value={signSidesValue} onChange={(e) => {
        setSignSidesValue(e.target.value);
        if (e.target.value) setSignSidesError(''); // Clear error when valid value is selected
    }}>
      <option value="">Select Sides</option> {/* Default option */}
      <option value="Single-Sided">Single-Sided</option>
      <option value="Double-Sided">Double-Sided</option>
    </select>
    {signSidesError && <div className="error-message">{signSidesError}</div>}

    <label className="finish-label" htmlFor="finishing">Finishing *</label>
    <select
      name="finishing"
      className="finish-sign-select"
      value={selectedFinishing}
      onChange={(e) => {
          setSelectedFinishing(e.target.value);
          if (e.target.value) setFinishingError(''); // Clear error when valid value is selected
      }}
      disabled={addedFinishing.length === 3}
    >
      <option value="">Select Finishing Type</option>
      {finishOptions.map((option, index) => (
        <option key={index} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
    {finishingError && <div className="error-message">{finishingError}</div>}

    <label className="sign-quantity-label">How Many Signs *</label>
    <input
      type="number"
      className="sign-quantity-input"
      value={quantity}
      min="1"
      onChange={(e) => {
        setQuantity(e.target.value);
        if (e.target.value > 0) setQuantityError(''); // Clear error when quantity is greater than 0
      }}
      placeholder="Enter quantity"
    />
    {quantityError && <div className="error-message">{quantityError}</div>}
  </>
)}

{/* Other Sign Types (ACM, Corrugated Plastic, etc.) */}
{(signType === 'Aluminum Composite Material (ACM)' ||
  signType === 'Corrugated Plastic' ||
  signType === 'Clear Acrylic' ||
  signType === 'Colored Acrylic') && (
  <>
    {/* Length and Width Fields */}
    <label className="sign-length-label">Sign Length *</label>
    <input
      className="sign-length-input"
      type="number"
      value={customLength}
      onChange={(e) => {
        setCustomLength(e.target.value);
        if (e.target.value > 0) setLengthError(''); // Clear error if length is greater than 0
      }}
      placeholder="Enter length"
    />
    <select
      className="sign-length-select"
      value={lengthUnit}
      onChange={(e) => setLengthUnit(e.target.value)}
    >
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
    {lengthError && <div className="error-message">{lengthError}</div>}

    <label className="sign-width-label">Sign Width *</label>
    <input
      className="sign-width-input"
      type="number"
      value={customWidth}
      onChange={(e) => {
        setCustomWidth(e.target.value);
        if (e.target.value > 0) setWidthError(''); // Clear error if width is greater than 0
      }}
      placeholder="Enter width"
    />
    <select
      className="sign-width-select"
      value={widthUnit}
      onChange={(e) => setWidthUnit(e.target.value)}
    >
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
    {widthError && <div className="error-message">{widthError}</div>}

    {/* Conditionally render thickness for specific sign types */}
    {(signType === 'Aluminum Composite Material (ACM)' ||
      signType === 'Corrugated Plastic' ||
      signType === 'Clear Acrylic' ||
      signType === 'Colored Acrylic') && (
      <>
        <label className="sign-thickness-label">Sign Thickness *</label>
<select 
  className="sign-thickness-select"
  value={signThicknessValue} 
  onChange={(e) => {
    const thickness = e.target.value;
    setSignThicknessValue(thickness);

    if (!thickness) {
      setSignThicknessError('Please select a sign thickness');
    } else {
      setSignThicknessError(''); // Clear error if valid
    }
  }}
>
  <option value="">Select Thickness</option> {/* Default option */}
  {signThickness.map((option, index) => (
    <option key={index} value={option.name}>
      {option.name}
    </option>
  ))}
</select>
{signThicknessError && <div className="error-message">{signThicknessError}</div>}
      </>
    )}
    {(signType === 'Aluminum Composite Material (ACM)' ||
      signType === 'Corrugated Plastic' ||
      signType === 'Clear Acrylic' ||
      signType === 'Colored Acrylic') && (
      <>
        <label className="sign-sides-labeling">Sign Sides *</label>
        <select 
  value={signSidesValue} 
  onChange={(e) => {
    setSignSidesValue(e.target.value);
    if (e.target.value) {
      setSignSidesError('');
    }
  }}
  className="sign-sides-input">
  <option value="">Select Sides</option>
  {signSides.map((option, index) => (
    <option key={index} value={option.name}>
      {option.name}
    </option>
  ))}
</select>
    {signSidesError && <div className="error-message">{signSidesError}</div>}
      </>
    )}


    {/* ACM Color Error */}
    {signType === 'Aluminum Composite Material (ACM)' && (
      <>
<label className="sign-acm-color-label">ACM Material Color *</label>
    <select 
      className="sign-acm-color-select"
      value={acmColor} 
      onChange={(e) => {
        const selectedColor = e.target.value;
        setAcmColor(selectedColor);

        if (!selectedColor) {
          setAcmColorError('Please select an ACM color');
        } else {
          setAcmColorError(''); // Clear error if valid
        }
      }}
    >
      <option value="">Select Color</option> {/* Default option */}
      {acmColors.map((option, index) => (
        <option key={index} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
    {acmColorError && <div className="error-message">{acmColorError}</div>}
      </>
    )}

    {/* Acrylic Color Error */}
    {signType === 'Colored Acrylic' && (
  <>
    <label className="sign-coloring-label">Acrylic Color *</label>
    <select 
      className="sign-acrylic-color-select"
      value={acrylicColor} 
      onChange={(e) => {
        setAcrylicColor(e.target.value);
        if (e.target.value) {
          setAcrylicColorError(''); // Clear error if valid color is selected
        } else {
          setAcrylicColorError('Please select an acrylic color');
        }
      }}
    >
      <option value="">Select Color</option> {/* Default option */}
      {AcrylicColor.map((option, index) => (
        <option key={index} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
    {acrylicColorError && <div className="error-message">{acrylicColorError}</div>}
  </>
)}


    
    <label className="finish-sign-label" htmlFor="finishing">Finishing *</label>
    <select
      name="finishing"
      className="finish-sign-select"
      value={selectedFinishing}
      onChange={(e) => {
        setSelectedFinishing(e.target.value);
        if (e.target.value) setFinishingError(''); // Clear error when valid value is selected
      }}
      disabled={addedFinishing.length === 3}
    >
      <option value="">Select Finishing Type</option>
      {finishOptions.map((option, index) => (
        <option key={index} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
    {finishingError && <div className="error-message">{finishingError}</div>}

    <label className="sign-quantity-label">How Many Signs *</label>
<input
  type="number"
  className="sign-quantity-input"
  value={quantity}
  min="1"
  onChange={(e) => {
    const value = e.target.value;
    setQuantity(value);

    if (value <= 0 || !value) {
      setQuantityError('Please enter a quantity greater than 0');
    } else {
      setQuantityError(''); // Clear the error if valid
    }
  }}
  placeholder="Enter quantity"
/>
{quantityError && <div className="error-message">{quantityError}</div>}

  </>
)}

  <button className="btn btn--full submit-signs" type="button" onClick={handleAddSigns}>
    ADD SIGN
  </button>
  <div className="sign-list">
  <h3 className="added-sign-list">Added Signs:</h3>
  {addedSigns.length > 0 ? (
    <ul>
      {addedSigns.map((sign, index) => (
        <li className="added-signs-li" key={index}>
        <p className="sign-type-p"><b className="added-sign-b-type">Type:</b> {sign.signType}</p>
        <p className="sign-size-p"><b className="added-sign-b-size">Size:</b> {sign.signSize}</p>
        <p className="sign-side-p"><b className="added-sign-b-side">Sides:</b> {sign.signSides || 'Not specified'}</p>
        <p className="sign-finish-p"><b className="added-sign-b-finish">Finishing:</b> {sign.finishing}</p>
        {sign.thickness && <p className="sign-thickness-p"><b className="added-sign-b-thickness">Thickness:</b> {sign.thickness}</p>}
        {sign.acmColor && <p className="sign-acm-color-p"><b className="added-sign-b-acm-color">ACM Color:</b> {sign.acmColor}</p>}
        {sign.acrylicColor && <p className="sign-acrylic-color-p"><b className="added-sign-b-acrylic-color">Acrylic Color:</b> {sign.acrylicColor}</p>}
        <p className="sign-quantity-p"><b className="added-sign-b-quantity">Quantity:</b> {sign.quantity}</p>
        <button className="btn btn--full remove-sign" onClick={() => handleRemoveSigns(index)}>
          REMOVE SIGN
        </button>
      </li>
      ))}
    </ul>
  ) : (
    <p className="no-added-signs">No signs added yet.</p>
  )}
</div>
{errors.type && <div className="error-message">{errors.type}</div>}
</div>
<div className="sign-file-section">
<label className="sign-file-label">Logo/Image *</label>
<h2 className="sign-warn"><b className="sign-notice">NOTICE</b>: If you're submitting a PNG, JPG, or any file that has PIXELATED Images, there will be a vectorizing fee to vectorize your logo depending on 
    how long it takes us to vectorize. If you want to avoid the vectorization fee, it is better to submit PDFs or SVGs that already have vectorization inside. 
    These PDF/SVG files cannot have any PNGs or JPGs inside because the PDF/SVG have been exported or saved as a PDF/SVG but has a JPG/PNG file inside making it much worse to vectorize. 
    JPG/PNG files are compressed Image files making them Blurry and Pixelated. That is why vectorization plays an important role in order for your items to not print blurry or pixelated.
    <p className="log-re">Logo Redesigning(Optional)</p>
    <p className="logo-warn"><b className="logo-notice">NOTICE</b>: If you need us to design a new logo for you, you can submit your old logo on
    here: <a href="/new-logo">NEW LOGO</a>.
    We will send you a quote for the logo redesigning and you can choose to accept it or not.
</p>
</h2>
<div className="file-sign-section">
<div className="choose-logo-contain">
    <label className="file-sign-label">
    {formData.img ? (
            <span>{formData.img.name}</span>
          ) : (
            <span>Choose Your Logo For Your Sign</span>
          )}
          <input
  type="file"
  name="img"
  accept=".pdf,.svg,.doc,.png,.jpg,.jpeg"
  onChange={(e) => {
    handleFileChange(e, 'img');
    if (e.target.files[0]) {
      setErrors((prevErrors) => ({ ...prevErrors, img: '' })); // Clear the error
    }
  }}
/>
</label>
{formData.img && (
            <button type="button" className="remove-sign-file-button" onClick={() => handleFileRemove('img')}>Remove</button>
          )}
{errors.img && <span className="error-message">{errors.img}</span>}
</div>
</div>
</div>
<div className="sign-message-container">
<label className="message-sign-label">Message *</label>
<h1 className="message-sign-note">Tell us about your sign and how you want it designed! Please Specify Logo Redesigning,
    Single-sided or Double-Sided Signs, and the Quantity of signs needed. If you need
to request a crew to help install your signs, please specify where the location is, when 
and what time you want an MX crew will arrive.</h1>

<textarea
  className="message-sign-text"
  name="message"
  placeholder="Enter Message"
  value={formData.message}
  onChange={(e) => {
    setFormData({ ...formData, message: e.target.value });
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, message: '' })); // Clear the error
    }
  }}
/>
{errors.message && <span className="error-message">{errors.message}</span>}
  </div>
  <button type="button" className="btn btn--full submit-sign" onClick={handleSubmit}>SUBMIT CUSTOM SIGN</button>

<div className="error-messages-container">
  {submissionErrorMessage && (
    <div className="submission-error-message">{submissionErrorMessage}</div>
  )}
  {errorMessage && (
    <div className="submission-error-message">{errorMessage}</div>
  )}
</div>
{submissionMessage && (
<div className="submission-message">{submissionMessage}</div>
)}
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
      <p classname-="footer-copy-p">&copy; 2024 Traffic & Barrier Solutions, LLC/Material WorX - 
        Website Created & Deployed by William Rowell - All Rights Reserved.</p>
    </div>
        </div>
    )
}
export default Signs;
