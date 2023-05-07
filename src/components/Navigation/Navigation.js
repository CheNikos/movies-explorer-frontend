import "./Navigation.css";
import { useLocation, Link } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useState } from "react";

export default function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  function handleClick() {
    setMenuOpen(!isMenuOpen);
  }

  return (
    <>
      {location.pathname === "/" ? (
        <div className="navigation__content">
          <Link to={"/signup"} className="navigation__registration">
            Регистрация
          </Link>
          <Link to={"/signin"} className="navigation__signin">
            <p className="navigation__signin-text">Войти</p>
          </Link>
        </div>
      ) : (
        <>
          <div className="navigation__navigation-bar">
            <Link to={"/movies"}>
              <button
                className={`navigation__film navigation__film_${
                  location.pathname === "/movies" ? "active" : ""
                }`}
              >
                Фильмы
              </button>
            </Link>
            <Link to={"/saved-movies"}>
              <button
                className={`navigation__saved-films navigation__saved-films_${
                  location.pathname === "/saved-movies" ? "active" : ""
                }`}
              >
                Сохранённые фильмы
              </button>
            </Link>
            <Link to={"/profile"} className="navigation__navigate">
              <button className="navigation__account">Аккаунт</button>
            </Link>
          </div>
          <div className="navigation__burger" onClick={handleClick}>
            <BurgerMenu burger={isMenuOpen}/>
          </div>
        </>
      )}
    </>
  );
}
