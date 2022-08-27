import React, {useState} from "react";
import './Navigation.css'
import {Link, useLocation} from "react-router-dom";
import logo from "../../images/profile-icon.svg";

function Navigation({loggedIn}) {
  const {pathname} = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  function toggleBurger() {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      {
        loggedIn ? (
          <div className="navigation">
            <button className="burger__button" onClick={toggleBurger}></button>
            <div className={isOpen ? "burger__container burger__container_opened" : "burger__container"}>
              <button className="burger__close" onClick={toggleBurger}></button>
              <ul className="burger__list">
                <li className="burger__list-item">
                  <Link to="/" className={pathname === "/" ? "burger__link burger__link_active" : "burger__link"}
                        className="burger__link">Главная</Link>
                </li>
                <li className="burger__list-item">
                  <Link to="/movies"
                        className={pathname === "/movies" ? "burger__link burger__link_active" : "burger__link"}>Фильмы</Link>
                </li>
                <li className="burger__list-item">
                  <Link to="/saved-movies"
                        className={pathname === "/saved-movies" ? "burger__link burger__link_active" : "burger__link"}>Сохранённые&nbsp;фильмы</Link>
                </li>
                <li className="burger__list-item">
                  <Link to="/profile" className="burger__link burger__link_type_account">
                    <p className="burger__account">Аккаунт</p>
                    <div src={logo} className="burger__logo"></div>
                  </Link>
                </li>
              </ul>

            </div>
            <div className="navigation__container">
              <Link to="/movies" className={pathname === "/movies" ? "navigation__films navigation__films_active" : "navigation__films"}>Фильмы</Link>
              <Link to="/saved-movies" className={pathname === "/saved-movies" ? "navigation__saved navigation__saved_active" : "navigation__saved"}>Сохранённые&nbsp;фильмы</Link>
            </div>

            <Link to="/profile" className="navigation__profile">
              <p className="navigation__account">Аккаунт</p>
              <div src={logo} className="navigation__logo"></div>
            </Link>
          </div>
        ) : (
          <div className="navigation">
            <Link to="signup" className="navigation__sign-up">Регистрация</Link>
            <Link to="signin" className="navigation__sign-in">Войти</Link>
          </div>
        )}
    </div>
  )
}

export default Navigation;