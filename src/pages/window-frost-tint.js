import { useState } from 'react';
import '../css/window.css';
import '../css/headerfooter.css';
import '../css/toaster.css';
import axios from 'axios';
import MXWindowGal from '../photogallery/WindowMXgallery';
import Header from '../components/headerviews/HeaderWindow';
import images from '../utils/dynamicImportImages';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            const [isSubmitting, setIsSubmitting] = useState(false); 
            const [termsAccepted, setTermsAccepted] = useState(false);
            const [formData, setFormData] = useState({
              name: '',
              company: '',
              email: '',
              phone: '',
              windowSize: { length: '', width: '', border: '' },
              tint: '',
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
            
            const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try { const requiredFields = ['name', 'company', 'email', 'phone', 'message', 'terms'];;
    const newErrors = {};

    requiredFields.forEach(field => {
      if (!formData[field]) {
        let fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
                  if (field === 'name') fieldLabel = 'First & Last Name';
                  if (field === 'company') fieldLabel = 'Company Name';
                  if (field === 'phone') fieldLabel = 'Phone Number';
                  if (field === 'email') fieldLabel = 'Email';
                  if (field === 'terms') fieldLabel = 'Terms & Conditions';
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
              const formattedWindowSize = addedSizes
                .map(size => `Length: ${size.length}, Width: ${size.width}, Border: ${size.border}`)
                .join(' | ');
                const formDataToSend = {
                  ...formData,
                  windowSize: formattedWindowSize, // Join the added sizes array into a string
                  tint: addedTint.join(', '),      // Join the added tints array into a string
                };
          setIsSubmitting(true);
      const response = await axios.post('/window-frost-tint', formDataToSend, {
        headers: {
          'Content-Type': 'application/json'
      }})
      console.log(response.data); // Now this works
           
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        windowSize: { length: '', width: '', border: '' },
        tint: '',
        message: '',
        terms: ''
      });
      setAddedSizes([]);  // Clear added sizes
      setAddedTint([]);   // Clear added tints
      setErrors({});
      setPhone('');
      setSubmissionMessage(
        '✅ Your window job has been submitted! We will be with you as soon as possible.'
      );}
      catch (err) {
        console.error(err);
        toast.success('✅ Job submitted! Check your email for confirmation.');
        setSubmissionErrorMessage("Something went wrong.");
      } finally {
        setIsSubmitting(false);
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
                        <h3 className="fill-info">Fields marked with * are required.</h3>
                </div>
                <div className="window-actual">
                  <div className="name-section-window">
<div className="first-name-window-input">

  <div className="first-window-name">
    <div className="firstname-window-input">
    <div className="input-first-window-container">
<label className="first-window-label-name">Name *</label>
<input
name="name"
type="text"
className="firstname-window-name-input"
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
<div className="company-window-input">
  <div className="company-window">
    <div className="window-company-name-input">
    <div className="window-input-container">
      <label className="company-window-name">Company *</label>
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
<div className="window-size-section">
<div className="size-window-section">
  <div className="length-window-section">
    <label>Window Specifications *</label>
    <label className="length-window-label" htmlFor="length">Window Length</label>
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
    <label className="width-window-label" htmlFor="width">Window Width</label>
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
  <label className="border-label" htmlFor="border">Border Radius</label>
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


<button className="btn -- submit-window-size" type="button" onClick={handleAddSize}>
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
            className="btn -- remove-size"
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



<div className="tint-imgs">
    <div className="window-text-container">
        <h1 className="place-examples">Frost/Tint Examples</h1>
    </div>
<div className="window-img-container">
    <div className="window-img-contain">
        <img src={images["black out.png"]} alt="tint=photo" className="place-img"/>
        <h3 className="place-img-test">Black Out</h3>
</div>
<div className="window-img-contain">
        <img src={images["white out.png"]} alt="tint=photo" className="place-img"/>
        <h3 className="place-img-test">White Out</h3>
</div>
<div className="window-img-contain">
        <img src={images["white frost.png"]} alt="tint=photo" className="place-img"/>
        <h3 className="place-img-test">White Frost</h3>
</div>
<div className="window-img-contain">
        <img src={images["reflective.png"]} alt="tint=photo" className="place-img"/>
        <h3 className="place-img-test">Reflective</h3>
</div>
<div className="window-img-contain">
        <img src={images["Panashield.png"]} alt="tint=photo" className="place-img"/>
        <h3 className="place-img-test">Panashield</h3>
</div>
<div className="window-img-contain">
        <img src={images["sputterd bronze.png"]} alt="tint=photo" className="place-img"/>
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
      <button className="btn -- submit-window-place" type="button" onClick={handleAddTint}>
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
            className="btn -- remove-tint"
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
<label className="message-window-label">Message *</label>
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
  You agree to pay for all window prints and labor once production begins. No cancellations after materials are ordered or work has started.
</p>
</div>
{errors.terms && <div className="error-message">{errors.terms}</div>}
  </div>
  <div className="submit-button-wrapper">
    <button
    type="submit"
    className="btn btn--full submit-window"
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <div className="spinner-button">
        <span className="spinner"></span> Submitting...
      </div>
    ) : (
      'SUBMIT WINDOW FROSTING/TINTING'
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
            <li><a className="footer-material-nav-link-view" href="/window-frost-tint">Window Frosting & Tinting</a></li>
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
export default Window;
