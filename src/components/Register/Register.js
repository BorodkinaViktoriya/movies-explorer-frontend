import React from "react";
import './Register.css';
import { Link, useHistory } from 'react-router-dom';
import Form from "../Form/Form";
import useForm from "../../hooks/useForm";
import {authorize, register} from "../../utils/MainApi";

function Register({setLoggedIn}) {
  const history = useHistory();
  const {values, handleInputChange} = useForm();

  function handleRegister(evt) {
    evt.preventDefault();
   /* register({name:values.name, password:values.password, email:values.email})*/
    console.log(values)
    register(values)
      .then((res) => {
        if (res) {
          authorize(values)
            .then((res) => {
              if (res) {
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
        values={values}
        onChange={handleInputChange}
        onSubmit={handleRegister}
      >
        <label className="form__label">Name</label>
        <input
          type="text" id="name" value={values.name || ''} onChange={handleInputChange}
          className="form__input form__input_type_name"
          name="name" required minLength="2" maxLength="30"
        />
        <span id="login-email-error" className="form__error"></span>
      </Form>
    </section>
  )
}

export default Register;