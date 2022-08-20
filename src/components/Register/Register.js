import React from "react";
import './Register.css';
import { Link, useHistory } from 'react-router-dom';
import Form from "../Form/Form";
import useFormWithValidation from "../../hooks/useForm";
import {authorize, register} from "../../utils/MainApi";
import {emailValidationErrorMessage, nameRegex, nameValidationErrorMessage} from "../../utils/constants";
import isEmail from "validator/es/lib/isEmail";


function Register({setLoggedIn}) {
  const history = useHistory();
  const {values, handleChange, resetFrom, errors, isValid} = useFormWithValidation({
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
   /* register({name:values.name, password:values.password, email:values.email})*/
    console.log({name:values.registerName, password:values.registerPassword, email:values.registerEmail})
    register({name:values.registerName, password: values.registerPassword, email:values.registerEmail})
      .then((res) => {
        if (res) {
          authorize({password: values.registerPassword, email:values.registerEmail})
            .then((res) => {
              if (res) {
                setCu
                setLoggedIn(true);
                localStorage.setItem('jwt', res.token);
                history.push('/movies')
              }
            })
            .catch((err) => {
              console.log('ошибка при авторизации')
            });
        }
      })
      .catch((err) => {
        console.log('ошибка при регистрации')
      })
  }


  return (
    <section className="register">
      <Form
        formTitle={'Добро пожаловать!'} buttonText={'Зарегистрироваться'} subText={'Уже зарегистрированы?'}
        linkText={'Войти'}
        link={'/signin'}
        onSubmit={handleRegister}
        isDisabled={!isValid}
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
            type="email" id="registerEmail" value={values.registerEmail||''} onChange={handleChange}
            className="form__input"
            name="registerEmail"  required minLength="2" maxLength="40"
          />
          <span id="registerEmail-error" className="form__error">{errors.registerEmail}</span>
        </label>
        <label className="form__label">Пароль
        <input
          type="password" id="registerPassword" value={values.registerPassword||''} onChange={handleChange}
          className="form__input form_input_type_password"
          name="registerPassword" required minLength="2" maxLength="200"
        />
        <span id="registerPassword-error" className="form__error">{errors.registerPassword}</span>
        </label>
      </Form>
    </section>
  )
}

export default Register;