import React, { useState, useEffect } from 'react';
import '../css/dry.css';
import '../css/headerfooter.css';
import axios from 'axios';
import MXDrywallGallery from '../components/DrywallGal';
import Header from '../components/headerviews/HeaderDry';

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
  const sizeOptions = [
    { name: 'Select Measurement', disabled: true }, // Add this default option
    { name: 'Feet', disabled: false },
    { name: 'Inches', disabled: false },
  ];
  const placeOptions = [
    { name: 'Select Placement', disabled: true }, // Default option
    { name: 'Drywall Graphics (Examples: Homes and Office Buildings)', disabled: false },
    { name: 'Floor Graphics', disabled: false },
    { name: 'Concrete Graphics (Examples: Sidewalks and Roads)', disabled: false },
    { name: 'Brick Wall Graphics', disabled: false },
    { name: 'Cinder Block Wall Graphics (School Cinder Block Graphics)', disabled: false }
  ];
  
  const finishOptions = [
    { name: 'Select Finishing', disabled: true }, // Default option
    { name: 'Matte', disabled: false },
    { name: 'Gloss', disabled: false }
  ];
const Adhesive = () => {
    const [phone, setPhone] = useState('');
            const [selectedSize, setSelectedSize] = useState('');
            const [addedSizes, setAddedSizes] = useState([]);
            const [lengthUnit, setLengthUnit] = useState(''); // Default to feet
            const [widthUnit, setWidthUnit] = useState(''); // Default to feet
            const [availableplaceOptions, setAvailableplaceOptions] = useState(placeOptions);
            const [availablefinishOptions, setAvailablefinishOptions] = useState(finishOptions);
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
              length: '',
              width: '',
              type: null,
              finishing: null,
              img: null,
              message: ''
            });
            const [errors, setErrors] = useState({});
            const [submissionMessage, setSubmissionMessage] = useState('');
            const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
            const handleStateChange = (e) => {
              setSelectedState(e.target.value);
              setErrors({ ...errors, state: '' }); // Clear state error when state changes
            };
            const handlePhoneChange = (event) => {
              const input = event.target.value;
              const formatted = input.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
              setPhone(formatted);
              setFormData({ ...formData, phone: formatted });
            };
            const handleFileChange = (e, fileType) => {
            const file = e.target.files[0];
            setFormData({ ...formData, [fileType]: file });
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
              const requiredFields = ['first', 'last', 'company', 'email', 'phone', 'address', 'city', 'state', 'zip', 'length', 'width', 'message'];
    const newErrors = {};
          
            
              requiredFields.forEach(field => {
                if (!formData[field]) {
                  let fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
                  if (field === 'first') fieldLabel = 'First Name';
                  if (field === 'last') fieldLabel = 'Last Name';
                  if (field === 'company') fieldLabel = 'Company Name';
                  if (field === 'phone') fieldLabel = 'Phone Number';
                  if (field ==='address') fieldLabel = 'Address';
                  if (field === 'city') fieldLabel = 'City';
                  if (field ==='state') fieldLabel = 'State';
                  if (field === 'zip') fieldLabel = 'Zip Code';
                  if (field === 'img') fieldLabel = 'Logo';
                  newErrors[field] = `${fieldLabel} is required!`;
                }
              });
          
              if (Object.keys(newErrors).length > 0) {
                  setErrorMessage('Required fields are Missing.');
                setErrors(newErrors);
                return;
              }
          
              try {
                const sizeData = {
                  length: `${formData.length} ${lengthUnit}`,
                  width: `${formData.width} ${widthUnit}`
                };
                const placeData = {
                    place: `${formData.place} ${placeUnit}`,
                    finish: `${formData.finish} ${finishUnit}`
                  };
                const formDataToSend = {
                  ...formData,
                  size: sizeData,
                };
                const response = await axios.post('/drywall-floor-concrete', formDataToSend, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                });
                console.log(response.data);
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
                  length: '',
                  width: '',
                  type: null,
                  finishing: null,
                  img: null,
                  message: ''
                });
          
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
onChange={(e) => setFormData({ ...formData, first: e.target.value })}

/>


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
onChange={(e) => setFormData({ ...formData, last: e.target.value })}

/>
{errors.last && <div className="error-message">{errors.last}</div>}
</div>
    </div>
  </div>
</div>

<label className="dry-company-label">Company/Excavator: </label>

<div className="company-dry-input">
  <div className="company-dry">
    <div className="dry-company-name-input">
    <div className="dry-input-container">
      <label className="company-dry-name">Company *</label>
      <input name="company-dry-name-input" type="text" className="company-dry-name-input" text="company--input" placeholder="Enter Company Name"
        value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}

        />
        {errors.company && <span className="error-message">{errors.company}</span>}
        </div>
    </div>
  </div>
  </div>

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
onChange={(e) => setFormData({ ...formData, email: e.target.value })}

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
onChange={handlePhoneChange}
/>
{errors.phone && <div className="error-message">{errors.phone}</div>}
</div>
    </div>
  </div>
</div>

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
onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
onChange={(e) => setFormData({ ...formData, city: e.target.value })}
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
      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
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
        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
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
<label className="size-dry-label">Size of Vinyl:</label>
<div className="size-dry-section">
  <div className="length-dry-section">
    <label className="length-label" htmlFor="length">Length *</label>
    <input
      className="length-dry-box"
      type="number"
      name="length"
      value={formData.length}
      onChange={handleSizeChange}
      placeholder="Enter length"
    />
    <select
      className="length-select"
      value={lengthUnit}
      onChange={(e) => handleUnitChange('length', e.target.value)}
    >
      <option value="" disabled>Select Measurement</option> {/* Default option */}
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
  </div>

  <div className="width-dry-section">
    <label className="width-label" htmlFor="width">Width *</label>
    <input
      className="width-dry-box"
      type="number"
      name="width"
      value={formData.width}
      onChange={handleSizeChange}
      placeholder="Enter width"
    />
    <select
      className="width-select"
      value={widthUnit}
      onChange={(e) => handleUnitChange('width', e.target.value)}
    >
      <option value="" disabled>Select Measurement</option> {/* Default option */}
      <option value="feet">Feet</option>
      <option value="inches">Inches</option>
    </select>
  </div>

  <button className="btn btn--full submit-size" type="submit">SUBMIT SIZE</button>

  {submissionMessage && <p>{submissionMessage}</p>}
  {Object.keys(errors).map((error) => (
    <p key={error} className="error-message">{errors[error]}</p>
  ))}
</div>
<label className="place-dry-label">Type of Placement:</label>
<div className="placement-imgs">
    <div className="place-img-container">
        <h1 className="place-examples">Placement Examples</h1>
    </div>
<div className="place-flex-container">
    <div className="place-img-container">
        <img src="../public/MX Photos/Nance 2.jpg" alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Drywall Graphics</h3>
</div>
<div className="place-img-container">
        <img src="../public/thick adhesive vinyls/floor graphics.jpg" alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Floor Graphics</h3>
</div>
<div className="place-img-container">
        <img src="../public/thick adhesive vinyls/concrete graphic.jpg" alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Concrete Graphics</h3>
</div>
<div className="place-img-container">
        <img src="../public/thick adhesive vinyls/brick graphic.jpg" alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Brick Wall Graphics</h3>
</div>
<div className="place-img-container">
        <img src="../public/thick adhesive vinyls/cinder graphics.jpg" alt="Placement=photo" className="place-img"/>
        <h3 className="place-img-test">Cinder Block Graphics</h3>
</div>
    </div>
</div>
      <div className="place-dry-section">
        <label className="place-label" htmlFor="place">Placement *</label>
        <select
          className="place-select"
          value={formData.type}
          onChange={(e) => handleOptionChange('type', e.target.value)}
        >
          {availableplaceOptions.map((option, index) => (
            <option key={index} value={option.name} disabled={option.disabled}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <label className="finish-dry-label">Finishing Touch:</label>
      <div className="finish-dry-section">
        <label className="finish-label" htmlFor="finish">Finishing *</label>
        <select
          className="finish-select"
          value={formData.finishing}
          onChange={(e) => handleOptionChange('finishing', e.target.value)}
        >
          {availablefinishOptions.map((option, index) => (
            <option key={index} value={option.name} disabled={option.disabled}>
              {option.name}
            </option>
          ))}
        </select>
      </div>


<label className="dry-file-label">Logo/Image:</label>
<h2 className="dry-warn"><b className="dry-notice">NOTICE</b>: If you're submitting a PNG, JPG, or any file that has PIXELATED Images, there will be a vectorizing fee to vectorize your logo depending on 
    how long it takes us to vectorize. If you want to avoid the vectorization fee, it is better to submit PDFs or SVGs that already have vectorization inside. 
    These PDF/SVG files cannot have any PNGs or JPGs inside because the PDF/SVG have been exported or saved as a PDF/SVG but has a JPG/PNG file inside making it much worse to vectorize. 
    JPG/PNG files are compressed Image files making them Blurry and Pixelated. That is why vectorization plays an important role in order for your items to not print blurry or pixelated.
    <h1 className="log-re">Logo Redesigning(Optional)</h1>
    <h2 className="logo-warn"><b className="logo-notice">NOTICE</b>: If you need us to design a new logo for you, there will be fee for
    redesigning your logo depending on how much time it takes us and how fastidious you are at your logo redesign. Please Specify if you need your logo redesigned
    in the Message Section.
</h2>
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
<div className="dry-message-container">
<label className="message-dry-label">Message: </label>
<h1 className="message-dry-note">Tell us about your graphics and how you want it designed! Please Specify Logo Redesigning,
     and the Quantity of graphics needed. If you need
to request a crew to help install your drywall/concrete/floor graphics, please specify where the location is, when 
and what time you want an MX crew will arrive.</h1>

<textarea className="message-dry-text" name="message" type="text" placeholder="Enter Message"
  value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
  />
  {errors.message && <span className="error-message">{errors.message}</span>}
  {submissionMessage && (
<div className="submission-message">{submissionMessage}</div>
)}
  </div>
  <button type="button" className="btn btn--full submit-dry" onClick={handleSubmit}>SUBMIT CUSTOM DRYWALL/FLOOR/CONCRETE GRAPHICS</button>
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
            <img className="mx-img" alt="TBS logo" src="../public/MX Photos/MX-removebg-preview.png" />
            <ul className="footer-navigate">
              <li><a className="footer-material-nav-link" href="/custom-signs">Custom Signs</a></li>
              <li><a className="footer-material-nav-link" href="/decals-stickers">Decals & Stickers</a></li>
              <li><a className="footer-material-nav-link" href="/banners">Banners</a></li>
              <li><a className="footer-material-nav-link" href="/t-shirts-sweatshirts-jackets">T-Shirts Sweatshirts Jackets</a></li>
              <li><a className="footer-material-nav-link" href="/window-frost-tint">Window Frosting & Tinting</a></li>
              <li><a className="footer-material-nav-link-view" href="">Drywall Floor & Concrete Graphics</a></li>
              <li><a className="footer-material-nav-link" href="/fleet-graphics">Fleet Graphics</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <div className="statement-box">
              <p className="statement">
                <b className="safety-b">Safety Statement: </b>
                At TBS, safety is our top priority. We are dedicated to ensuring the well-being of our employees, clients, 
                and the general public in every aspect of our operations. Through comprehensive safety training, 
                strict adherence to regulatory standards, and continuous improvement initiatives, 
                we strive to create a work environment where accidents and injuries are preventable. 
                Our commitment to safety extends beyond compliance—it's a fundamental value embedded in everything we do. 
                Together, we work tirelessly to promote a culture of safety, accountability, and excellence, because when it comes to traffic control, there's no compromise on safety.
              </p>
              <p className="trademark-warning">
                <b className="warning-trade">WARNING:</b><b> Trademark Notice</b><img className="trademark-img" src="../public/MX Photos/MX-removebg-preview.png" alt="TBS Logo"></img> is a registered trademark of Traffic & Barrier Solutions, LLC. 
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
export default Adhesive