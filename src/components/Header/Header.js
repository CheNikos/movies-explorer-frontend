import "./Header.css";
import { useLocation, Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Header({ loggedIn }) {
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
          {loggedIn ? (
            <Navigation />
          ) : (
            <div className="header__navigation">
              <Link to={"/signup"} className="header__registration">
                Регистрация
              </Link>
              <Link to={"/signin"} className="header__signin">
                <p className="header__signin-text">Войти</p>
              </Link>
            </div>
          )}
        </header>
      )}
    </>
  );
}
