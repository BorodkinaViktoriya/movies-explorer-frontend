import React from "react";
import './Register.css';
import { useHistory} from 'react-router-dom';
import Form from "../Form/Form";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import {register} from "../../utils/MainApi";
import {
  emailValidationErrorMessage, registerUserError, nameRegex,
  nameValidationErrorMessage, registerUserConflictError, serverError
} from "../../utils/constants";
import isEmail from "validator/es/lib/isEmail";
import Preloader from "../Preloader/Preloader";

function Register({loggedIn, handleLogin, setFetchErrorMessage, fetchErrorMessage}) {

  const history = useHistory();

  const {values, handleChange, errors, isValid} = useFormWithValidation({
      registerEmail: (value) => {
        if (!isEmail(value)) {
          return emailValidationErrorMessage;
        }
        return '';
      },
      registerName: (value) => {
        if (!(nameRegex.test(value))) {
          return nameValidationErrorMessage;
        }
        return '';
      }
    }
  );

  function handleRegister(evt) {
    evt.preventDefault();
    register({name: values.registerName, password: values.registerPassword, email: values.registerEmail})
      .then((res) => {
        if (res) {
          handleLogin({password: values.registerPassword, email: values.registerEmail})
        }
      })
      .catch((err) => {
        if (err.status === 409) {
          return setFetchErrorMessage(registerUserConflictError)
        }
        if (err.status === 500) {
          return setFetchErrorMessage(serverError)
        }
        return setFetchErrorMessage(registerUserError)
      })
  }

  return (
    <section className="register">
      {(typeof loggedIn == "undefined") && <Preloader/>}
      {loggedIn && (history.push('/movies'))}
      {loggedIn === false && (
        <Form
          formTitle={'Добро пожаловать!'} buttonText={'Зарегистрироваться'} subText={'Уже зарегистрированы?'}
          linkText={'Войти'}
          link={'/signin'}
          onSubmit={handleRegister}
          isDisabled={!isValid}
          fetchErrorMessage={fetchErrorMessage}
        >
          <label className="form__label">Name
            <input
              type="text" id="registerName" value={values.registerName || ''} onChange={handleChange}
              className="form__input"
              name="registerName" required minLength="2" maxLength="30"
            />
            <span id="login-email-error" className="form__error">{errors.registerName}</span>
          </label>
          <label className="form__label">E-mail
            <input
              type="email" id="registerEmail" value={values.registerEmail || ''} onChange={handleChange}
              className="form__input"
              name="registerEmail" required minLength="2" maxLength="40"
            />
            <span id="registerEmail-error" className="form__error">{errors.registerEmail}</span>
          </label>
          <label className="form__label">Пароль
            <input
              type="password" id="registerPassword" value={values.registerPassword || ''} onChange={handleChange}
              className="form__input form_input_type_password"
              name="registerPassword" required minLength="2" maxLength="200"
            />
            <span id="registerPassword-error" className="form__error">{errors.registerPassword}</span>
          </label>
        </Form>
      )}
    </section>
  )
}

export default Register;