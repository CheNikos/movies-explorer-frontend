import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import {useState} from "react";
import {searchMovies, sortedCardsShortFilms} from "../../utils/utils";


export default function Movies({savedMovies, onSaveMovie, onDeleteMovie, cards}) {
    const [checkBox, setCheckBox] = useState(false)
    const [search, setSearch] = useState('')

    const [currentCards, setCurrentCards] = useState(JSON.parse(localStorage.getItem('allCards')) ?? cards)

    const onSendEligibleFilm = () => {
        const allCards = JSON.parse(localStorage.getItem('allCards'))
        if (search) {
            const checkShortFilms = checkBox ? sortedCardsShortFilms(allCards) : allCards
            setCurrentCards(searchMovies(search?.trim(), checkShortFilms))
        } else {
            setCurrentCards(allCards)
        }
    }

    const onClickCheckBoxHandler = (value) => {
        const allCards = JSON.parse(localStorage.getItem('allCards'))
        setCheckBox(value)
        if (value) {
            setCurrentCards(allCards.filter(card => card.duration <= 40))
        } else {
            setCurrentCards(allCards)
        }
    }
    return (
        <main className="movies">
            <SearchForm valueCheckBox={checkBox} onClickCheckBox={onClickCheckBoxHandler} onClick={onSendEligibleFilm}
                        value={search} setValue={setSearch}/>
            <MoviesCardList
                cards={currentCards}
                isSavedMovies={false}
                savedMovies={savedMovies}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
            />
        </main>
    );
}
