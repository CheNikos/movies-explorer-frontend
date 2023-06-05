import "./MoviesCard.css";

import { useLocation } from "react-router-dom";

export default function MoviesCard({ card, nameRU, duration }) {
  const location = useLocation();

  return (
    <ul className="movies-card">
      <li className="movies-card__list">
        <img src={`https://api.nomoreparties.co/${card.image.url}`} alt={nameRU} className="movies-card__image" />
        <div className="movies-card__description">
          <p className="movies-card__name">{nameRU}</p>
          {location.pathname === "/movies" && (
            <button className="movies-card__like"></button>
          )}
          {location.pathname === "/saved-movies" && (
            <button className="movies-card__like-delete"></button>
          )}
        </div>
        <div className="movies-card__line"></div>
        <p className="movies-card__time">{duration} минут(ы)</p>
      </li>
    </ul>
  );
}
