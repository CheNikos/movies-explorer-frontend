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
    <div className="navigation">
      <div className="navigation__navigation-bar">
        <ul className="navigation__list">
          <li>
            <Link to={"/movies"}>
              {location.pathname === "/" ? (
                <button className="navigation__film navigation__film_main">
                  Фильмы
                </button>
              ) : (
                <button
                  className={`navigation__film navigation__film_${
                    location.pathname === "/movies" ? "active" : ""
                  }`}
                >
                  Фильмы
                </button>
              )}
            </Link>
          </li>
          <li>
            <Link to={"/saved-movies"}>
              {location.pathname === "/" ? (
                <button className="navigation__saved-films navigation__saved-films_main">
                  Сохранённые фильмы
                </button>
              ) : (
                <button
                  className={`navigation__saved-films navigation__saved-films_${
                    location.pathname === "/saved-movies" ? "active" : ""
                  }`}
                >
                  Сохранённые фильмы
                </button>
              )}
            </Link>
          </li>
        </ul>
        <Link to={"/profile"} className="navigation__navigate">
          <button className="navigation__account">Аккаунт</button>
        </Link>
      </div>
      <div className="navigation__burger" onClick={handleClick}>
        <BurgerMenu burger={isMenuOpen} />
      </div>
    </div>
  );
}
