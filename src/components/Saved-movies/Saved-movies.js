import "../Saved-movies/Saved-movies.css";
import "../Movies/Movies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import {useEffect, useState} from "react";

export const sortedCardsShortFilms = (cards) => {
    return cards.filter(card => card.duration <= 40)
}
export const searchMovies = (searchText, cards) => {
    const searchEn = cards.filter(movie => movie.nameEN.toLowerCase().includes(searchText.toLowerCase()) )
    const searchRu = cards.filter(movie => movie.nameRU.toLowerCase().includes(searchText.toLowerCase()) )
    const joinArrays = searchRu.concat(searchEn)
    const uniqueArray = [...new Set(joinArrays.map(obj => obj._id))].map(id => {
        return joinArrays.find(obj => obj._id === id);
    });
    return uniqueArray
}
export default function SavedMovies({ savedMovies, onDeleteMovie}) {
    const [search, setSearch] = useState('')
    const [checkBox, setCheckBox] = useState(false)

    const [currentCards, setCurrentCards] = useState([])
    useEffect(() => {
        if(checkBox) {
            setCurrentCards(sortedCardsShortFilms(savedMovies))
        } else {
            setCurrentCards(savedMovies)
        }
        // eslint-disable-next-line
    }, [savedMovies])

    const onSendEligibleFilm = () => {
        const checkShortFilms = checkBox ? sortedCardsShortFilms(savedMovies) : savedMovies
        if(search) {
            setCurrentCards(searchMovies(search?.trim(), checkShortFilms))
        } else {
            setCurrentCards(checkShortFilms)
        }


    }
    const onClickCheckBoxHandler = (value) => {
        setCheckBox(value)
        if (value){
            setCurrentCards(sortedCardsShortFilms(savedMovies))
        } else {
            setCurrentCards(savedMovies)
        }
    }
    return (
        <main className="movies saved-movies">
            <SearchForm onClickCheckBox={onClickCheckBoxHandler} valueCheckBox={checkBox} onClick={onSendEligibleFilm}
                        value={search} setValue={setSearch}/>
            <MoviesCardList
                cards={currentCards}
                isSavedMovies={true}
                savedMovies={savedMovies}
                onDeleteMovie={onDeleteMovie}
            />
        </main>
    );
}
