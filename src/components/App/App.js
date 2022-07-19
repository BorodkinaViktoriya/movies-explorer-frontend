import './App.css';
import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main'
/*
function handleRegister(password, email) {
  register(password, email)
    .then((res) => {
      if (res) {
        setMessage(true);
        history.push('/sign-in');
      }
    })
    .catch(() => setMessage(false))
    .finally(() => setIsInfoTooltipOpen(true))
}

function handleLogin(password, email) {
  authorize(password, email)
    .then((res) => {
      if (res) {
        setLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        setAuthorisationEmail(email);
        history.push('/')
      }
    })
    .catch(() => {
      setMessage(false);
      setIsInfoTooltipOpen(true);
    });
}*/

function App() {
  return (
    <div className="App">
      {/*<Switch>
      <Route exact path="/">*/}
        <Header isDark={true} />
        <Main />
      <Header isDark={false} />

        {/*<Footer />*/}
      {/*</Route>
        <Route path="/sign-in">
          <Login name='login'/>
        </Route>*/}
       {/* <Route path="/sign-up">
          <Register onRegister={handleRegister}/>
        </Route>
        <Route>
          {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
        </Route>*/}

     {/* </Switch>*/}
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
