import { BASE_URL } from "./constants.js";
import axios from "axios";
export const instance = axios.create({
  baseURL: BASE_URL, // Базовый URL для всех запросов
  timeout: 5000, // Таймаут запроса (в миллисекундах)
  headers: {
    "Content-Type": "application/json",
  },
});
class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getResponse = (res) => {
    return res.ok ? res.json() : res;
  };

  register = (name, email, password) => {
    return instance.post(`/signup`, JSON.stringify({ name, email, password }));
  };

  login = (email, password) => {
    return instance.post(`/signin`, JSON.stringify({ email, password }));
  };

  checkToken = () => {
    return instance.get(`/users/me`);
  };

  getUserInfo(token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return instance.get("/users/me");
  }

  updateUserInfo(name, email) {
    return instance.patch("/users/me", JSON.stringify({ name, email }));
  }

  getCards(jwt) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
    return instance.get(`/movies`);
  }

  saveMovie(data) {
    return instance.post(
      `/movies`,
      JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        movieId: data.id,
        image: "https://api.nomoreparties.co" + data.image.url,
        trailerLink: data.trailerLink,
        thumbnail:
          "https://api.nomoreparties.co" + data.image.formats.thumbnail.url,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      })
    );
  }

  deleteMovie(cardId) {
    return instance.delete(`/movies/${cardId}`);
  }
}

const mainApi = new Api({
  baseUrl: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

export default mainApi;
