export const sortedCardsShortFilms = (cards) => {
  return cards.filter((card) => card.duration <= 40);
};
export const searchMovies = (searchText, cards) => {
  const searchEn = cards.filter((movie) =>
    movie.nameEN.toLowerCase().includes(searchText.toLowerCase())
  );
  const searchRu = cards.filter((movie) =>
    movie.nameRU.toLowerCase().includes(searchText.toLowerCase())
  );
  const joinArrays = searchRu.concat(searchEn);
  const uniqueArray = [...new Set(joinArrays.map((obj) => obj._id))].map(
    (id) => {
      return joinArrays.find((obj) => obj._id === id);
    }
  );
  return uniqueArray;
};
