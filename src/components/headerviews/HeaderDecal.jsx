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
            <img alt="TBS logo" className="tbs-logo-img" src={images["MX Tan.svg"]}/>
            </a>
                <ul className="main-material-nav-list">
                    <li><a className="main-material-nav-link" href="/new-logo">New Logos</a></li>
                    <li>
                       <a className="main-material-nav-link">Sign Shop Services</a>
                        <ul className="sub-material-nav-list">
                            <li><a className="main-material-nav-link" href="/custom-signs">Custom Signs</a></li>
                            <li><a className="main-material-nav-link-view" href="">Decals & Stickers</a></li>
                            <li><a className="main-material-nav-link" href="/banners">Banners</a></li>
                            <li><a className="main-material-nav-link" href="/t-shirts-sweatshirts-jackets">Custom Apparel</a></li>
                            <li><a className="main-material-nav-link" href="/window-frost-tint">Window Frosting & Tinting</a></li>
                            <li><a className="main-material-nav-link" href="/drywall-floor-concrete">Drywall, Floor & Concrete Vinyl</a></li>
                            <li><a className="main-material-nav-link" href="/fleet-graphics">Fleet Graphics</a></li>
                        </ul>
                    </li>
                    <li><a className="main-material-nav-link" href="/new-website">Websites</a></li>
                    <li><a className="main-material-nav-link" href="/contact-us">Contact Us</a></li>
                </ul>
                <div className="header-worx-links">
                <a className="header-worx-logo" href="https://www.trafficbarriersolutions.com/" target="_blank" rel="noopener noreferrer">
    <img className="material-worx-img" alt="TBS Logo" src={images["TBS.svg"]}/>
</a>
            </div>
            </nav>
        </header>
    );
}

export default Header;
