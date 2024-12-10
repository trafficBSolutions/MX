import React, { useState } from 'react'; 
import images  from '../../utils/dynamicImportImages';
function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleMenu = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <header className="header-material-worx">
            <div className="mobile-material-nav-icon">
                <button className="mobile-material-nav" onClick={toggleMenu}>
                    <ion-icon className="icon-mobile-nav" name="menu-outline">---</ion-icon>
                </button>
            </div>
            
            <nav className={`main-material-nav ${isNavOpen ? 'active' : ''}`}>
            <a className="header-material-logo" href="/">
            <img alt="TBS logo" className="tbs-logo-img" src={images["../assets/MX Logos/MX.svg"].default}/>
            </a>
            <div className="material-worx-phone-header">
                <a className="material-worx-phone-header-link" href="tel:+17062630175"><img className="header-phone-img" src={images["../assets/service image buttons/Phone-Call Blue.svg"].default}></img>(706) 263-0175</a>
            </div>
            <div className="google-header">
                <a className="google-header-link" href="https://www.google.com/maps/place/Traffic+%26+Barrier+Solutions%2FMaterial+WorX+Sign+Shop/@34.5029371,-84.9243756,10362m/data=!3m1!1e3!4m6!3m5!1s0x886007df83843f3b:0x84510d87790af625!8m2!3d34.5117917!4d-84.948025!16s%2Fg%2F11l28zhlzt?entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" rel="noopener noreferrer"><img className="google-header-img" src={images["../assets/MX Logos/Google.svg"].default}></img></a>
            </div>
                <ul className="main-material-nav-list">
                    <li><a className="main-material-nav-link" href="/about-us">About Us</a></li>
                    <li><a className="main-material-nav-link-view" href="">Blog</a></li>
                    <li>
                        <a className="main-material-nav-link" href="/services">Services</a>
                        <ul className="sub-material-nav-list">
                            <li><a className="main-material-nav-link" href="/custom-signs">Custom Sign</a></li>
                            <li><a className="main-material-nav-link" href="/decals-stickers">Decals & Stickers</a></li>
                            <li><a className="main-material-nav-link" href="/banners">Banners</a></li>
                            <li><a className="main-material-nav-link" href="/t-shirts-sweatshirts-jackets">T-Shirts, Sweatshirts, Jackets</a></li>
                            <li><a className="main-material-nav-link" href="/window-frost-tint">Window Frosting & Tinting</a></li>
                            <li><a className="main-material-nav-link" href="/drywall-floor-concrete">Wall, Floor & Concrete Graphics</a></li>
                            <li><a className="main-material-nav-link" href="/fleet-graphics">Fleet Graphics</a></li>
                        </ul>
                    </li>
                    <li><a className="main-material-nav-link" href="/contact-us">Contact Us</a></li>
                </ul>
                <div className="header-worx-links">
                <a className="header-worx-logo" href="https://www.trafficbarriersolutions.com" target="_blank" rel="noopener noreferrer">
    <img className="material-worx-img" alt="TBS Logo" src={images["../assets/MX Logos/TBS.svg"].default}/>
</a>
            </div>
            </nav>
        </header>
    );
}

export default Header;
