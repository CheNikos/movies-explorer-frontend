import { MOVIES_URL } from "./constants.js";
import {instance} from "./MainApi";

class MoviesApi {
  _getResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  getMovies(token) {
    return instance.get(`${MOVIES_URL}` )
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_URL,
});

export default moviesApi;
