import "./Profile.css";
import React, {useState} from "react";
import Header from "../Header/Header";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import isEmail from "validator/es/lib/isEmail";
import {
  editUserError,
  emailValidationErrorMessage,
  nameRegex,
  nameValidationErrorMessage,
  registerUserConflictError, serverError
} from "../../utils/constants";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import {editUserInfo} from "../../utils/MainApi";

function Profile({setCurrentUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isEditing, setIsEditing] = React.useState(false);
  const [formReady, setIsfFormReady] = React.useState(false);
  const [isApiFetching, setIsApiFetching] = React.useState(false);
  const [editErrorMessage, setEditErrorMessage] = useState('');


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
    if (isValid && !isApiFetching && (values.profileName !== currentUser.name || values.profileEmail !== currentUser.email)) {
      return setIsfFormReady(true);
    }
    return setIsfFormReady(false);
  }, [isValid, values, isApiFetching]);


  function handleEditButton() {
    return setIsEditing(true)
  }

  /*function handleEditSubmit(evt) {
    evt.preventDefault();
    setIsApiFetching(true);
    editUserInfo({name: values.profileName, email: values.profileEmail}).then((res) => {
      setIsEditing(false)
      return setCurrentUser(res)
    }).catch((err) => {
      console.log(err)
      return setEditErrorMessage(err.status)
    })/!*.finally(() => {
      return setIsApiFetching(false);
    });*!/
  }*/
  function handleEditSubmit(evt) {
    evt.preventDefault();
    setIsApiFetching(true);
    editUserInfo({name: values.profileName, email: values.profileEmail}).then((res) => {
      console.log('tditing result', res)
      setIsEditing(false)
      return setCurrentUser(res);
    }).catch((err) => {
      console.log('mistake of fetch edit', err)
      if (err.status === 409) {
        return setEditErrorMessage(registerUserConflictError)
      } else if (err.status === 500) {
        return setEditErrorMessage(serverError)
      }
      console.log('mistake of fetch edit', err)
     return setEditErrorMessage(editUserError)
    }).finally(() => {
      return setIsApiFetching(false);
    })
  }

  return (
    <>
      <Header isDark={false} loggedIn={true}/>
      <div className="profile">
        <form className="profile__form" id='profile-form' onSubmit={handleEditSubmit}>
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
            ?            (<>
            <p className="profile__fail-message">{editErrorMessage}</p>
            <button className="profile__button profile__button_type_save" type="submit"
                      disabled={!formReady}>Сохранить</button>
            </>)
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

export default Profile;