import './App.css';
import React, {useState, useEffect} from 'react';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Profile from "../Profile/Profile";
import Login from '../Login/Login';
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {authorize, getSavedMovies, getToken, getUserData} from "../../utils/MainApi";
import {authUserError, loginUserError, serverError} from "../../utils/constants";
import moviesApi from "../../utils/MoviesApi";


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const {pathname} = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    email: ""
  });
  const history = useHistory();

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    setIsLoading(true)
    if (loggedIn) {
      Promise.all([getUserData(), moviesApi.getInitialMovies(), getSavedMovies()]).then(([data, allMovies, userMovies]) => {
        setCurrentUser(data)
        localStorage.setItem('allmovies', JSON.stringify(allMovies));
        localStorage.setItem('savedUserMovies', JSON.stringify(userMovies));

        setInitialMovies(allMovies);
        setSavedMovies(userMovies)
      })
        .catch((err) => console.log('Ошибка при загрузке данных c сервера', err))
        .finally(() => setIsLoading(false))
    }
  }, [loggedIn])

  function handleLogin({password, email}) {
    setIsLoading(true)
    authorize({password, email})
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          getUserData().then((data) => {
            setCurrentUser(data);
            setFetchErrorMessage('')
            history.push('/movies')
          }).catch(() => {
            return setFetchErrorMessage(authUserError)
          })
        }
      })
      .catch((err) => {
        if (err.status === 403) {
          return setFetchErrorMessage(authUserError)
        }
        if (err.status === 500) {
          return setFetchErrorMessage(serverError)
        }
        return setFetchErrorMessage(loginUserError)
      }).finally(() => setIsLoading(false));
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setLoggedIn(false);
      return;
    }
    getToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push(pathname);
        }
      }).catch((err) => {
      console.log(err)
      localStorage.removeItem('jwt');
    });
    return;
  };

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            <Header isDark={true} loggedIn={loggedIn}/>
            <Main/>
            <Footer/>
          </Route>
          <ProtectedRoute
            isLoading={isLoading}
            exact path="/movies"
            component={Movies}
            initialMovies={initialMovies}
            isDark={false}
            loggedIn={loggedIn}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
          />
          <ProtectedRoute
            path="/saved-movies"
            isLoading={isLoading}
            component={SavedMovies}
            savedMovies={savedMovies}
            isDark={false}
            loggedIn={loggedIn}
            setSavedMovies={setSavedMovies}
          />
          <ProtectedRoute
            path="/profile"
            isLoading={isLoading}
            component={Profile}
            setCurrentUser={setCurrentUser}
            isDark={false}
            loggedIn={loggedIn}
            handleSignOut={handleSignOut}
          />
          <Route path="/signin">
            <Login
              checkToken={checkToken}
              fetchErrorMessage={fetchErrorMessage}
              loggedIn={loggedIn}
              handleLogin={handleLogin}
            />

          </Route>
          <Route path="/signup">
            <Register
              checkToken={checkToken}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setCurrentUser={setCurrentUser}
              handleLogin={handleLogin}
              fetchErrorMessage={fetchErrorMessage}
              setFetchErrorMessage={setFetchErrorMessage}
            />
          </Route>
          <Route path="*">
            <PageNotFound/>
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;
