import "./Profile.css";
import React from "react";
import Header from "../Header/Header";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import useFormWithValidation from "../../hooks/useForm";

function Profile() {
  const currentUser = React.useContext(CurrentUserContext);
  const [userName, setUserName] = React.useState(currentUser.name);
  const {values, handleInputChange, setValues} = useFormWithValidation();
 /* React.useEffect(() => {
    if (currentUser) {
      setValues({name:currentUser.name, email:currentUser.email });
    }
  }, []);*/
  return (
    <>
      <Header isDark={false} loggedIn={true}/>
      <div className="profile">
        <form className="profile__form" id='profile-form' /* onSubmit={}*/>
          <fieldset className="profile__fieldset">
            <legend className="profile__title">Привет, {userName}!</legend>
            <label className="profile__label">Имя
              <input
                type="name" value={values.name}
                className="profile__input"
                name="name" required minLength="2" maxLength="40"
              />
            </label>
            <label className="profile__label">E-mail
              <input
                type="email" name="email" value={values.email}
                className="profile__input" required minLength="2" maxLength="40"
              ></input>
            </label>
          </fieldset>
          <button className="profile__button" type="submit">Редактировать</button>
          <button className="profile__button profile__button_type_out">Выйти из аккаунта</button>
        </form>
      </div>
    </>
  )
}

export default Profile;