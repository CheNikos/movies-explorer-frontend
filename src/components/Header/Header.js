import "./Header.css";
import { useLocation, Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

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
          <Navigation />
        </header>
      )}
    </>
  );
}
