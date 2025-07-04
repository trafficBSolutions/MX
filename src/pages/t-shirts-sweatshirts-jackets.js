import {useState} from 'react';
import Header from '../components/headerviews/HeaderShirt';
import axios from 'axios';
import '../css/shirt.css';
import '../css/headerfooter.css';
import '../css/toaster.css';
import MXShirtGallery from '../photogallery/ShirtMXgallery';
import { toast } from 'react-toastify';
import images from '../utils/dynamicImportImages';
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
    { name: 'XXXL', disabled: false },
    { name: 'XXXXL', disabled: false }
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
    const [typeErrorMessage, setTypeErrorMessage] = useState(''); // For type error
    const [sizeErrorMessage, setSizeErrorMessage] = useState(''); // For size error
    const [colorErrorMessage, setColorErrorMessage] = useState(''); // For color error
    const [quantityErrorMessage, setQuantityErrorMessage] = useState(''); // For quantity error
    const [errors, setErrors] = useState({});
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [fileError, setFileError] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
    const [apparelErrorMessage, setApparelErrorMessage] = useState(''); // For apparel error
    const [addedApparel, setAddedApparel] = useState([]);
    const [formData, setFormData] = useState({
      name: '',
      company: '',
      email: '',
      phone: '',
      apparel: [],
      img: null,
      message: '',
      terms: false
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
      const newFiles = Array.from(e.target.files);
      setFormData(prevState => ({
        ...prevState,
        [fileType]: [...(prevState[fileType] || []), ...newFiles]
      }));
      setFileError('');
    };
const handleFileRemove = (fileType) => {
                setFormData({ ...formData, [fileType]: null });
              };
      const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try { const requiredFields = ['name', 'company', 'email','phone', 'message', 'terms', 'img'];
    const newErrors = {};
let hasError = false;
    requiredFields.forEach(field => {
      if (!formData[field]) {
        let fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
          if (field === 'name') fieldLabel = 'Name';
          if (field === 'company') fieldLabel = 'Company';
          if (field === 'email') fieldLabel = 'Email';
          if (field === 'phone') fieldLabel = 'Phone Number';
          if (field === 'img') fieldLabel = 'Logo';
          if (field === 'message') fieldLabel = 'Message';
          if (field === 'terms') fieldLabel = 'Terms & Conditions';
        newErrors[field] = `${fieldLabel} is required!`;
      }
    });
      if (addedApparel.length === 0) {
        setApparelErrorMessage('Please add at least one apparel item');
        hasError = true;
      } else {
        setApparelErrorMessage('');
      }
if (Object.keys(newErrors).length > 0 || hasError) {
  setErrorMessage('Required fields are missing.');
  setErrors(newErrors);
  setIsSubmitting(false);
  return;
}

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('company', formData.company);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('message', formData.message);
    
        if (formData.img?.length > 0) {
          formData.img.forEach((file) => {
            formDataToSend.append('img', file);
          });
        }
        if (!termsAccepted) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            terms: 'You must agree to pay upon job completion.'
          }));
          setErrorMessage('You must accept the terms and conditions.');
          setIsSubmitting(false);
          return;
        }  
        formDataToSend.append('apparels', JSON.stringify(addedApparel));
  setIsSubmitting(true);
      const response = await axios.post('/t-shirts-sweatshirts-jackets', formDataToSend, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
      console.log(response.data); // Now this works
           
      setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          apparel: '',
          img: '',
          message: '',
          terms: ''
      });
setAddedApparel([]);
        setErrors({});
        setPhone('');
      setSubmissionMessage(
        '✅ T-Shirt/Sweatshirt/Jacket Request Submitted!'
      );}
      catch (err) {
        console.error(err);
        toast.success('✅ Job submitted! Check your email for confirmation.');
        setSubmissionErrorMessage("There was an error submitting your request. Please try again.");
      } finally {
        setIsSubmitting(false);
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
        <h3 className="fill-info">Fields marked with * are required.</h3>
            </div>
                <div className="apparel-actual">
                <div className="name-section-apparel">
<div className="first-name-apparel-input">

  <div className="first-apparel-name">
    <div className="firstname-apparel-input">
    <div className="input-first-apparel-container">
<label className="first-apparel-label-name">Name *</label>
<input
  name="name"
  type="text"
  className="firstname-apparel-name-input"
  placeholder="Enter First & Last Name"
  value={formData.name}
  onChange={(e) => {
    setFormData({ ...formData, name: e.target.value });
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' })); // Clear the error
    }
  }}
/>
{errors.name && <div className="error-message">{errors.name}</div>}
<label className="project-control-label">Company Name *</label>
<p className="project-company-input-label">
  If you are wanting to submit a project that isn't for a company, please enter your name in the company field.
</p>
  <input
    className="project-company-input"
    type="text"
    placeholder="Enter Company Name"
    value={formData.company}
    onChange={(e) => {
      const  value = e.target.value;
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setFormData({ ...formData, company: capitalizedValue });
      // Clear error if the input is no longer empty
      if (value.trim() !== '') {
        setErrors((prevErrors) => ({ ...prevErrors, company: '' }));
      }
    }
    }
  />
{errors.company && <div className="error-message">{errors.company}</div>}
</div>
    </div>
  </div>
</div>
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
<div className="apparel-input-container">
    <div className="apparel-type-input-container">
        <label className="apparel-type-label">Apparel Type *</label>
        <p className="apparel-multi-note">
  <strong>IMPORTANT:</strong> If you need multiple sizes or colors, please add each variation separately with the correct quantity. <br />
  Example: Add 10 Large Black shirts, then add 5 XL Blue shirts, or same color just different size and quantity, etc.
</p>
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
  {errors.apparel && <div className="error-message">{errors.apparel}</div>}
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
      <div className="fleet-file-section">
<label className="fleet-file-label">Logo/Image *</label>
  <h2 className="apparel-warn">
    <b className="apparel-notice">NOTICE</b>: Submitting PNG or JPG files may require a vectorization fee if they're pixelated. To avoid this, please upload true vector files (PDF or SVG without embedded images). This ensures your apparel prints crisp and clean.
    <p className="log-re">Need a new logo?</p>
    <p className="logo-warn">
      <b className="logo-notice">LOGO REDESIGN</b>: You can upload your old logo <a href="/new-logo">here</a> for a redesign quote.
    </p>
  </h2>
<div className="file-fleet-section">
<div className="choose-logo-contain">
  <label className="file-fleet-label">
    {formData.img && formData.img.length > 0 ? (
      <span>Add More Photos or Logos</span>
    ) : (
      <span>Choose Image File(s)</span>
    )}
    <input
  type="file"
  name="img" // ✅ This is correct
  accept=".pdf,.svg,.doc,.png,.jpg,.jpeg"
  onChange={(e) => {
                        handleFileChange(e, 'img');
                          if (e.target.files[0]) {
                            setErrors((prevErrors) => ({ ...prevErrors, img: '' })); // Clear the error
                          }}}
                          multiple
                          />
  </label>

  {formData.img && formData.img.length > 0 && (
    <button type="button" className="remove-fleet-file-button" onClick={() => handleFileRemove('img')}>
      Remove All
    </button>
  )}

  {fileError && <span className="error-message">{fileError}</span>}

  {formData.img && formData.img.length > 0 && (
    <ul className="selected-fleet-files-list">
      {formData.img.map((file, index) => (
        <li key={index}>{file.name}</li>
      ))}
    </ul>
  )}
</div>
{errors.img && <div className="error-message">{errors.img}</div>}
</div>
</div>
<div className="apparel-message-container">
<label className="message-apparel-label">Message *</label>
<h1 className="message-apparel-note">Tell us about your apparel and how you want it designed!
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
<div className="terms-checkbox">
  <label className="terms-label">Terms & Conditions *</label>
  <input
    type="checkbox"
    id="terms"
    checked={termsAccepted}
    onChange={(e) => {
      const checked = e.target.checked;
      setTermsAccepted(checked);
      setFormData((prev) => ({ ...prev, terms: checked }));
      if (checked) {
        setErrors((prevErrors) => ({ ...prevErrors, terms: '' }));
      }
    }}
  />
<p className="terms-text">
  <strong>PLEASE READ AND CHECK:</strong><br />
  You agree to pay for all custom shirts and labor once production begins. No cancellations after materials are ordered or work has started.
</p>
</div>
{errors.terms && <div className="error-message">{errors.terms}</div>}
  </div>
  <div className="submit-button-wrapper">
    <button
    type="submit"
    className="btn btn--full submit-sign"
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <div className="spinner-button">
        <span className="spinner"></span> Submitting...
      </div>
    ) : (
      'SUBMIT CUSTOM APPAREL'
    )}
  </button>
  {submissionMessage && (
    <div className="custom-toast success">{submissionMessage}</div>
  )}
  {submissionErrorMessage && (
    <div className="custom-toast error">{submissionErrorMessage}</div>
  )}
  {errorMessage && (
    <div className="custom-toast error">{errorMessage}</div>
  )}
         </div> 
                    </div>
            </div>
            </form>
        </main>
      <footer className="material-footer">
  <div className="site-material-footer__inner">
    <img className="mx-img" alt="TBS logo" src={images["MX Tan.svg"]} />
    <div className="footer-navigation-content">
      <h2 className="footer-title">Digital Services</h2>
    <ul className="footer-navigate">
      <li><a className="footer-material-nav-link" href="/new-logo">New Logos</a></li>
      <li><a className="footer-material-nav-link" href="/new-website">Websites</a></li>
    </ul>
    </div>
    <div className="footer-shop">
          <h2 className="footer-title">Sign Shop Services</h2>
        <ul className="footer-navigate">
            <li><a className="footer-material-nav-link" href="/custom-signs">Custom Signs</a></li>
            <li><a className="footer-material-nav-link" href="/decals-stickers">Decals & Stickers</a></li>
            <li><a className="footer-material-nav-link" href="/banners">Banners</a></li>
            <li><a className="footer-material-nav-link-view" href="/t-shirts-sweatshirts-jackets">Custom Apparel</a></li>
            <li><a className="footer-material-nav-link" href="/window-frost-tint">Window Frosting & Tinting</a></li>
            <li><a className="footer-material-nav-link" href="/drywall-floor-concrete">Wall & Floor Decals</a></li>
            <li><a className="footer-material-nav-link" href="/fleet-graphics">Fleet Graphics</a></li>
            </ul>
    </div>
    <div className="footer-contact">
      <h2 className="footer-title">Contact</h2>
      <ul className="footer-navigate">
      <li><a className="footer-material-nav-link" href="/contact-us">Contact Us</a></li>
        <li><a className="footer-material-nav-link" href="tel:+17062630175">Call: (706) 263-0175</a></li>
        <li><a className="footer-material-nav-link" href="mailto: tbsolutions1999@gmail.com">Email: tbsolutions1999@gmail.com</a></li>
        <li><a className="footer-material-nav-link" href="https://www.google.com/maps/place/Traffic+%26+Barrier+Solutions%2FMaterial+WorX+Sign+Shop/@34.5115302,-84.9476215,94m/data=!3m1!1e3!4m6!3m5!1s0x886007df83843f3b:0x84510d87790af625!8m2!3d34.5117917!4d-84.948025!16s%2Fg%2F11l28zhlzt?entry=ttu&g_ep=EgoyMDI0MDkyNC4wIKXMDSoASAFQAw%3D%3D"
      >
        723 N. Wall St, Calhoun, GA, 30701</a></li>
      </ul>
    </div>

    <div className="social-icons">
      <h2 className="footer-title">Follow Us</h2>
      <a className="social-icon" href="https://www.facebook.com/tbssigns2022/" target="_blank" rel="noopener noreferrer">
        <img className="facebook-img" src={images["facebook.png"]} alt="Facebook" />
      </a>
      <a className="social-icon" href="https://www.tiktok.com/@tbsmaterialworx?_t=8lf08Hc9T35&_r=1" target="_blank" rel="noopener noreferrer">
        <img className="tiktok-img" src={images["tiktok.png"]} alt="TikTok" />
      </a>
      <a className="social-icon" href="https://www.instagram.com/tbsmaterialworx?igsh=YzV4b3doaTExcjN4&utm_source=qr" target="_blank" rel="noopener noreferrer">
        <img className="insta-img" src={images["instagram.png"]} alt="Instagram" />
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
  };
export default Shirt;
