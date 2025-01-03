import React, {useState} from 'react';
import Header from '../components/headerviews/HeaderShirt';
import axios from 'axios';
import '../css/shirt.css';
import '../css/headerfooter.css';
import MXShirtGallery from '../photogallery/ShirtMXgallery';
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
  const apparelTypes = [
    { name: 'T-Shirts', disabled: false },
    { name: 'Sweatshirts', disabled: false },
    { name: 'Jackets', disabled: false }
  ];
  const apparelSizes = [
    { name: 'XS', disabled: false },
    { name: 'S', disabled: false },
    { name: 'M', disabled: false },
    { name: 'L', disabled: false },
    { name: 'XL', disabled: false },
    { name: 'XXL', disabled: false },
    { name: 'XXXL', disabled: false }
  ];
  const apparelColors = [
    { name: 'Black', disabled: false },
    { name: 'White', disabled: false },
    { name: 'Red', disabled: false },
    { name: 'Blue', disabled: false },
    { name: 'Green', disabled: false },
    { name: 'Yellow', disabled: false },
    { name: 'Orange', disabled: false },
    { name: 'Purple', disabled: false },
    { name: 'Pink', disabled: false },
    { name: 'Brown', disabled: false },
    { name: 'Gray', disabled: false },
    { name: 'Silver', disabled: false },
    { name: 'Gold', disabled: false },
    { name: 'Beige', disabled: false },
    { name: 'Maroon', disabled: false },
    { name: 'Olive', disabled: false },
    { name: 'Teal', disabled: false },
    { name: 'Navy', disabled: false },
    { name: 'Indigo', disabled: false },
    { name: 'Magenta', disabled: false },
    { name: 'Gray-Black', disabled: false },
    { name: 'Army-Green', disabled: false },
    { name: 'Sage-Green', disabled: false },
    { name: 'Safety-Green', disabled: false }
  ];
  const Shirt = () => {
    const [phone, setPhone] = useState('');
    const [apparelType, setApparelType] = useState('');
    const [apparelSize, setApparelSize] = useState('');
    const [apparelColor, setApparelColor] = useState('');
    const [quantity, setQuantity] = useState('');
    const [imgErrorMessage, setImgErrorMessage] = useState(''); // For image error
    const [typeErrorMessage, setTypeErrorMessage] = useState(''); // For type error
    const [sizeErrorMessage, setSizeErrorMessage] = useState(''); // For size error
    const [colorErrorMessage, setColorErrorMessage] = useState(''); // For color error
    const [quantityErrorMessage, setQuantityErrorMessage] = useState(''); // For quantity error
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
    const [apparelErrorMessage, setApparelErrorMessage] = useState(''); // For apparel error
    const [addedApparel, setAddedApparel] = useState([]);
    const [formData,  setFormData] = useState({
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
    const HandleAddApparel = () => {
        let isValid = true;

    // Reset apparel-related errors
    setTypeErrorMessage('');
    setSizeErrorMessage('');
    setColorErrorMessage('');
    setQuantityErrorMessage('');
    setErrorMessage('');

    // Validate apparel Type
    if (!apparelType) {
        setTypeErrorMessage('Please select an apparel type.');
        isValid = false;
    }
    if (!apparelSize) {
        setSizeErrorMessage('Please select an apparel size.');
        isValid = false;
    }
    if (!apparelColor) {
        setColorErrorMessage('Please select an apparel color.');
        isValid = false;
    }
    // Check for quantity
    if (quantity <= 0) {
        setQuantityErrorMessage('Please enter a valid quantity greater than 0.');
        isValid = false;
    }

    // If validation fails, return early to prevent submission
    if (!isValid) {
        return;
    }

    // Add the apparel details as an object
    const newApparel = {
        type: apparelType,
        size: apparelSize,
        color: apparelColor,
        quantity: quantity
    };
    setAddedApparel([...addedApparel, newApparel]);
    setErrorMessage('');
    setSubmissionErrorMessage('');

    setApparelType('');
    setApparelSize('');
    setApparelColor('');
    setQuantity(0);
    }
    const handleRemoveApparel = (index) => {
        const updatedApparel = [...addedApparel];
        updatedApparel.splice(index, 1);
        setAddedApparel(updatedApparel);
    }
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
        let hasError = false;
        if (!addedApparel.length === 0) {
            setErrorMessage('Please add at least one apparel.');
            hasError = true;
        }
        if (!formData.img) {
            setImgErrorMessage('You must select a logo/image for the apparel.');
            hasError = true;
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
    if (hasError) {
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
    
        // Append added shirts
        formDataToSend.append('apparels', JSON.stringify(addedApparel));
    const response = await axios.post('/t-shirts-sweatshirts-jackets', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure multipart/form-data is set
        },
      });
    console.log(response.data);
      setSubmissionMessage('T-Shirt/Sweatshirt/Jacket Request Submitted!');
  
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
      setAddedApparel([]);
      setErrors({});
      setPhone('');
    } catch (error) {
      console.error('Error submitting custom T-Shirt/Sweatshirt/Jacket Form', error);
      setSubmissionErrorMessage('There was an error submitting your request. Please try again.');
    }
  };
  return(
    <div>
        <Header/>
        <main>
        <div className="page-apparel-banner">
    <div className="apparel-name-container">
    <h1 className="apparel-description">CUSTOMIZABLE APPAREL</h1>
</div>
</div>
<div className="photo-gal-apparel">
        <MXShirtGallery /> {/* Render the photo gallery here */}
        </div>
        <form onSubmit={handleSubmit} className="apparel-set -- box">
            <div className="apparel-form-container container--narrow page-section">
            <div className="apparel-form-info">
        <h1 className="apparel-app-box">SEND AN INQUIRY OR GET A QUOTE</h1>
        <h2 className="apparel-fill">Please Fill Out the Form Below to Submit Your Custom Apparel Information to get an Inquiry or Quote.</h2>
            </div>
                <div className="apparel-actual">
                <div className="name-section-apparel">
<div className="first-name-apparel-input">

  <div className="first-apparel-name">
    <div className="firstname-apparel-input">
    <div className="input-first-apparel-container">
<label className="first-apparel-label-name">First Name *</label>
<input
  name="first"
  type="text"
  className="firstname-apparel-name-input"
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
  <div className="last-apparel-name">
    <div className="last-apparel-input">
    <div className="last-apparel-input-container">
<label className="last-apparel-label-name">Last Name *</label>
<input
  name="last"
  type="text"
  className="lastname-apparel-name-input"
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
<div className="company-apparel-section">
<div className="company-apparel-input">
  <div className="company-apparel">
    <div className="apparel-company-name-input">
    <label className="company-apparel-name">Company *</label>
      <input
  name="company-apparel-name-input"
  type="text"
  className="company-apparel-name-input"
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
<div className="emailphone-apparel-section">
<div className="emailphone-apparel-input">
  <div className="email-apparel">
    <div className="email-apparel-input">
    <div className="email-apparel-input-container">
<label className="email-apparel-name">Email *</label>
<input
  name="email"
  type="text"
  className="email-apparel-box"
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

  <div className="phone-apparel">
    <div className="apparel-phone-name-input">
    <div className="apparel-phone-input-container">
    <label className="phone-apparel-label">Phone Number *</label>
<input
  name="phone"
  type="text"
  className="phone-apparel-box"
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
<div className="address-apparel-section">
<div className="address-apparel-input-container">
<div className="address-apparel-input">
<div className="address-apparel-container">
  <div className="address-apparel-inputing">
<label className="addr-apparel-label">Address *</label>
<input
  name="address-box"
  type="text"
  className="address-apparel-box"
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
<div className="city-apparel-input">
<label className="city-apparel-label">City *</label>

<input
name="city-input"
type="text"
className="city-apparel-box"
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
<div className="city-apparel-state">
<div className="state-apparel-input">
<label className="state-apparel-label">State *</label>
<select
      name="state"
      className="state-apparel-box"
      
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
    <div className="zip-apparel-input">
  <label className="zip-apparel-label">Zip Code *</label>
  <input
    name="zip"
    type="text"
    className="zip-apparel-box"
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
<div className="apparel-input-container">
    <div className="apparel-type-input-container">
        <label className="apparel-type-label">Apparel Type *</label>
        <select
        className="apparel-type-input"
        name="apparel-type"
        value={apparelType}
        onChange={(e) => {
            setApparelType(e.target.value);
            if (e.target.value) {
              setTypeErrorMessage(''); // Clear error once a valid apparel type is selected
            }
          }}>
            <option value="">Select Apparel Type</option>
            {apparelTypes.map((option, index) => (
    <option key={index} value={option.value} disabled={option.disabled}>
      {option.name}
    </option>
  ))}
        </select>
        {typeErrorMessage && <span className="error-message">{typeErrorMessage}</span>}
        </div>
        <div className="apparel-size-input-container">
            <label className="apparel-size-label">Apparel Size *</label>
            <select
            className="apparel-size-input"
            name="apparel-size"
            value={apparelSize}
            onChange={(e) => {
                setApparelSize(e.target.value);
                if (e.target.value) {
                  setSizeErrorMessage(''); // Clear error once a valid apparel size is selected
                }
              }}>
                <option value="">Select Apparel Size</option>
                {apparelSizes.map((option, index) => (
    <option key={index} value={option.value} disabled={option.disabled}>
      {option.name}
    </option>
  ))}
              </select>
    {sizeErrorMessage && <span className="error-message">{sizeErrorMessage}</span>}
        </div>
        <div  className="apparel-color-input-container">
            <label className="apparel-color-label">Apparel Color *</label>
            <select
            className="apparel-color-input"
            name="apparel-color"
            value={apparelColor}
            onChange={(e) => {
                setApparelColor(e.target.value);
                if (e.target.value) {
                  setColorErrorMessage(''); // Clear error once a valid apparel color is selected
                }
            }}>
                <option value="">Select Apparel Color</option>
                {apparelColors.map((option, index) => (
    <option key={index} value={option.value} disabled={option.disabled}>
      {option.name}
    </option>
  ))}
            </select>
            {colorErrorMessage && <span className="error-message">{colorErrorMessage}</span>}
            </div>
            <div className="apparel-quantity-input-container">
                <label className="apparel-quantity-label">Apparel Quantity *</label>
                <input
  type="number"
  className="apparel-quantity-input"
  value={quantity}
  min="1"
  onChange={(e) => {
    const value = e.target.value;
    setQuantity(value);

    if (value <= 0 || !value) {
      setQuantityErrorMessage('Please enter a quantity greater than 0');
    } else {
      setQuantityErrorMessage(''); // Clear the error if valid
    }
  }}
  placeholder="Enter quantity"
/>
{quantityErrorMessage && <div className="error-message">{quantityErrorMessage}</div>}          
    </div>
    <button className="btn -- submit-apparels" type="button" onClick={HandleAddApparel}>
    ADD APPAREL
  </button> 
  <div className="apparel-list">
  <h3 className="added-apparel-list">Added Apparel:</h3>
  <ul>
  {addedApparel.length > 0 ? (
    addedApparel.map((apparel, index) => (
      <li className="apparel-item" key={index}>
        <p className="apparel-type-p"><b className="added-apparel-b-type">Type:</b> {apparel.type}</p>
        <p className="apparel-size-p"><b className="added-apparel-b-size">Size:</b> {apparel.size}</p>
        <p className="apparel-color-p"><b className="added-apparel-b-cut">Color:</b> {apparel.color}</p>
        <p className="apparel-quantity-p"><b className="added-apparel-b-quantity">Quantity:</b> {apparel.quantity}</p>
        <button
          className="btn -- remove-apparel"
          onClick={() => handleRemoveApparel(index)}
        >
          REMOVE APPAREL
        </button>
      </li>
    ))
  ) : (
    <p className="no-added-apparel">No apparel added yet.</p>
  )}
</ul>
{apparelErrorMessage && <div className="error-message">{apparelErrorMessage}</div>}
</div>     

    </div>
    <div className="apparel-file-section">
<label className="apparel-file-label">Logo/Image *</label>
<h2 className="apparel-warn"><b className="apparel-notice">NOTICE</b>: If you're submitting a PNG, JPG, or any file that has PIXELATED Images, there will be a vectorizing fee to vectorize your logo depending on 
    how long it takes us to vectorize. If you want to avoid the vectorization fee, it is better to submit PDFs or SVGs that already have vectorization inside. 
    These PDF/SVG files cannot have any PNGs or JPGs inside because the PDF/SVG have been exported or saved as a PDF/SVG but has a JPG/PNG file inside making it much worse to vectorize. 
    JPG/PNG files are compressed Image files making them Blurry and Pixelated. That is why vectorization plays an important role in order for your items to not print blurry or pixelated.
    <p className="log-re">Logo Redesigning(Optional)</p>
    <p className="logo-warn"><b className="logo-notice">NOTICE</b>: If you need us to design a new logo for you, you can submit your old logo on
    here: <a href="/new-logo">NEW LOGO</a>.
    We will send you a quote for the logo redesigning and you can choose to accept it or not.
</p>
</h2>
<div className="file-apparel-section">
<div className="choose-logo-contain">
    <label className="btn -- file-apparel-label">
    {formData.img ? (
            <span>{formData.img.name}</span>
          ) : (
            <span>Choose Your Logo For Your Apparel</span>
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
            <button type="button" className="btn -- remove-apparel-file-button" onClick={() => handleFileRemove('img')}>Remove</button>
          )}
 {imgErrorMessage && <span className="error-message">{imgErrorMessage}</span>}
</div>
</div>
</div>
<div className="apparel-message-container">
<label className="message-apparel-label">Message *</label>
<h1 className="message-apparel-note">Tell us about your apparel and how you want it designed! Please Specify Logo Redesigning if you submitted
    a logo redesigning from our logo redesigning page and your new logo will be on the apparel. If you need to specify
    how you want your apparel made with where ever you need on, please specify it here. If you need to specify anything else, please specify it here.
</h1>

<textarea
  className="message-apparel-text"
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
  <button type="button" className="btn btn--full submit-sign" onClick={handleSubmit}>SUBMIT CUSTOM APPAREL</button>

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
      <p className="footer-copy-p">&copy; 2025 Traffic & Barrier Solutions, LLC/Material WorX - 
        Website MERN Stack Coded & Deployed by <a className="footer-face"href="https://www.facebook.com/will.rowell.779" target="_blank" rel="noopener noreferrer">William Rowell</a> - All Rights Reserved.</p>
    </div>
    </div>
  )
  }
export default Shirt;
