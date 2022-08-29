import './App.css';
import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect, useHistory, useLocation} from 'react-router-dom';
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
import {authorize, getToken, getUserData} from "../../utils/MainApi";
import savedMovies from '../../utils/saved-movies'
import {authUserError, loginUserError, serverError} from "../../utils/constants";
import moviesApi from "../../utils/MoviesApi";


function App() {
  const history = useHistory();
  const {pathname} = useLocation();
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [initialMovies, setInitialMovies] = useState([]);
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    email: ""
  });


  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([getUserData(), moviesApi.getInitialMovies()]).then(([data, movies]) => {
        setCurrentUser(data)
        localStorage.setItem('movies', movies);
        setInitialMovies(movies)
        console.log(movies)
      })
        .catch((err) => console.log('Ошибка при звгрузке данных c сервера', err))
    }
  }, [loggedIn])

  function handleLogin({password, email}) {
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
      });
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    console.log(jwt)
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

  /*useEffect(() => {
    const storageMovies = JSON.parse(localStorage.getItem('movies'));
    if (storageMovies) {
      setInitialMovies(JSON.parse(storageMovies));
    } else {

    }
  })*/

  /* useEffect(() => {
     const storagedMovies = JSON.parse(localStorage.getItem('movies'));
     if (storagedMovies) {
       setInitialMovies(storagedMovies);
     }
     mainApi
       .getUserInfo()
       .then(({ _id, name, email }) => {
         setUserState({ ...userState, _id, name, email, loggedIn: true });
       })
       .catch((err) => {
         setUserState({ ...userState, loggedIn: false });
         console.log(err);
         localStorage.clear();
       })
       .finally(() => setRequest(false));
   }, []);

   function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }
   */

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
            exact path="/movies"
            component={Movies}
            initialMovies={initialMovies}
            isDark={false}
            loggedIn={loggedIn}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            cards={savedMovies}
            isDark={false}
            loggedIn={loggedIn}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            setCurrentUser={setCurrentUser}
            isDark={false}
            loggedIn={loggedIn}
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
  );
}

export default App;
