import "./Footer.css";

export default function Footer() {
  let today = new Date();
  let year = today.getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__line"></div>
      <div className="footer__stroke">
        <p className="footer__date">&copy;{year}</p>
        <p className="footer__link">Яндекс.Практикум</p>
        <p className="footer__link-git">Github</p>
      </div>
    </footer>
  );
}
