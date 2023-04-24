import { useLocation } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  let today = new Date();
  let year = today.getFullYear();
  const location = useLocation();

  return (
    <footer className="footer">
      {location.pathname === "/" ||
      location.pathname === "/movies" ||
      location.pathname === "/saved-movies" ? (
        <>
          <p className="footer__text">
            Учебный проект Яндекс.Практикум x BeatFilm.
          </p>
          <div className="footer__line"></div>
          <div className="footer__stroke">
            <p className="footer__date">&copy;{year}</p>
            <p className="footer__link">Яндекс.Практикум</p>
            <p className="footer__link-git">Github</p>
          </div>
        </>
      ) : (
        <></>
      )}
    </footer>
  );
}
