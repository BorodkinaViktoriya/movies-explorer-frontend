import './App.css';
import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Header from './Header.js';

import Main from '../Main/Main'

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/">
        <Main />
        <Footer />
      </Route>
      </Switch>
        {/*<Header
          authorisationEmail={authorisationEmail}
          onSignOut={handleSignOut}/>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cardList={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-in">
            <Login onLogin={handleLogin} name='login'/>
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegister}/>
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
          </Route>*/}
    </div>
  );
}

export default App;
