import "./Profile.css";
import React from "react";
import Header from "../Header/Header";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import isEmail from "validator/es/lib/isEmail";
import {emailValidationErrorMessage, nameRegex, nameValidationErrorMessage} from "../../utils/constants";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import {editUserInfo} from "../../utils/MainApi";

function Profile() {
  const currentUser = React.useContext(CurrentUserContext);
  const [isEditing, setIsEditing] = React.useState(false);
  const [formReady, setIsfFormReady] = React.useState(false);

  const {values, setValues, handleChange, errors, isValid} = useFormWithValidation({
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
      setValues({...values, profileName: currentUser.name, profileEmail: currentUser.email})
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (isValid & (values.profileName !== currentUser.name || values.profileEmail !== currentUser.email)) {

      console.log('форма валтдна', isValid)
      console.log('Имя изменилось', values.profileName !== currentUser.name)
      console.log(values.profileName)
      console.log(values.profileName)
      console.log('почта изменилось', values.profileEmail !== currentUser.email)
      console.log('второе условие изменилось', (values.profileName !== currentUser.name || values.profileEmail !== currentUser.email))
      return setIsfFormReady(true);
    }
    console.log('форма валтдна', isValid)
    console.log('Имя изменилось', values.profileName !== currentUser.name)
    console.log(values.profileName)
    console.log(values.profileName)
    console.log('почта изменилось', values.profileEmail !== currentUser.email)
    return setIsfFormReady(false);
  }, [isValid, values]);


  function handleEditButton() {
    return setIsEditing(true)
  }

  function handleEditing() {
    editUserInfo({name: values.profileName, email: values.profileEmail}).then(() => {
      setIsEditing(false)
    }).catch((err) => {
      /*openPopup(`Что-то пошло не так! ${err}`);*/
    });
  }

  return (
    <>
      <Header isDark={false} loggedIn={true}/>
      <div className="profile">
        <form className="profile__form" id='form' /* onSubmit={}*/>
          <fieldset className="profile__fieldset">
            <legend className="profile__title">Привет, {currentUser.name}!</legend>
            <label className="profile__label">Имя
              <input
                type="text" value={values.profileName || ''}
                className="profile__input"
                name="profileName" required minLength="2" maxLength="40"
                readOnly={!isEditing}
                onChange={handleChange}
              />
              <span id="profileName-error" className="profile__error">{errors.profileName}</span>
            </label>
            <label className="profile__label">E-mail
              <input
                type="email" name="profileEmail" value={values.profileEmail || ''}
                className="profile__input" required minLength="2" maxLength="40"
                readOnly={!isEditing}
                onChange={handleChange}
              ></input>
              <span id="profileEmail-error" className="profile__error">{errors.profileEmail}</span>
            </label>
          </fieldset>
          {isEditing
            ? <button className="profile__button profile__button_type_save" type="submit"
                      disabled={!formReady}>Сохранить</button>
            : (
              <>
                <button className="profile__button" onClick={handleEditButton} type="button">Редактировать</button>
                <button className="profile__button profile__button_type_out" type="button">Выйти из аккаунта</button>
              </>
            )}
        </form>
      </div>
    </>
  )
}

export default React.memo(Profile);