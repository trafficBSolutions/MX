import React, {useState} from 'react'
import '../css/headerfooter.css';
import '../css/decal.css';
import Header from '../components/headerviews/HeaderDecal';
import axios from 'axios';
import MXDecalGallery from '../components/MXDecalGal';
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

  const decalTypeOptions = [
    { name: 'Matte', disabled: false },
    { name: 'Gloss', disabled: false },
    { name: 'Chrome', disabled: false },
    { name: 'Football Helmet Gloss', disabled: false },
    { name: 'Football Helmet Chrome', disabled: false },
  ];

  const decalCutTypeOptions = [
    { name: 'Transfer-Cut', disabled: false },
    { name: 'Kiss-Cut', disabled: false },
    { name: 'Die-Cut', disabled: false }
  ];
const Decal = () => {
    const [phone, setPhone] = useState('')
    const [decalType, setDecalType] = useState('');
    const [decalSize, setDecalSize] = useState('');
    const [decalCut, setDecalCut] = useState('');
    const [decalErrorMessage, setDecalErrorMessage] = useState(''); // For decal error
    const [imgErrorMessage, setImgErrorMessage] = useState(''); // For image error
    const [widthError, setWidthError] = useState('');
    const [lengthError, setLengthError] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [decalTypeError, setDecalTypeError] = useState('');
    const [decalCutTypeError, setDecalCutTypeError] = useState('');
    const [decalCutType, setDecalCutType] = useState('');
    const [decalSizeError, setDecalSizeError] = useState('');
    const [customLength, setCustomLength] = useState(''); // Custom length for Decal
    const [customWidth, setCustomWidth] = useState(''); // Custom width for Decal
    const [lengthUnit, setLengthUnit] = useState('feet'); // Length measurement unit
    const [widthUnit, setWidthUnit] = useState('feet'); // Width measurement unit
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
    const [quantity, setQuantity] = useState(0); // Default quantity
    const [addedDecals, setAddedDecals] = useState([]);

const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    img: null,
    message: ''
  });
  const HandleAddDecal = () => {
    let isValid = true;

    // Reset decal-related errors
    setDecalSizeError('');
    setDecalTypeError('');
    setDecalCutTypeError('');
    setWidthError('');
    setLengthError('');
    setQuantityError('');
    setErrorMessage('');

    // Validate Decal Type
    if (!decalType) {
        setDecalTypeError('Please select a decal type.');
        isValid = false;
    }
    if (!decalCut) {
        setDecalCutTypeError('Please select a decal cut type.');
        isValid = false;
    }
    if (!customLength || customLength <= 0) {
        setLengthError('Please enter a valid length.');
        isValid = false;
    }
    if (!customWidth || customWidth <= 0) {
        setWidthError('Please enter a valid width.');
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

    // Add the decal details as an object
    const newDecal = {
        type: decalType,
        size: `${customLength} ${lengthUnit} x ${customWidth} ${widthUnit}`,
        cut: decalCut,
        quantity: quantity
    };

    // Add the new decal to the addedDecals array
    setAddedDecals([...addedDecals, newDecal]);

    // Clear decal-related errors and reset fields when a decal is added
    setDecalErrorMessage('');
    setSubmissionErrorMessage('');

    // Reset decal fields after adding the decal
    setDecalType('');
    setDecalCut('');
    setCustomLength('');
    setCustomWidth('');
    setQuantity(0);
};

  const handleRemoveDecals = (index) => {
    const updatedDecals = addedDecals.filter((_, i) => i !== index);
    setAddedDecals(updatedDecals);
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

    // Clear the image error message if a file is selected
    if (file) {
        setImgErrorMessage('');
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

const handleFileRemove = (fileType) => {
  setFormData({ ...formData, [fileType]: null });
};
const handleSubmit = async (e) => {
    e.preventDefault();
  
    let hasErrors = false;
  
    // Check if there are no added decals
    if (addedDecals.length === 0) {
        setDecalErrorMessage('You must add at least one decal before submitting.');
        hasErrors = true;
    } else {
        setDecalErrorMessage('');
    }

    // Check if an image is not selected
    if (!formData.img) {
        setImgErrorMessage('You must select a logo/image for the decals.');
        hasErrors = true;
    } else {
        setImgErrorMessage('');
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
  
      // Append added decals
      formDataToSend.append('decals', JSON.stringify(addedDecals));
  
      const response = await axios.post('/decals-stickers', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure multipart/form-data is set
        },
      });
  
      console.log(response.data);
      setSubmissionMessage('Decals & Stickers Request Submitted!');
  
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
      setAddedDecals([]);
      setErrors({});
      setPhone('');
    } catch (error) {
      console.error('Error submitting custom decals & stickers', error);
      setSubmissionErrorMessage('There was an error submitting your request. Please try again.');
    }
  };
  return (
    <div>
        <Header />
        <main>
        <div className="page-decal-banner">
    <div className="decal-name-container">
    <h1 className="decal-description">DECALS & STICKERS</h1>
</div>
</div>
<div className="photo-gal-decal">
        <MXDecalGallery /> {/* Render the photo gallery here */}
        </div>
        <form onSubmit={handleSubmit} className="decal-set -- box">
        <div className="decal-form-container container--narrow page-section">
        <div className="decal-form-info">
        <h1 className="decal-app-box">SEND AN INQUIRY OR GET A QUOTE</h1>
        <h2 className="decal-fill">Please Fill Out the Form Below to Submit Your Decals & Stickers Information to get an Inquiry or Quote.</h2>
            </div>
            <div className="decal-actual">
            <div className="name-section-decal">
<label className="first-decal-name-label">Name: </label>
<div className="first-name-decal-input">

  <div className="first-decal-name">
    <div className="firstname-decal-input">
    <div className="input-first-decal-container">
<label className="first-decal-label-name">First Name *</label>
<input
  name="first"
  type="text"
  className="firstname-decal-name-input"
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
  <div className="last-decal-name">
    <div className="last-decal-input">
    <div className="last-decal-input-container">
<label className="last-decal-label-name">Last Name *</label>
<input
  name="last"
  type="text"
  className="lastname-decal-name-input"
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
<div className="company-decal-section">
<label className="decal-company-label">Company/Excavator: </label>

<div className="company-decal-input">
  <div className="company-decal">
    <div className="decal-company-name-input">
    <div className="decal-input-container">
      <label className="company-decal-name">Company *</label>
      <input
  name="company-decal-name-input"
  type="text"
  className="company-decal-name-input"
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
<div className="emailphone-decal-section">
<label className="emailphone-decal-label">Email/Phone Number:</label>
<div className="emailphone-decal-input">
  <div className="email-decal">
    <div className="email-decal-input">
    <div className="email-decal-input-container">
<label className="email-decal-name">Email *</label>
<input
  name="email"
  type="text"
  className="email-decal-box"
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

  <div className="phone-decal">
    <div className="decal-phone-name-input">
    <div className="decal-phone-input-container">
    <label className="phone-decal-label">Phone Number *</label>
<input
  name="phone"
  type="text"
  className="phone-decal-box"
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
<div className="address-decal-section">
<label className="address-decal-label">Company Address: </label>
<div className="address-decal-input-container">
<div className="address-decal-input">
<div className="address-decal-container">
  <div className="address-decal-inputing">
<label className="addr-decal-label">Address *</label>
<input
  name="address-box"
  type="text"
  className="address-decal-box"
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
<div className="city-decal-input">
<label className="city-decal-label">City *</label>

<input
name="city-input"
type="text"
className="city-decal-box"
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
<div className="city-decal-state">
<div className="state-decal-input">
<label className="state-decal-label">State *</label>
<select
      name="state"
      className="state-decal-box"
      
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
    <div className="zip-decal-input">
  <label className="zip-decal-label">Zip Code *</label>
  <input
    name="zip"
    type="text"
    className="zip-decal-box"
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
<div className="decal-sticker-section">
<label className="decal-sticker-label">Decal/Sticker:</label>
    <div className="decal-type-input-container">
    <label className="decal-type-label">Decal Type *</label>
    <select 
    className="decal-type-input" 
    name="decal-type"
    value={decalType}
    onChange={(e) => {
        setDecalType(e.target.value);
        if (e.target.value) {
          setDecalTypeError(''); // Clear error once a valid decal type is selected
        }
      }}>
        <option value="" disabled>Select Decal Type</option> {/* Default option */}
        {decalTypeOptions.map((option, index) => (
    <option key={index} value={option.value} disabled={option.disabled}>
      {option.name}
    </option>
  ))}
  </select>
  {decalTypeError && <div className="error-message">{decalTypeError}</div>}
</div>
  <div className="decal-size-input-container">
    <label className="decal-size-label">Decal Size *</label>
    <label className="decal-width-label">Length *</label>
    <input
      className="decal-length-input"
      type="number"
      value={customLength}
      onChange={(e) => {
        setCustomLength(e.target.value);
        if (e.target.value > 0) setLengthError(''); // Clear error if length is greater than 0
      }}
      placeholder="Enter length"
    />
    <select
      className="decal-length-select"
      value={lengthUnit}
      onChange={(e) => setLengthUnit(e.target.value)}
    >
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
    {lengthError && <div className="error-message">{lengthError}</div>}
    <label className="decal-width-label">Width *</label>
    <input
      className="decal-width-input"
      type="number"
      value={customWidth}
      onChange={(e) => {
        setCustomWidth(e.target.value);
        if (e.target.value > 0) setWidthError(''); // Clear error if width is greater than 0
      }}
      placeholder="Enter width"
    />
    <select
      className="decal-width-select"
      value={widthUnit}
      onChange={(e) => setWidthUnit(e.target.value)}
    >
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
    {widthError && <div className="error-message">{widthError}</div>}
    </div>
    <div className="decal-cut-unit-container">
        <label className="decal-cut-unit-label">Cut Type *</label>
        <select 
    className="decal-cut-input" 
    name="decal-cut"
    value={decalCut}
    onChange={(e) => {
        setDecalCut(e.target.value);
        if (e.target.value) {
           setDecalCutTypeError(''); // Clear error once a valid decal type is selected
        }
      }}>
        <option value="" disabled>Select Cut Type</option> {/* Default option */}
        {decalCutTypeOptions.map((option, index) => (
    <option key={index} value={option.value} disabled={option.disabled}>
      {option.name}
    </option>
  ))}
  </select>
  {decalCutTypeError && <div className="error-message">{decalCutTypeError}</div>}
    </div>
    <div className="decal-quantity-input-container">
    <label className="decal-quantity-label">Quantity *</label>
    <input
  type="number"
  className="decal-quantity-input"
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
</div>
<button className="btn btn--full submit-decals" type="button" onClick={HandleAddDecal}>
    ADD DECALS
  </button>
  <div className="decal-list">
  <h3 className="added-decal-list">Added Decals:</h3>
  <ul>
  {addedDecals.length > 0 ? (
    addedDecals.map((decal, index) => (
      <li className="decal-item" key={index}>
        <p className="decal-type-p"><b className="added-decal-b-type">Type:</b> {decal.type}</p>
        <p className="decal-size-p"><b className="added-decal-b-size">Size:</b> {decal.size}</p>
        <p className="decal-cut-p"><b className="added-decal-b-cut">Cut Type:</b> {decal.cut}</p>
        <p className="decal-quantity-p"><b className="added-decal-b-quantity">Quantity:</b> {decal.quantity}</p>
        <button
          className="btn btn--full remove-decal"
          onClick={() => handleRemoveDecals(index)}
        >
          REMOVE DECAL
        </button>
      </li>
    ))
  ) : (
    <p className="no-added-decals">No decals added yet.</p>
  )}
</ul>
{decalErrorMessage && <div className="error-message">{decalErrorMessage}</div>}
</div>

</div>
<div className="decal-file-section">
<label className="decal-file-label">Logo/Image:</label>
<h2 className="decal-warn"><b className="decal-notice">NOTICE</b>: If you're submitting a PNG, JPG, or any file that has PIXELATED Images, there will be a vectorizing fee to vectorize your logo depending on 
    how long it takes us to vectorize. If you want to avoid the vectorization fee, it is better to submit PDFs or SVGs that already have vectorization inside. 
    These PDF/SVG files cannot have any PNGs or JPGs inside because the PDF/SVG have been exported or saved as a PDF/SVG but has a JPG/PNG file inside making it much worse to vectorize. 
    JPG/PNG files are compressed Image files making them Blurry and Pixelated. That is why vectorization plays an important role in order for your items to not print blurry or pixelated.
    <p className="log-re">Logo Redesigning(Optional)</p>
    <p className="logo-warn"><b className="logo-notice">NOTICE</b>: If you need us to design a new logo for you, you can submit your old logo on
    here: <a href="/new-logo" className="btn -- new-decal-logo-button">NEW LOGO</a>
    We will send you a quote for the logo redesigning and you can choose to accept it or not.
</p>
</h2>
<div className="file-decal-section">
<label htmlFor="logo-select" className="decal-logo">Logo/Image for Decals *</label>
<div className="choose-logo-contain">
    <label className="file-decal-label">
    {formData.img ? (
            <span>{formData.img.name}</span>
          ) : (
            <span>Choose Your Logo For Your Decals</span>
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
            <button type="button" className="remove-decal-file-button" onClick={() => handleFileRemove('img')}>Remove</button>
          )}
 {imgErrorMessage && <span className="error-message">{imgErrorMessage}</span>}
</div>
</div>
</div>
<div className="decal-message-container">
<label className="message-decal-label">Message: </label>
<h1 className="message-decal-note">Tell us about your decals and how you want it designed! Please Specify Logo Redesigning if you submitted
    a logo redesigning from our logo redesigning page and your new logo will be on the decals. If you need to specify
    how you want your decals cut with whatever cut type you selected(Transfer Cut, Die-Cut, Kiss-Cut) like outlines,
    colors, etc., please specify it here. If you need to specify anything else, please specify it here.
</h1>

<textarea
  className="message-decal-text"
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
  <button type="button" className="btn btn--full submit-sign" onClick={handleSubmit}>SUBMIT DECALS & STICKERS</button>

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
export default Decal;
