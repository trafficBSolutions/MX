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
            <li><a className="main-material-nav-link" href="/custom-signs">Custom Signs</a></li>
            <li><a className="main-material-nav-link" href="/decals-stickers">Decals & Stickers</a></li>
            <li><a className="main-material-nav-link" href="/banners">Banners</a></li>
            <li><a className="main-material-nav-link" href="/t-shirts-sweatshirts-jackets">T-Shirts Sweatshirts Jackets</a></li>
            <li><a className="main-material-nav-link" href="/window-frost-tint">Window Frosting & Tinting</a></li>
            <li><a className="main-material-nav-link-view" href="">Drywall Floor & Concrete Vinyl</a></li>
            <li><a className="main-material-nav-link" href="/fleet-graphics">Fleet Graphics</a></li>
        </ul>
    </nav>
    <div className="header-worx-links">
    <a className="header-worx-logo" href="/www.trafficbarriersolutions.com">
        <img className="material-worx-img"alt="TBS Logo" src="../public/MX Photos/TBS.png"/>
    </a>
    </div>
</header>
    );
}

export default Header;