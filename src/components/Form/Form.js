import "./Form.css";
import {Link} from "react-router-dom";
import headerLogo from "../../images/header-logo.svg";
import React from "react";

function Form({children, formTitle, buttonText, subText, linkText, link}) {
  return (
    <form className="form" id='form' /* onSubmit={}*/>
      <Link to="/" className="form__logo">
        <img src={headerLogo} className="form__logo" alt="Логотип"/>
      </Link>
      <fieldset className="form__fieldset">
        <legend className="form__title">{formTitle}</legend>
        {children}
        <label className="form__label">E-mail</label>
        <input
          type="email" id="form-email"
          className="form__input form__input_type_email"
          name="loginEmail" placeholder="pochta@yandex.ru|" required minLength="2" maxLength="40"
        />
        <span id="login-email-error" className="form__error"></span>
        <label className="form__label">Пароль</label>
        <input
          type="password" id="login-password" /*value={} onChange={}*/
          className="form__input form_input_type_password"
          name="loginPassword" required minLength="2" maxLength="200"
        />
        <span id="login-password-error" className="form__error"></span>
      </fieldset>
      <button className="form__button" type="submit">{buttonText}</button>
      <p className="form__sub-text">{subText}
        <a className="form__sub-link" href={link}>{linkText}</a>
      </p>
    </form>
  )
}

export default Form;