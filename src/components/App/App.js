import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Main from "../Main/Main";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../Saved-movies/Saved-movies.js";
import Profile from "../Profile/Profile.js";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute";
import moviesApi from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import Modal from "../Modal/Modal";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const token = localStorage.getItem("jwt");
  const [loggedIn, setLoggedIn] = useState(token !== null);
  const [savedMovies, setSavedMovies] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [profileMessage, setProfileMessage] = useState("");
  const [profileMessageStatus, setProfileMessageStatus] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Перенаправляем пользователя
  useEffect(() => {
    if (token && !error) {
      setLoggedIn(true);
      if (location.pathname === "/signup" || location.pathname === "/signin") {
        navigate("/movies");
      } else {
        navigate(location.pathname);
      }
    }
  }, [token, loggedIn, navigate, location.pathname, error]);

  // Устанавливаем пользователя
  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUserInfo(token)
        .then((data) => {
          setCurrentUser(data.data);
        })
        .catch((err) => {
          setError(err?.response?.data?.message);
          setLoggedIn(false);
          navigate("/signin");
        })
        .finally(() => {});
    }
  }, [token, loggedIn, navigate]);

  // Получаем фильмы
  useEffect(() => {
    if (loggedIn) {
      getMovies(token);
      getCards(token);
    }
    // eslint-disable-next-line
  }, [loggedIn]);

  function handleRegister({ name, email, password }) {
    setLoading(true);
    return mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getCards() {
    setLoading(true);
    mainApi
      .getCards(token)
      .then((data) => {
        localStorage.setItem("savedMovies", JSON.stringify(data.data));
        setSavedMovies(data.data);
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getMovies() {
    setLoading(true);
    moviesApi
      .getMovies()
      .then((allMovies) => {
        localStorage.setItem("allCards", JSON.stringify(allMovies));
        setCards(allMovies);
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleLogin({ email, password }) {
    setLoading(true);
    mainApi
      .login(email, password)
      .then((datas) => {
        if (datas.status === 200) {
          localStorage.setItem("jwt", datas.data.jwt);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleSingOut() {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/");
    setCurrentUser({});
  }

  function handleUpdateProfile({ name, email }) {
    setLoading(true);
    mainApi
      .updateUserInfo(name, email)
      .then((newUserData) => {
        setCurrentUser(newUserData.data);
        showProfileMessage("Данные успешно сохранены", "success");
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
        showProfileMessage(err?.response?.data?.message, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleSaveMovie(card) {
    setLoading(true);
    mainApi
      .saveMovie(card, token)
      .then((data) => {
        localStorage.setItem(
          "savedMovies",
          JSON.stringify([data.data, ...savedMovies])
        );
        setSavedMovies([data.data, ...savedMovies]);
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleDeleteMovie(card) {
    setLoading(true);
    mainApi
      .deleteMovie(card._id)
      .then((res) => {
        const oldMovies = JSON.parse(localStorage.getItem("savedMovies"));
        if (oldMovies) {
          const savedMovies = oldMovies?.filter(
            (item) => item._id !== card._id
          );
          localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
          setSavedMovies(savedMovies);
        }
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function showProfileMessage(message, status) {
    setProfileMessage(message);
    setProfileMessageStatus(status);
  }

  return (
    <>
      <div className="app">
        <CurrentUserContext.Provider value={currentUser}>
          <Header loggedIn={loggedIn} />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  cards={cards}
                  loggedIn={loggedIn}
                  component={Movies}
                  onSaveMovie={handleSaveMovie}
                  onDeleteMovie={handleDeleteMovie}
                  savedMovies={savedMovies}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={SavedMovies}
                  onSaveMovie={handleSaveMovie}
                  savedMovies={savedMovies}
                  onDeleteMovie={handleDeleteMovie}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  handleSingOut={handleSingOut}
                  component={Profile}
                  onSubmit={handleUpdateProfile}
                  message={profileMessage}
                  messageStatus={profileMessageStatus}
                  loading={loading}
                />
              }
            />
            <Route
              path="/signup"
              element={<Register handleRegister={handleRegister} />}
            />
            <Route
              path="/signin"
              element={<Login setError={setError} handleLogin={handleLogin} />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </CurrentUserContext.Provider>
        {loading && <Preloader />}
      </div>
      {error && <Modal onClose={() => setError(null)} error={error} />}
    </>
  );
}

export default App;
