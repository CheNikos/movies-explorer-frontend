import "./Login.css";
import logo from "../../images/header-image/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { isEmailValid } from "../../utils/constants";

export default function Login({ handleLogin }) {
  const [userData, setUserData] = useState({
    email: "pochta@yandex.ru",
    password: "",
  });
  const [isError, setIsError] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setIsError(false);

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    if (!(userData.password.length >= 3)) {
      setIsError(true);
      return;
    }
    if (!isEmailValid(userData.email)) {
      setIsError(true);
      return;
    }
    if (!isError) {
      handleLogin(userData);
    }
  }

  return (
    <section className="signin">
      <div className="signin__header">
        <Link to={"/"}>
          <img className="signin__logo" src={logo} alt="Logo" />
        </Link>
        <h1 className="signin__title">Рады видеть!</h1>
      </div>
      <div className="signin__form">
        <div className="signin__input-content">
          <label className="signin__label" htmlFor="email">
            E-mail
          </label>
          <input
            className="signin__input"
            type="email"
            onBlur={() => {
              if (!isEmailValid(userData.email)) {
                setIsError(true);
              }
            }}
            autoComplete="off"
            value={userData.email}
            name="email"
            required
            onChange={handleChange}
          />
        </div>
        <div className="signin__input-content">
          <label className="signin__label" htmlFor="password">
            Пароль
          </label>
          <input
            className="signin__input"
            type="password"
            autoComplete="on"
            name="password"
            value={userData.password}
            required
            onChange={handleChange}
          />
          {isError && (
            <span className={"errorField"}>Что-то пошло не так...</span>
          )}
        </div>

        <button className="signin__edit" onClick={handleSubmit}>
          Войти
        </button>
      </div>
      <p className="signin__footer">
        Ещё не зарегистрированы?{" "}
        <Link to={"/signup"}>
          <button className="signin__signup">Регистрация</button>
        </Link>
      </p>
    </section>
  );
}
