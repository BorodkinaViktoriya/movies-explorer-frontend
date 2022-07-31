import React from "react";
import './Login.css';
import {Link, useHistory} from 'react-router-dom';
import Form from "../Form/Form";
import {authorize} from "../../utils/MainApi";
import useForm from "../../hooks/useForm";

function Login({setLoggedIn, setCurrentUser}) {
  const history = useHistory();
  const {values, handleInputChange} = useForm();

  function handleLogin(evt) {
    evt.preventDefault();
    console.log(values)
    authorize(values)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          console.log({values})
          setCurrentUser(values);
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
            values={values}
            onChange={handleInputChange}
            onSubmit={handleLogin}/>
    </section>
  )
}

export default Login;