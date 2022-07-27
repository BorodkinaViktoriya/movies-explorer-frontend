import "./Profile.css";
import React from "react";

function Profile({name, email}) {
  return (
    <div className="profile">
      <form className="profile__form" id='profile-form' /* onSubmit={}*/>
        <fieldset className="profile__fieldset">
          <legend className="profile__title">Привет, {name}!</legend>
          <label className="profile__label">Имя
            <input
              type="name" value={name}
              className="profile__input"
              name="loginEmail" required minLength="2" maxLength="40"
            />
          </label>
          <label className="profile__label">E-mail
            <input
              type="email" value={email}
              className="profile__input" required minLength="2" maxLength="40"
            ></input>
          </label>
        </fieldset>
        <button className="profile__button" type="submit">Редактировать</button>
        <button className="profile__button profile__button_type_out">Выйти из аккаунта</button>
      </form>
    </div>
  )
}

export default Profile;