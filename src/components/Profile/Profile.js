import "./Profile.css";
import React from "react";
import Header from "../Header/Header";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import isEmail from "validator/es/lib/isEmail";
import {emailValidationErrorMessage, nameRegex, nameValidationErrorMessage} from "../../utils/constants";

function Profile() {
  const currentUser = React.useContext(CurrentUserContext);
  const [profileName, setProfileName] = React.useState(currentUser.name);
  const [profileEmail, setProfileEmail] = React.useState(currentUser.email);
  const [isEditing, setIsEditing] = React.useState(false);

  const {values,setValues, handleChange, errors, isValid} = useFormWithValidation({
    profileEmail: (value) => {
        if (!isEmail(value)) {
          return emailValidationErrorMessage;
        }
        return '';
      },
    profileName: (value) => {
        if (!(nameRegex.test(value))) {
          return nameValidationErrorMessage;
        }
        return '';
      }
    }
  );

  React.useEffect(() => {
    if (currentUser) {
      /*setProfileName(currentUser.name)
      setProfileEmail(currentUser.email)
      setValues({...values, [profileEmail]:profileEmail, [profileName]:profileName})*/
      console.log(profileEmail)
      console.log(profileName)
      console.log(values)
     /* setProfileName(currentUser.name);
      setProfileEmail(currentUser.email);*/
    }
  }, [currentUser]);

  function handleEditing() {
    return setIsEditing(true)
  }

  return (
    <>
      <Header isDark={false} loggedIn={true}/>
      <div className="profile">
        <form className="profile__form" id='profile-form' /* onSubmit={}*/>
          <fieldset className="profile__fieldset">
            <legend className="profile__title">Привет, {currentUser.name}!</legend>
            <label className="profile__label">Имя
              <input
                disabled ={!isEditing}
                type="text" value={currentUser.name||values.profileName || ''}
                className="profile__input"
                name="profileName" required minLength="2" maxLength="40"
                onChange={handleChange}
              />
              <span id="profileName-error" className="profile__error">{errors.registerPassword}</span>
            </label>
            <label className="profile__label">E-mail
              <input
                type="email" name="profileEmail" value={currentUser.email||values.profileEmail || ''}
                className="profile__input" required minLength="2" maxLength="40"
                disabled ={!isEditing}
                onChange={handleChange}
              ></input>
              <span id="profileEmail-error" className="profile__error">{errors.ccc}</span>
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

export default React.memo(Profile);