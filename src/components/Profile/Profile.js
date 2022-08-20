import "./Profile.css";
import React from "react";
import Header from "../Header/Header";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import useFormWithValidation from "../../hooks/useForm";

function Profile() {
  const currentUser = React.useContext(CurrentUserContext);
  const [userName, setUserName] = React.useState(currentUser.name);
  const [userEmail, setUserEmail] = React.useState(currentUser.email);
  const [isEditing, setIsEditing] = React.useState(false);

  /* React.useEffect(() => {
     if (currentUser) {
       setValues({name:currentUser.name, email:currentUser.email });
     }
   }, []);*/

React.useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.name);
      setUserEmail(currentUser.email);
    }
  }, [currentUser]);

  function  handleEditing() {
    setIsEditing(true)

  }
  return (
    <>
      <Header isDark={false} loggedIn={true}/>
      <div className="profile">
        <form className="profile__form" id='profile-form' /* onSubmit={}*/>
          <fieldset className="profile__fieldset">
            <legend className="profile__title">Привет, {userName}!</legend>
            <label className="profile__label">Имя
              <input
                type="name" value={userName || ''}
                className="profile__input"
                name="userName" required minLength="2" maxLength="40"
              />
            </label>
            <label className="profile__label">E-mail
              <input
                type="email" name="userEmail" value={userEmail || ''}
                className="profile__input" required minLength="2" maxLength="40"
              ></input>
            </label>
          </fieldset>
          {isEditing
            ? <button className="profile__button profile__button_type_save" type="submit">Сохранить</button>
            : (
              <>
                <button className="profile__button" onClick={handleEditing} type="button">Редактировать</button>
                <button className="profile__button profile__button_type_out" type="button">Выйти из аккаунта</button>
              </>
            )}
        </form>
      </div>
    </>
  )
}

export default Profile;