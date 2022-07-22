import React from "react";
import './Navigation.css'
import {Link, Route} from "react-router-dom";


function Navigation({loggedIn}) {
  return (
    <div>
      {
        loggedIn ? (
          <div className="navigation_">
            <div className="navigation__container">
              <Link to="/movies" className="navigation__films">Фильмы</Link>
              <Link to="/sign-in" className="nav-films__saved">Сохранённые фильмы</Link>
              </div>
            <div className="navigation__container">
              <Link to="/sign-in" className="navigation__account">Аккаунт</Link>
            </div>


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