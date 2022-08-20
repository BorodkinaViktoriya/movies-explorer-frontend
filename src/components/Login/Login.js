import React from "react";
import './Login.css';
import {Link, useHistory} from 'react-router-dom';
import Form from "../Form/Form";
import {authorize} from "../../utils/MainApi";
import useFormWithValidation from "../../hooks/useForm";
import isEmail from 'validator/es/lib/isEmail';
import {emailValidationErrorMessage} from "../../utils/constants";

function Login({setLoggedIn, setCurrentUser}) {
  const history = useHistory();
  const {values, handleChange, resetFrom, errors, isValid} = useFormWithValidation({
    loginEmail: (value) => {
      if (!isEmail(value)) {
        return emailValidationErrorMessage
      }
      return '';
    }
  });

  function handleLogin(evt) {
    evt.preventDefault();
    console.log(values)
    authorize({password: values.loginPassword, email: values.loginEmail})
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          console.log({values})
          setCurrentUser();
          /*setAuthorisationEmail(email);*/
          history.push('/movies')
        }
      })
      .catch(() => {
        console.log('job,rf ghb fdnjhbpfwbb')
      });
  }

  return (
    <section className="login">
      <Form formTitle={'Рады видеть!'}
            buttonText={'Войти'}
            subText={'Ещё не зарегистрированы?'}
            linkText={'Регистрация'}
            link={'/signup'}
            isDisabled={!isValid}
            onSubmit={handleLogin}>
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
    </section>
  )
}

export default Login;