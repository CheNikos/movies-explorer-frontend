import "./PageNotFound.css";
import { Link } from "react-router-dom"

export default function PageNotFound() {
  return <div className="error">
    <div className="error__container">
        <div className="error__description">
          <h1 className="error__title">404</h1>
          <p className="error__text">Страница не найдена</p>
        </div>
        <Link className="error__link" to={"/"}>
          Назад
        </Link>
      </div>
  </div>;
}