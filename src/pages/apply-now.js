import '../css/contact.css'
import '../css/apply.css'
import Header from '../components/headerviews/HeaderDrop'
import {useState} from 'react'
import axios from 'axios'
import images from '../utils/dynamicImportImages';
import '../css/headerfooter.css';

const ApplyNow = () => {
    const [phone, setPhone] = useState('');
    const [formData, setFormData] = useState({
        first: '',
        last: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');

    const handlePhoneChange = (event) => {
        const input = event.target.value;
        const rawInput = input.replace(/\D/g, '');
        const formatted = rawInput.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        
        setPhone(formatted);
        setFormData({ ...formData, phone: formatted });
        
        if (rawInput.length === 10) {
            setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, phone: 'Please enter a valid 10-digit phone number.' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionErrorMessage('');
        setSubmissionMessage('');

        const requiredFields = ['first', 'last', 'email', 'phone', 'position', 'experience'];
        const newErrors = {};

        requiredFields.forEach(field => {
            if (!formData[field]) {
                let fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
                if (field === 'first') fieldLabel = 'First Name';
                if (field === 'last') fieldLabel = 'Last Name';
                if (field === 'phone') fieldLabel = 'Phone Number';
                newErrors[field] = `${fieldLabel} is required!`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setSubmissionErrorMessage('Required fields are missing.');
            return;
        }

        try {
            const response = await axios.post('/apply-now', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log(response.data);
            setFormData({
                first: '',
                last: '',
                email: '',
                phone: '',
                position: '',
                experience: '',
                message: ''
            });
            setErrors({});
            setPhone('');
            setSubmissionMessage('Application submitted successfully! We will contact you soon.');
        } catch (error) {
            console.error('Error submitting application:', error);
            setSubmissionErrorMessage('An error occurred while submitting. Please try again.');
        }
    };

    return (
        <div>
            <Header/>
            <main className="contact-main">
                <div className="material-video-banner">
                    <video className="material-page-video-banner" autoPlay loop muted playsInline>
                        <source src={images['mx pic.mp4']} type="video/mp4" />
                    </video>
                    <div className="material-name-container">
                        <img src={images['Material WorX Tan White.svg']} alt="Material WorX Logo" />
                    </div>
                </div>
                <h1 className="contact-material">Join Our Team</h1>
                <div className="contact-flexi">
                    <form className="contact-set" onSubmit={handleSubmit}>
                        <h1 className="contact-app-box">APPLY NOW</h1>
                        <h2 className="contact-fill">We're Hiring: Receptionist & Installer Positions</h2>
                        <h3 className="fill-info">Fields marked with * are required.</h3>
                        <div className="contact-actual">
                            <div className="name-section-contact">
                                <div className="first-name-contact-input">
                                    <div className="first-contact-name">
                                        <div className="firstname-contact-input">
                                            <div className="input-first-contact-container">
                                                <label className="first-contact-label-name">First Name *</label>
                                                <input
                                                    name="first"
                                                    type="text"
                                                    className="firstname-contact-name-input"
                                                    placeholder="Enter First Name"
                                                    value={formData.first}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, first: e.target.value });
                                                        if (e.target.value) {
                                                            setErrors((prevErrors) => ({ ...prevErrors, first: '' }));
                                                        }
                                                    }}
                                                />
                                                {errors.first && <div className="error-message">{errors.first}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="last-contact-name">
                                        <div className="last-contact-input">
                                            <div className="last-contact-input-container">
                                                <label className="last-contact-label-name">Last Name *</label>
                                                <input
                                                    name="last"
                                                    type="text"
                                                    className="lastname-contact-name-input"
                                                    placeholder="Enter Last Name"
                                                    value={formData.last}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, last: e.target.value });
                                                        if (e.target.value) {
                                                            setErrors((prevErrors) => ({ ...prevErrors, last: '' }));
                                                        }
                                                    }}
                                                />
                                                {errors.last && <div className="error-message">{errors.last}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="emailphone-contact-section">
                                <div className="emailphone-contact-input">
                                    <div className="email-contact">
                                        <div className="email-contact-input">
                                            <div className="email-contact-input-container">
                                                <label className="email-contact-name">Email *</label>
                                                <input
                                                    name="email"
                                                    type="text"
                                                    className="email-contact-box"
                                                    placeholder="Enter Email"
                                                    value={formData.email}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, email: e.target.value });
                                                        if (e.target.value) {
                                                            setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
                                                        }
                                                    }}
                                                />
                                                {errors.email && <div className="error-message">{errors.email}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="phone-contact">
                                        <div className="contact-phone-name-input">
                                            <div className="contact-phone-input-container">
                                                <label className="phone-contact-label">Phone Number *</label>
                                                <input
                                                    name="phone"
                                                    type="text"
                                                    className="phone-contact-box"
                                                    placeholder="Enter Phone Number"
                                                    value={phone}
                                                    onChange={handlePhoneChange}
                                                />
                                                {errors.phone && <div className="error-message">{errors.phone}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="company-contact-section">
                                <div className="company-contact-input">
                                    <div className="company-contact">
                                        <div className="contact-company-name-input">
                                            <div className="contact-input-container">
                                                <label className="company-contact-name">Position *</label>
                                                <select 
                                                    name="position" 
                                                    className="company-contact-name-input"
                                                    value={formData.position}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, position: e.target.value });
                                                        if (e.target.value) {
                                                            setErrors((prevErrors) => ({ ...prevErrors, position: '' }));
                                                        }
                                                    }}
                                                >
                                                    <option value="">Select Position</option>
                                                    <option value="Receptionist">Receptionist</option>
                                                    <option value="Installer">Installer - Vehicle Wraps & Fleet Graphics</option>
                                                </select>
                                                {errors.position && <div className="error-message">{errors.position}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="company-contact-section">
                                <div className="company-contact-input">
                                    <div className="company-contact">
                                        <div className="contact-company-name-input">
                                            <div className="contact-input-container">
                                                <label className="company-contact-name">Years of Experience *</label>
                                                <input 
                                                    name="experience" 
                                                    type="text" 
                                                    className="company-contact-name-input"
                                                    placeholder="Enter Years of Experience"
                                                    value={formData.experience}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, experience: e.target.value });
                                                        if (e.target.value) {
                                                            setErrors((prevErrors) => ({ ...prevErrors, experience: '' }));
                                                        }
                                                    }}
                                                />
                                                {errors.experience && <div className="error-message">{errors.experience}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-message-container">
                                <label className="message-contact-labe">Additional Information</label>
                                <textarea 
                                    className="message-contact-text" 
                                    name="message" 
                                    type="text" 
                                    placeholder="Tell us about yourself and why you'd be a great fit"
                                    value={formData.message}
                                    onChange={(e) => {
                                        setFormData({ ...formData, message: e.target.value });
                                    }}
                                />
                                {submissionMessage && (
                                    <div className="submission-message">{submissionMessage}</div>
                                )}
                                {submissionErrorMessage && (
                                    <div className="submission-error-message">{submissionErrorMessage}</div>
                                )}
                            </div>
                            <button type="submit" className="btn -- submit-contact">SUBMIT APPLICATION</button>
                        </div>
                    </form>

                </div>
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
                            <li><a className="footer-material-nav-link" href="/drywall-floor-concrete">Wall & Floor Decals</a></li>
                            <li><a className="footer-material-nav-link" href="/fleet-graphics">Fleet Graphics</a></li>
                        </ul>
                    </div>
                    <div className="footer-contact">
                        <h2 className="footer-title">Contact</h2>
                        <ul className="footer-navigate">
                            <li><a className="footer-material-nav-link-view" href="/contact-us">Contact Us</a></li>
                            <li><a className="footer-material-nav-link" href="tel:+17062630175">Call: (706) 263-0175</a></li>
                            <li><a className="footer-material-nav-link" href="mailto: tbsolutions1999@gmail.com">Email: tbsolutions1999@gmail.com</a></li>
                            <li><a className="footer-material-nav-link" href="https://www.google.com/maps/place/Traffic+%26+Barrier+Solutions%2FMaterial+WorX+Sign+Shop/@34.5115302,-84.9476215,94m/data=!3m1!1e3!4m6!3m5!1s0x886007df83843f3b:0x84510d87790af625!8m2!3d34.5117917!4d-84.948025!16s%2Fg%2F11l28zhlzt?entry=ttu&g_ep=EgoyMDI0MDkyNC4wIKXMDSoASAFQAw%3D%3D">723 N. Wall St, Calhoun, GA, 30701</a></li>
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
                <p className="footer-copy-p">&copy; 2026 Traffic & Barrier Solutions, LLC/Material WorX - 
                    Website MERN Stack Coded & Deployed by <a className="footer-face" href="https://www.facebook.com/will.rowell.779" target="_blank" rel="noopener noreferrer">William Rowell</a> - All Rights Reserved.</p>
            </div>
        </div>
    )
}
export default ApplyNow;
