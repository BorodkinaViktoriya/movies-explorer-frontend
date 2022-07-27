import React from "react";
import './Register.css';
import Form from "../Form/Form";

function Register() {
  return (
    <section className="register">
      <Form
        formTitle={'Добро пожаловать!'} buttonText={'Зарегистрироваться'} subText={'Уже зарегистрированы?'}
        linkText={'Войти'} link={'/signin'}>
        <label className="form__label">Name</label>
        <input
          type="email" id="login-email"
          className="form__input form__input_type_name"
          name="registerName" required minLength="2" maxLength="30"
        />
        <span id="login-email-error" className="form__error"></span>
      </Form>
    </section>
  )
}

export default Register;