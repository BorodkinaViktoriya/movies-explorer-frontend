import './Header.css';
import React from 'react';
import {Link} from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';
import Navigation from "../Navigation/Navigation";

function Header(props) {

  return (
    <header className={props.isDark ? 'header header_dark' : 'header'}>
      <Link to="/" className="header__link">
        <img src={headerLogo}
             className="header__logo" alt="Логотип"/>
      </Link>
      <Navigation loggedIn={props.loggedIn}/>
    </header>
  )
}

export default Header;