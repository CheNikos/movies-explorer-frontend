import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ cards }) {
  return (
    <div className="movies-cards">
        {cards.map((cardsItem) => (
        <MoviesCard
          card={cardsItem}
          key={cardsItem.id}
          nameRU={cardsItem.nameRU}
          duration={cardsItem.duration}
          image={cardsItem.image.url}
        />
      ))}
    </div>
  );
}