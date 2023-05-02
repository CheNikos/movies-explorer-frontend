import "./Header.css";
// import logo from "../../images/header-image/logo.svg";
import { useLocation, Link } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/signup" ||
      location.pathname === "/signin" ||
      location.pathname === "*" ? (
        <></>
      ) : (
        <header
          className={`header header_theme_${
            location.pathname === "/" ? "main" : "grey"
          }`}
        >
          <Link to={"/"} className="header__logo"></Link>
          {location.pathname === "/" ? (
            <div className="header__navigate">
              <Link to={"/signup"} className="header__registration">
                Регистрация
              </Link>
              <Link to={"/signin"} className="header__signin">
                <p className="header__signin-text">Войти</p>
              </Link>
            </div>
          ) : (
            <>
              <div className="header__navigation-bar">
                <Link to={"/movies"}>
                  <button
                    className={`header__film header__film_${
                      location.pathname === "/movies" ? "active" : ""
                    }`}
                  >
                    Фильмы
                  </button>
                </Link>
                <Link to={"/saved-movies"}>
                  <button className={`header__saved-films header__saved-films_${
                      location.pathname === "/saved-movies" ? "active" : ""
                    }`}>
                    Сохранённые фильмы
                  </button>
                </Link>
              </div>
              <Link to={"/profile"} className="header__navigate">
                <button className="header__account">Аккаунт</button>
              </Link>
            </>
          )}
        </header>
      )}
    </>
  );
}
