import "./App.css";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext.js";
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
    const [loggedIn, setLoggedIn] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [init, setInit] = useState(true);
    const [error, setError] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if ((token && loggedIn) && !init) {
            mainApi.getUserInfo(token)
                .then((data) => {
                    getMovies(token)
                    getCards(token)
                    setCurrentUser(data.data);
                }).catch((err) => {
                setError(err?.response?.data?.message)
            })
        }
    }, [loggedIn])

    useEffect(() => {
        const token = localStorage.getItem('jwt')
        if (token) {
            setLoading(true)
            mainApi.checkToken().then(() => {
                mainApi.getUserInfo()
                    .then((data) => {
                        getMovies(token)
                        getCards(token)
                        setCurrentUser(data.data);
                        setInit(false)
                        navigate(location.pathname)
                    })
            }).finally(() => {
                setLoading(false)
                setInit(false)
            });
        }
        if (!token) {
            setInit(false)
        }
        // eslint-disable-next-line
    }, []);


    function handleRegister({name, email, password}) {
        setLoading(true)
        return mainApi
            .register(name, email, password)
            .then((data) => {
                navigate("/signin");
            })
            .catch((err) => {
                setError(err?.response?.data?.message)
            }).finally(() => {
                setLoading(false)
            });
    }

    function getCards() {
        const token = localStorage.getItem('jwt')
        mainApi.getCards(token)
            .then((data) => {
                localStorage.setItem('savedMovies', JSON.stringify(data.data))
                setSavedMovies(data.data);
            })
            .catch((err) => {
                setError(err?.response?.data?.message)
            }).finally(() => {
            setLoading(false)
        });
    }

    function getMovies(jwt, to = location.pathname) {
        moviesApi.getMovies()
            .then((allMovies) => {
                setLoggedIn(true);
                localStorage.setItem('allCards', JSON.stringify(allMovies))
                setCards(allMovies)

                navigate(to);
            }).catch((err) => {
            setError(err?.response?.data?.message)
        })
    }

    function handleLogin({email, password}) {
        setLoading(true)
        return mainApi
            .login(email, password)
            .then((datas) => {
                if (datas.status === 200) {
                    console.log(datas.data.jwt)
                    localStorage.setItem("jwt", datas.data.jwt);
                    getMovies(datas.data.jwt, '/movies')
                    getCards(datas.data.jwt)
                    setLoggedIn(true)
                }
            })
            .catch((err) => {
                setError(err?.response?.data?.message)
            }).finally(() => {
                setLoading(false)
            });
    }

    function handleSingOut() {
        localStorage.clear()
        navigate('/signin')
    }

    function handleUpdateProfile({name, email}) {
        setLoading(true)
        mainApi
            .updateUserInfo(name, email)
            .then((newUserData) => {
                setCurrentUser(newUserData.data);
            })
            .catch((err) => {
                setError(err?.response?.data?.message)
            }).finally(() => {
            setLoading(false)
        });
    }

    function handleSaveMovie(card) {
        const token = localStorage.getItem('jwt')
        setLoading(true)
        mainApi
            .saveMovie(card, token)
            .then((data) => {
                debugger
                localStorage.setItem('savedMovies', JSON.stringify([data.data, ...savedMovies]))
                setSavedMovies([data.data, ...savedMovies]);
            })
            .catch((err) => {
                setError(err?.response?.data?.message)
            }).finally(() => {
            setLoading(false)
        });
    }

    function handleDeleteMovie(card) {
        setLoading(true)
        mainApi
            .deleteMovie(card._id)
            .then((res) => {
                debugger
                const oldMovies = JSON.parse(localStorage.getItem('savedMovies'))
                if(oldMovies) {
                    const savedMovies = oldMovies?.filter((item) => item._id !== card._id)
                    localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
                    setSavedMovies(savedMovies);
                }

            })
            .catch((err) => {
                setError(err?.response?.data?.message)
            }).finally(() => {
            setLoading(false)
        });
    }


    return (
        <>
            <div className="app">
                <CurrentUserContext.Provider value={currentUser}>
                    <Header loggedIn={loggedIn}/>
                    <Routes>
                        <Route path="/" element={<Main/>}/>
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
                                />
                            }
                        />
                        <Route
                            path="/signup"
                            element={<Register handleRegister={handleRegister}/>}
                        />
                        <Route path="/signin" element={<Login setError={setError} handleLogin={handleLogin}/>}/>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Routes>
                    <Footer/>
                </CurrentUserContext.Provider>
                {(loading || init) && <Preloader/>}

            </div>
            {error && <Modal onClose={() => setError(null)} error={error}/>}
        </>
    );
}

export default App;
