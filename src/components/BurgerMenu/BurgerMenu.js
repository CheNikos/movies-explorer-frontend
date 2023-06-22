import "./BurgerMenu.css";
import { useLocation, Link } from "react-router-dom";

export default function BurgerMenu({burger}) {
  const location = useLocation();

  return (
    <div className={`burger ${burger ? "burger_opened" : ""}`}>
      <div className="burger__overlay"></div>
      <div className="burger__container">
        <button className="burger__close"></button>
        <ul className="burger__content">
          <li className="burger__link">
            <Link to={"/"} className="burger__list">
              Главная
            </Link>
          </li>
          <li
            className={`burger__link burger__link_${
              location.pathname === "/movies" ? "active" : ""
            }`}
          >
            <Link to={"/movies"} className="burger__list">
              Фильмы
            </Link>
          </li>
          <li
            className={`burger__link burger__link_${
              location.pathname === "/saved-movies" ? "active" : ""
            }`}
          >
            <Link to={"/saved-movies"} className="burger__list">
              Сохранённые фильмы
            </Link>
          </li>
          <li className={`burger__account burger__account_${
              location.pathname === "/profile" ? "active" : ""
            }`}>
            <Link to={"/profile"} className="burger__list">
              Аккаунт
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
