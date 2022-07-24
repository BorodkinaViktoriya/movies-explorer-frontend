import React from "react";
import './Login.css';
import SignForm from "../Form/Form";

function Login() {
   return (
     <section className="login">
      <SignForm
      formTitle={'Рады видеть!'} buttonText={'Войти'} subText={'Ещё не зарегистрированы?'} linkText={'Регистрация'} link={'/signup'}/>
     </section>
   )
}

export default Login;