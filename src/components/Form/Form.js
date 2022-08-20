import "./Form.css";
import {Link} from "react-router-dom";
import headerLogo from "../../images/header-logo.svg";
import React from "react";

function Form({children, formTitle, buttonText, subText, linkText, link, onSubmit, isDisabled}) {


  return (
    <form className="form" id='form' onSubmit={onSubmit} noValidate>
      <Link to="/" className="form__logo">
        <img src={headerLogo} className="form__logo" alt="Логотип"/>
      </Link>
      <fieldset className="form__fieldset">
        <legend className="form__title">{formTitle}</legend>
        {children}
      </fieldset>
      <button className="form__button" type="submit" disabled={isDisabled}>{buttonText}</button>
      <p className="form__sub-text">{subText}
        <a className="form__sub-link" href={link}>{linkText}</a>
      </p>
    </form>
  )
}

export default Form;