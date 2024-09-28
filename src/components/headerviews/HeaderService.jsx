import React, { useState } from 'react'; 
function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleMenu = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <header className="header-material-worx">
            <a className="header-material-logo" href="/">
                <img alt="TBS logo" className="tbs-logo-img" src="../public/MX Photos/MX-removebg-preview.png" />
            </a>
            <div className="mobile-material-nav-icon">
                <button className="mobile-material-nav" onClick={toggleMenu}>
                    <ion-icon className="icon-mobile-nav" name="menu-outline">---</ion-icon>
                </button>
            </div>
            <nav className={`main-material-nav ${isNavOpen ? 'active' : ''}`}>
                <ul className="main-material-nav-list">
                    <li><a className="main-material-nav-link" href="/about-us">About Us</a></li>
                    <li><a className="main-material-nav-link" href="/pay-invoice">Pay Invoice</a></li>
                    <li>
                        <a className="main-material-nav-link-view" href="">Services</a>
                    </li>
                    <li><a className="main-material-nav-link" href="/contact-us">Contact Us</a></li>
                </ul>
            </nav>
            <div className="header-worx-links">
                <a className="header-worx-logo" href="/www.trafficbarriersolutions.com">
                    <img className="material-worx-img" alt="TBS Logo" src="../public/MX Photos/TBS.png"/>
                </a>
            </div>
        </header>
    );
}

export default Header;
