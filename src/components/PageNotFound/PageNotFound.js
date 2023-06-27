import "./PageNotFound.css";
import { Link } from "react-router-dom";
import { MESSAGES } from "../../utils/constants";

export default function PageNotFound() {
  return (
    <div className="error">
      <div className="error__container">
        <div className="error__description">
          <h1 className="error__title">404</h1>
          <p className="error__text">{MESSAGES.PAGE_NOT_FOUND}</p>
        </div>
        <Link className="error__link" to={"/"}>
          Назад
        </Link>
      </div>
    </div>
  );
}
