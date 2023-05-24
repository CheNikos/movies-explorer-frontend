import { MOVIES_URL } from "./constants.js";

class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => this._getResponse(res));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_URL,
});

export default moviesApi;
