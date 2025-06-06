import { useState } from 'react';
import '../css/banner.css';
import '../css/headerfooter.css';
import '../css/toaster.css'
import axios from 'axios';
import MXBannerGallery from '../photogallery/BannerMXgallery'
import Header from '../components/headerviews/HeaderBanner';
import images from '../utils/dynamicImportImages';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            const [addedSizes, setAddedSizes] = useState([]);
            const [addedFinishes, setAddedFinishes] = useState([]);
            const [addedPlaces, setAddedPlaces] = useState([]);
            const [lengthUnit, setLengthUnit] = useState(''); // Default to feet
            const [widthUnit, setWidthUnit] = useState(''); // Default to feet
            const [fileError, setFileError] = useState(''); 
            const [isSubmitting, setIsSubmitting] = useState(false);
            const [termsAccepted, setTermsAccepted] = useState(false);
            const [availablefinishOptions] = useState(finishOptions);
            const [errorMessage, setErrorMessage] = useState('');
            const [formData, setFormData] = useState({
              name: '',
              company: '',
              email: '',
              phone: '',
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
          
            // Validate size
            if (addedSizes.length === 0) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                bannerSize: 'Please add at least one banner size.',
              }));
            } else {
              setErrors((prevErrors) => ({
                ...prevErrors,
                bannerSize: '',
              }));
            }
                        if (addedFinishes.length === 0) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                finishing: 'Please add at least one banner finishing option.',
              }));
            } else {
              setErrors((prevErrors) => ({
                ...prevErrors,
                finishing: '',
              }));
            }
          
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


         // Append banner size as a formatted string like "2 feet x 2 feet"
              const formattedSizes = addedSizes.map((size) => `${size.length} x ${size.width}`).join(', ');
              formDataToSend.append('bannerSize', formattedSizes);
          
              // Append placement as a single string (assuming there's only one placement)
              const formattedPlacement = addedPlaces.map((place) => place.hang).join(', ');
              formDataToSend.append('hang', formattedPlacement);
          
              // Append finishing as a single string (assuming there's only one finishing)
              const formattedFinishing = addedFinishes.map((finish) => finish.name).join(', ');
              formDataToSend.append('finishing', formattedFinishing);
          setIsSubmitting(true);
              const response = await axios.post('/banners', formDataToSend, {
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
                bannerSize: {length: '', width: ''},
                hang: '',
                finishing: '',
                img: null,
                message: '',
                terms: false
      });
              setAddedSizes([]);
              setErrors({});
              setPhone('');
              setAddedPlaces([]);
              setAddedFinishes([]);
      setSubmissionMessage(
        '✅ Banner Request Submitted!'
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
                        <h3 className="fill-info">Fields marked with * are required.</h3>
                </div>
                <div className="banner-actual">
                  <div className="name-section-banner">
<div className="first-name-banner-input">

  <div className="first-banner-name">
    <div className="firstname-banner-input">
    <div className="input-first-banner-container">
<label className="first-banner-label-name">Name *</label>
<input
name="first"
type="text"
className="firstname-banner-name-input"
text="first-name--input"
placeholder="Enter First & Name"

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
</div>
<div className="company-banner-input">
  <div className="company-banner">
    <div className="banner-company-name-input">
    <div className="banner-input-container">
      <label className="company-banner-name">Company *</label>
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
<div className="size-banner-vinyl-section">
<div className="size-banner-section">
  <label className="size-banner-label">Banner Size *</label>
  <div className="length-banner-section">
    <label className="length-banner-label" htmlFor="length">Banner Length</label>
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
    <label className="width-banner-label" htmlFor="width">Banner Width</label>
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

  <button className="btn -- submit-banner-size" type="button" onClick={handleAddSize}>ADD SIZE</button>
  <div className="size-banner-list">
  <ul>
    {addedSizes.length > 0 ? (
      addedSizes.map((size, index) => (
        <li className="size-banner-item" key={index}>
          Length: {size.length}, Width: {size.width}
          <button className="btn -- remove-size" onClick={() => handleRemoveSize(index)}>REMOVE SIZE</button>
        </li>
      ))
    ) : (
      <p className="no-added-banner-size">No sizes added yet.</p>
    )}
  </ul>
</div>
      {errors.bannerSize && <span className="error-message">{errors.bannerSize}</span>}
</div>
<div className="placement-imgs">
    <div className="place-banner-flex-container">
        <h1 className="place-examples">Placement Examples</h1>
    </div>
<div className="place-banner-flex-container">
<div className="place-banner-flex-container">
        <img src={images["retract.png"]} alt="Placement=photo" className="place-banner-img"/>
        <h3 className="place-img-test">Retractable Stand</h3>
        <p className="retract-img-test">Retractable Stands are regular printed banners only they are not worked on by any of the banner types.
          Instead, they are placed on a retractable stand that can be pulled out and retracted when needed and are great for events and trade shows.
          You can close the banner up and store it in a bag when not in use and move it around easily.
        </p>
  </div>
  <div className="place-banner-flex-containerr">
        <img src={images["banner types.jpg"]} alt="Placement=photo" className="place-banner-type-img"/>
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
      <button className="btn -- submit-banner-place" type="button" onClick={handleAddPlacement}>ADD PLACEMENT</button>
      <div className="place-banner-list">
  <ul>
    {addedPlaces.length > 0 ? (
      addedPlaces.map((hang, index) => (
        <li className="hang-item" key={index}>
          {hang.hang}
          <button className="btn -- remove-banner-place" onClick={() => handleRemovePlace(index)}>REMOVE PLACEMENT</button>
        </li>
      ))
    ) : (
      <p className="no-added-banner-place">No placements added yet.</p>
    )}
  </ul>
</div>
          {errors.hang && <span className="error-message">{errors.hang}</span>}
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
      <button className="btn -- submit-banner-finish" type="button" onClick={handleAddFinish}>ADD FINISHING</button>
      <div className="finish-banner-list">
  <ul>
    {addedFinishes.length > 0 ? (
      addedFinishes.map((finish, index) => (
        <li className="finish-item" key={index}>
          {finish.name}
          <button className="btn -- remove-banner-finish" onClick={() => handleRemoveFinish(index)}>REMOVE FINISHING</button>
        </li>
      ))
    ) : (
      <p className="no-added-banner-finish">No finishes added yet.</p>
    )}
  </ul>
</div>
          {errors.finishing && <span className="error-message">{errors.finishing}</span>}
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
<div className="banner-message-container">
<label className="message-banner-label">Message *</label>
<h1 className="message-banner-note">Tell us about your banner and how you want it designed! Please Specify Logo Redesigning,
     and the Quantity of banners needed. If you need
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
  You agree to pay for all custom banners and labor once production begins. No cancellations after materials are ordered or work has started.
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
      'SUBMIT CUSTOM BANNER'
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
            <li><a className="footer-material-nav-link-view" href="/banners">Banners</a></li>
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
            );
};
export default Banner;
