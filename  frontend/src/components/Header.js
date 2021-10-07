import React from 'react';
import headerLogo from '../images/logo.svg';

function Header() {
    return (
        <header className="header">
            <img className="logo header__logo" src={headerLogo} alt="Логотип Mesto" />
        </header>
    )
}

export default Header;
