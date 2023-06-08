import { BASE_URL } from "./constants.js";

class Api {
  _getResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then(this._getResponse);
  };

  login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(this._getResponse)
      .then((data) => {
        localStorage.setItem("jwt", data.jwt);
        return data;
      });
  };

  checkToken = () => {
    const token = localStorage.getItem("jwt");
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponse);
  };

  getUserInfo() {
    const token = localStorage.getItem("jwt");
    return fetch(`${BASE_URL}/users/me`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._getResponse(res);
    });
  }

  updateUserInfo(name, email) {
    const token = localStorage.getItem("jwt");
    return fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    }).then((res) => this._getResponse(res));
  }

  getCards() {
    const token = localStorage.getItem("jwt");
    return fetch(`${BASE_URL}/movies`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._getResponse(res));
  };

  saveMovie(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${BASE_URL}/movies`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        movieId: data.id,
        image: 'https://api.nomoreparties.co' + data.image.url,
        trailerLink: data.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + data.image.formats.thumbnail.url,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then((res) => this._getResponse(res));
  }

  deleteMovie(cardId) {
    const token = localStorage.getItem("jwt");
    return fetch(`${BASE_URL}/movies/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._getResponse(res));
  }
}

const mainApi = new Api({
  baseUrl: BASE_URL,
});

export default mainApi;
