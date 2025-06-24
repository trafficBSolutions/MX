import {useState} from 'react'
import '../css/headerfooter.css';
import '../css/decal.css';
import '../css/toaster.css';
import Header from '../components/headerviews/HeaderDecal';
import axios from 'axios';
import MXDecalGallery from '../photogallery/DecalMXgallery';
import images from '../utils/dynamicImportImages';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  const decalTypeOptions = [
    { name: 'Matte', disabled: false },
    { name: 'Gloss', disabled: false },
    { name: 'Transparent', disabled: false },
    { name: 'Perforated Window', disabled: false },
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
    const [decalCut, setDecalCut] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileError, setFileError] = useState(''); 
    const [decalErrorMessage, setDecalErrorMessage] = useState(''); // For decal error
    const [widthError, setWidthError] = useState('');
    const [lengthError, setLengthError] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [decalTypeError, setDecalTypeError] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [decalCutTypeError, setDecalCutTypeError] = useState('');
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
    img: null,
    message: ''
  });
  const HandleAddDecal = () => {
    let isValid = true;

    // Reset decal-related errors
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
    try { const requiredFields = ['name', 'company', 'email', 'phone', 'message', 'terms', 'img'];
    const newErrors = {};
  
  requiredFields.forEach(field => {
    if (!formData[field]) {
      let fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
      if (field === 'name') fieldLabel = 'Name';
      if (field === 'company') fieldLabel = 'Company Name';
      if (field === 'email') fieldLabel = 'Email';
      if (field === 'phone') fieldLabel = 'Phone Number';
      if (field === 'img') fieldLabel = 'Logo';
      if (field === 'terms') fieldLabel = 'Terms & Conditions';
      newErrors[field] = `${fieldLabel} is required!`;
    }
  });

    if (Object.keys(newErrors).length > 0) {
      setErrorMessage('Required fields are missing.'); // Set the general error message
      setErrors(newErrors);
      return;
    }
    if (addedDecals.length === 0) {
        setDecalErrorMessage('You must add at least one decal before submitting.');
    } else {
        setDecalErrorMessage('');
    }
const formDataToSend = new FormData();
              formDataToSend.append('name', formData.name);
              formDataToSend.append('company', formData.company);
              formDataToSend.append('email', formData.email);
              formDataToSend.append('phone', formData.phone);
              formDataToSend.append('message', formData.message);
          
              // Append the image file (logo)
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


        
  setIsSubmitting(true);
              formDataToSend.append('decals', JSON.stringify(addedDecals));
          
              const response = await axios.post('/decals-stickers', formDataToSend, {
                headers: {
                  'Content-Type': 'multipart/form-data', // Ensure multipart/form-data is set
                },
              });
      console.log(response.data); // Now this works
           
      setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      img: null,
      message: '',
      terms: '',
      });
      setAddedDecals([]);
      setErrors({});
      setPhone('');
      setSubmissionMessage(
        '✅ Decals & Stickers Request Submitted!'
      );}
      catch (err) {
        console.error(err);
        toast.success('✅ Job submitted! Check your email for confirmation.');
        setSubmissionErrorMessage("There was an error submitting your request. Please try again.");
      } finally {
        setIsSubmitting(false);
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
        <div className="material-type-container">
        <h1 className="sign-app-box">MATERIALS AVAILABLE FOR DECALS & STICKERS</h1>
  <div className="material-container">
<img className="orafol-img" alt="orafol" src={images["Orafol-Logo.svg"]} />
    <img className="substance-img" alt="substance" src={images["substance-logo.svg"]} />
</div>
</div>
        <form onSubmit={handleSubmit} className="decal-set -- box">
        <div className="decal-form-container container--narrow page-section">
        <div className="decal-form-info">
        <h1 className="decal-app-box">SEND AN INQUIRY OR GET A QUOTE</h1>
        <h2 className="decal-fill">Please Fill Out the Form Below to Submit Your Decals & Stickers Information to get an Inquiry or Quote.</h2>
        <h3 className="fill-info">Fields marked with * are required.</h3>
            </div>
            <div className="decal-actual">
            <div className="name-section-decal">
<div className="first-name-decal-input">

  <div className="first-decal-name">
    <div className="firstname-decal-input">
    <div className="input-first-decal-container">
<label className="first-decal-label-name">Name *</label>
<input
  name="name"
  type="text"
  className="firstname-decal-name-input"
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
</div>
    </div>
  </div>
<div className="company-decal-input">
  <div className="company-decal">
    <div className="decal-company-name-input">
    <div className="decal-input-container">
      <label className="company-decal-name">Company *</label>
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
{errors.company && <span className="error-message">{errors.company}</span>}
        </div>
    </div>
  </div>
  </div>
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
</div>
<div className="decal-sticker-section">
<label className="decal-sticker-label">Decal/Sticker *</label>
    <div className="decal-type-input-container">
      <label>Type</label>
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
    <label className="decal-width-label">Length</label>
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
    <label className="decal-width-label">Width</label>
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
        <label className="decal-cut-unit-label">Cut Type</label>
        <p className="decal-cut-unit-text">
        <b>Transfer-Cut</b> is a cut type that involves 
          cutting the letters or numbers and then placed 
          on transfer tape to be applied to your surface.
        </p>
        <p className="decal-cut-unit-text">
          <b>Kiss-Cut</b> is a cut type that 
          involves cutting the decal perfect to peal off the backing.
        </p>
        <p className="decal-cut-unit-text">
        <b>Die-Cut</b> is a cut type that involves a complete cut through meaning pop out 
          decals. This is not the same as Kiss-Cut.</p>

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
    <label className="decal-quantity-label">Quantity</label>
    <input
  type="number"
  className="decal-quantity-input"
  value={quantity}
  min="0"
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
      <span>Choose File(s)</span>
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
<div className="decal-message-container">
<label className="message-decal-label">Message *</label>
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
  You agree to pay for all decals and labor once production begins. No cancellations after materials are ordered or work has started.
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
      'SUBMIT DECALS & STICKERS'
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
            <li><a className="footer-material-nav-link-view" href="/decals-stickers">Decals & Stickers</a></li>
            <li><a className="footer-material-nav-link" href="/banners">Banners</a></li>
            <li><a className="footer-material-nav-link" href="/t-shirts-sweatshirts-jackets">Custom Apparel</a></li>
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
export default Decal;
