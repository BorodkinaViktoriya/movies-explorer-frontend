import React, {useEffect} from "react";
import './Login.css';
import {Link, useHistory} from 'react-router-dom';
import Form from "../Form/Form";
import {authorize} from "../../utils/MainApi";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import isEmail from 'validator/es/lib/isEmail';
import {emailValidationErrorMessage} from "../../utils/constants";
import Preloader from "../Preloader/Preloader";

function Login({ loggedIn, handleLogin, fetchErrorMessage}) {
  const history = useHistory();

  const {values, handleChange, errors, isValid} = useFormWithValidation({
    loginEmail: (value) => {
      if (!isEmail(value)) {
        return emailValidationErrorMessage
      }
      return '';
    }
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin({password: values.loginPassword, email: values.loginEmail})
  }

  return (
    <section className="login">
      {(typeof loggedIn == "undefined") && <Preloader/>}
      {loggedIn && (history.push('/movies'))}
      {loggedIn === false && (
        <Form formTitle={'Рады видеть!'}
              buttonText={'Войти'}
              subText={'Ещё не зарегистрированы?'}
              linkText={'Регистрация'}
              link={'/signup'}
              isDisabled={!isValid}
              fetchErrorMessage={fetchErrorMessage}
              onSubmit={handleSubmit}
        >
          <label className="form__label">E-mail
            <input
              type="email" id="loginEmail" value={values.loginEmail || ''} onChange={handleChange}
              className="form__input form__input_type_email"
              name="loginEmail" required minLength="2" maxLength="40"
            />
            <span id="email-error" className="form__error">{errors.loginEmail}</span>
          </label>
          <label className="form__label">Пароль</label>
          <input
            type="password" id="loginPassword" value={values.loginPassword || ''} onChange={handleChange}
            className="form__input form_input_type_password"
            name="loginPassword" required minLength="2" maxLength="200"
          />
          <span id="password-error" className="form__error">{errors.loginPassword}</span>
        </Form>
      )
      }
    </section>
  )
}

export default Login;