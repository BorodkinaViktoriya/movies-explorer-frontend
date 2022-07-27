import React from "react";
import './Login.css';
import Form from "../Form/Form";

function Login() {
  return (
    <section className="login">
      <Form formTitle={'Рады видеть!'} buttonText={'Войти'} subText={'Ещё не зарегистрированы?'}
            linkText={'Регистрация'} link={'/signup'}/>
    </section>
  )
}

export default Login;