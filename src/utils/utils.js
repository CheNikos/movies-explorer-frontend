import { MAX_SHORT_MOVIE_DURATION } from "./constants";

export const sortedCardsShortFilms = (cards) => {
  return cards.filter((card) => card.duration <= MAX_SHORT_MOVIE_DURATION);
};
export const searchMovies = (searchText, cards) => {
  const searchEn = cards.filter((movie) =>
    movie.nameEN.toLowerCase().includes(searchText.toLowerCase())
  );

  const searchRu = cards.filter((movie) =>
    movie.nameRU.toLowerCase().includes(searchText.toLowerCase())
  );

  const joinArrays = searchRu.concat(searchEn);

  const uniqueArray = [...new Set(joinArrays.map((obj) => obj.id))].map(
    (id) => {
      return joinArrays.find((obj) => obj.id === id);
    }
  );

  return uniqueArray;
};
