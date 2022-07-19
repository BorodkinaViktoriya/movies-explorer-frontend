import './Header.css';
import React from 'react';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';

function Header(props) {

  return (
    <header className={props.isDark ? 'header header_dark': 'header'}>
      <Link to="/" className="header__link">
       <img src={headerLogo}
        className="header__logo" alt="Логотип"
      />
    </Link>
      <Route path="/sign-in">
        <Link to="sign-up" className="header__link">Регистрация</Link>
      </Route>
      <Route path="/sign-up">
        <Link to="sign-in" className="header__link">Войти</Link>
      </Route>
      <Route exact path="/">
        <div className="header__nav">
          <p className="header__email">{props.authorisationEmail}</p>
          <button onClick={props.onSignOut} className="header__link header__button">Войти</button>
        </div>
      </Route>
    </header>
  )
}

export default Header;