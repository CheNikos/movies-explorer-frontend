import {MOVIES_URL} from "./constants.js";

class MoviesApi {
    getMovies(token) {
        return fetch(`${MOVIES_URL}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},

        }).then((res) => {
            return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_URL,
});

export default moviesApi;
