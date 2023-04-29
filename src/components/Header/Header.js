import "./Header.css";
import logo from "../../images/header-image/logo.svg";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/signup" || location.pathname === "/signin" ? (
        <></>
      ) : (
        <header
          className={`header header_theme_${
            location.pathname === "/" ? "main" : "grey"
          }`}
        >
          <img className="header__logo" src={logo} alt="Logo" />
          {location.pathname === "/" ? (
            <div className="header__navigate">
              <p className="header__registration">Регистрация</p>
              <div className="header__signin">
                <p className="header__signin-text">Войти</p>
              </div>
            </div>
          ) : (
            <>
              <div className="header__navigation-bar">
                <button className="header__film">Фильмы</button>
                <button className="header__saved-films">
                  Сохранённые фильмы
                </button>
              </div>
              <div className="header__navigate">
                <button className="header__account">Аккаунт</button>
              </div>
            </>
          )}
        </header>
      )}
    </>
  );
}
