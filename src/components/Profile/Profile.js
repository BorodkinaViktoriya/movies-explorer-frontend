import "./Profile.css";
import React from "react";
import Header from "../Header/Header";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import isEmail from "validator/es/lib/isEmail";
import {emailValidationErrorMessage, nameRegex, nameValidationErrorMessage} from "../../utils/constants";

function Profile() {
  const currentUser = React.useContext(CurrentUserContext);
  const [profileName, setProfileName] = React.useState('');
  const [profileEmail, setProfileEmail] = React.useState(currentUser.email);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  function handleProfileNameChange(evt) {
    setProfileName(evt.target.value)
    if (!(nameRegex.test(evt.target.value))) {
      evt.target.setCustomValidity(nameValidationErrorMessage);
    } else {
      evt.target.setCustomValidity('');
    }
    setErrors({...errors, [evt.target.name]: evt.target.validationMessage})
  }

  function handleProfileEmailChange(evt) {
    setProfileEmail(evt.target.value)
    if (!isEmail(evt.target.value)) {
      evt.target.setCustomValidity(emailValidationErrorMessage);
    } else {
      evt.target.setCustomValidity('')
    }
    setErrors({...errors, [evt.target.name]: evt.target.validationMessage})
  }

  React.useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.name)
      setProfileEmail(currentUser.email)
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
                type="text" value={profileName || ''}
                className="profile__input"
                name="profileName" required minLength="2" maxLength="40"
                readOnly={!isEditing}
                onChange={handleProfileNameChange}
              />
              <span id="profileName-error" className="profile__error">{errors.profileName}</span>
            </label>
            <label className="profile__label">E-mail
              <input
                type="email" name="profileEmail" value={profileEmail || ''}
                className="profile__input" required minLength="2" maxLength="40"
                readOnly={!isEditing}
                onChange={handleProfileEmailChange}
              ></input>
              <span id="profileEmail-error" className="profile__error">{errors.profileEmail}</span>
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