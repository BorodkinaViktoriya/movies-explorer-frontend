import React from "react";
import './Navigation.css'
import {Link, Route} from "react-router-dom";
import logo from "../../images/profile-icon.svg";


function Navigation({loggedIn}) {
  return (
    <div>
      {
        loggedIn ? (
          <div className="navigation">
            <button className="burger__button"></button>
            <div className="bu">

            </div>
            <div className="navigation__container">
              <Link to="/movies" className="navigation__films">Фильмы</Link>
              <Link to="/saved-movies" className="navigation__saved">Сохранённые&nbsp;фильмы</Link>
            </div>

            <Link to="/profile" className="navigation__profile">
              <p className="navigation__account">Аккаунт</p>
              <div src={logo} className="navigation__logo"></div>
            </Link>
          </div>

        ) : (
          <div className="navigation">
            <Link to="sign-up" className="navigation__sign-up">Регистрация</Link>
            <Link to="sign-in" className="navigation__sign-in">Войти</Link>
          </div>
        )}
    </div>
  )
}

export default Navigation;