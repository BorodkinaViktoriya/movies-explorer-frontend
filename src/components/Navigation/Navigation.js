import React from "react";
import './Navigation.css'
import {Link, Route} from "react-router-dom";


function Navigation(props) {
  return (
    <div className="navigation">
      {
        props.loggedIn
      }
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
    </div>
  )}

export default Navigation;