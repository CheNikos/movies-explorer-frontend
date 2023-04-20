import "./MoviesCard.css";
import image from "../../../images/card-image/praga-9.jpg"

export default function MoviesCard() {
  return (
    <div className="movies-card">
        <img src={image} alt="Прага" className="movies-card__image" />
        <div className="movies-card__description">
            <p className="movies-card__name">33 слова о дизайне</p>
            <button className="movies-card__like"></button>
        </div>
        <div className="movies-card__line"></div>
        <p className="movies-card__time">1ч42м</p>
    </div>
  );
}