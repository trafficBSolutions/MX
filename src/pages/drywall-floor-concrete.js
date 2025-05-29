import { useState } from 'react';
import '../css/dry.css';
import '../css/headerfooter.css';
import '../css/toaster.css';
import axios from 'axios';
import MXDrywallGallery from '../photogallery/DrywallMXgallery';
import Header from '../components/headerviews/HeaderDry';
import images from '../utils/dynamicImportImages';
import { toast } from 'react-toastify';
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
            const [fileError, setFileError] = useState('');
            const [addedPlacement, setAddedPlacement] = useState([]);
            const [termsAccepted, setTermsAccepted] = useState(false);
            const [isSubmitting, setIsSubmitting] = useState(false); 
            const [addedFinishing, setAddedFinishing] = useState([]);
            const [errorMessage, setErrorMessage] = useState('');
            const [formData, setFormData] = useState({
              name: '',
              company: '',
              email: '',
              phone: '',
              vinylSize: { length: '', width: '' },
              placement: '',
              finishing: '',
              img: null,
              message: '',
              terms: false
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
const handleFinishChange = (e) => {
  const { value, checked } = e.target;
  let updated = [...addedFinishing];

  if (checked) {
    if (!updated.includes(value)) {
      updated.push(value);
    }
  } else {
    updated = updated.filter((item) => item !== value);
  }

  setAddedFinishing(updated);
  setFormData((prev) => ({ ...prev, finishing: updated })); // Still used for checkbox state

  if (updated.length > 0) {
    setErrors((prev) => ({ ...prev, finishing: '' }));
  }
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
            const handleFileChange = (e, fileType) => {
              const newFiles = Array.from(e.target.files);
              setFormData(prevState => ({
                ...prevState,
                [fileType]: [...(prevState[fileType] || []), ...newFiles]
              }));
              setFileError('');
            };
            const handleFileRemove = (fileType) => {
              setFormData({ ...formData, [fileType]: [] }); // Clear all files in the array
            };
      const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try { const requiredFields = ['name','company', 'email', 'phone','message', 'terms', 'img'];
    const newErrors = {};
    requiredFields.forEach(field => {
      if (!formData[field]) {
        let fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
          if (field === 'name') fieldLabel = 'First & Last Name';
          if (field === 'company') fieldLabel = 'Company Name';
          if (field === 'phone') fieldLabel = 'Phone Number';
          if (field === 'img') fieldLabel = 'Logo';
          if (field === 'terms') fieldLabel = 'Terms & Conditions';
        newErrors[field] = `${fieldLabel} is required!`;
      }
    });
 if (!addedPlacement.length) {
              newErrors.placement = 'At least one placement is required.';
            }
            if (formData.finishing.length === 0) {
              newErrors.finishing = 'Please select at least one finishing.';
            }
    
    if (Object.keys(newErrors).length > 0) {
      setErrorMessage('Required fields are missing.'); // Set the general error message
      setErrors(newErrors);
      return;
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
              const formDataToSend = new FormData(); 
              if (formData.img?.length > 0) {
          formData.img.forEach((file) => {
            formDataToSend.append('img', file);
          });
        }
formDataToSend.append('name', formData.name);
formDataToSend.append('company', formData.company);
formDataToSend.append('email', formData.email);
formDataToSend.append('phone', formData.phone);
formDataToSend.append('message', formData.message);
formDataToSend.append('terms', formData.terms);
formDataToSend.append('vinylSize', addedvinylSizes.join(', '));
formDataToSend.append('placement', addedPlacement.join(', '));
if (addedFinishing.length === 0) {
  newErrors.finishing = 'Please select at least one finishing.';
} else {
  formDataToSend.append('finishing', addedFinishing.join(', '));
}

        
  setIsSubmitting(true);
      const response = await axios.post('/drywall-floor-concrete', formDataToSend, {
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
          vinylSize: { length: '', width: '' },
          placement: '',
          finishing: '',
          img: null,
          message: '',
          terms: ''
      });
        setAddedvinylSizes([]);
        setAddedPlacement([]);
        setAddedFinishing([]);
        setErrors({});
        setPhone('');
      setSubmissionMessage(
        '✅ Drywall/Floor/Concrete Graphics Request Submitted!'
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
                        <h3 className="fill-info">Fields marked with * are required.</h3>
                </div>
                <div className="dry-actual">
                  <div className="name-section-dry">
<div className="first-dry-dry-input">

  <div className="first-dry-name">
    <div className="firstname-dry-input">
    <div className="input-first-dry-container">
<label className="first-dry-label-name">Name *</label>
<input
name="name"
type="text"
className="firstname-dry-name-input"
text="first-name--input"
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
</div>
<div className="company-dry-input">
  <div className="company-dry">
    <div className="dry-company-name-input">
    <div className="dry-input-container">
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
<div className="size-dry-vinyl-section">
  <h2 className="size-dry-label">Job Details</h2>
<div className="size-dry-section">
  <div className="length-dry-section">
    <label className="length-dry-label" htmlFor="length">Vinyl Length *</label>
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
    <label className="width-dry-label" htmlFor="width">Vinyl Width *</label>
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
    className="btn -- dry-vinyl-submit-size"
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
            className="btn -- dry-vinyl-remove-submit-size"
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
  {errors.vinylSize && <p className="error-message">{errors.vinylSize}</p>}
</div>
<div className="placement-imgs">
<div className="place-img-dry-container">
    <div className="place-img-container">
      <img src={images["Nance 2.jpg"]} alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Drywall Graphics</h3>
</div>
<div className="place-img-container">
        <img src={images["floor graphics.jpg"]} alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Floor Graphics</h3>
</div>
<div className="place-img-container">
        <img src={images["concrete graphic.jpg"]} alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Concrete Graphics</h3>
</div>
<div className="place-img-container">
        <img src={images["brick graphic.jpg"]} alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Brick Wall Graphics</h3>
</div>
<div className="place-img-container">
        <img src={images["cinder graphics.jpg"]} alt="Placement=photo" className="place-img"/>
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

        <button className="btn -- submit-place" type="button" onClick={handleAddPlacement}>
    ADD PLACEMENT
  </button>
  <div className="placement-list">
  <ul>
  {addedPlacement.length > 0 ? (
    addedPlacement.map((placement, index) => (
      <li className="placement-item" key={index}>
        {placement}
        <button
          className="btn -- remove-placement"
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
      <label className="finish-label">Finishing Options *</label>

<div className="finish-fleet-section">
<div className="checkbox-finish-options">
  {finishOptions.map((option, index) => (
    <div key={index} className="finish-checkbox-item">
     <input
  type="checkbox"
  id={`finish-${index}`}
  value={option.name}
  checked={formData.finishing.includes(option.name)}
  onChange={handleFinishChange}
/>
      <label htmlFor={`finish-${index}`}>{option.name}</label>
    </div>
  ))}
</div>
{errors.finishing && <div className="error-message">{errors.finishing}</div>}
  </div>
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
<div className="dry-message-container">
<label className="message-dry-label">Message *</label>
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
    className="btn btn--full submit-dry"
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <div className="spinner-button">
        <span className="spinner"></span> Submitting...
      </div>
    ) : (
      'SUBMIT CUSTOM DRYWALL FLOOR CONCRETE GRAPHICS'
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
            <li><a className="footer-material-nav-link" href="/t-shirts-sweatshirts-jackets">Custom Apparel</a></li>
            <li><a className="footer-material-nav-link" href="/window-frost-tint">Window Frosting & Tinting</a></li>
            <li><a className="footer-material-nav-link-view" href="/drywall-floor-concrete">Wall & Floor Decals</a></li>
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
export default Adhesive;
