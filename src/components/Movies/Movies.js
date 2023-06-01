import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

export default function Movies({ cards }) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList cards={cards}/>
    </main>
  );
}
