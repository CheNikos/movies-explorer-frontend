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

  updateUserInfo = (name, email) => {
    const token = localStorage.getItem("jwt");
    return fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, name }),
    }).then(this._getResponse);
  };
}

const mainApi = new Api({
  baseUrl: BASE_URL,
});

export default mainApi;
