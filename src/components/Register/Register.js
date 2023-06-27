import "./Register.css";
import logo from "../../images/header-image/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { isEmailValid } from "../../utils/constants";

export default function Register({ handleRegister }) {
  const [userData, setUserData] = useState({
    email: "pochta@yandex.ru",
    password: "",
    name: "Николай",
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
    if (!userData.name.trim()) {
      setIsError(true);
      return;
    }

    if (userData.password && userData.email && userData.name) {
      handleRegister(userData);
    }
  }

  return (
    <section className="signup">
      <div className="signup__header">
        <Link to={"/"}>
          <img className="signup__logo" src={logo} alt="Logo" />
        </Link>
        <h1 className="signup__title">Добро пожаловать!</h1>
      </div>
      <div className="signup__form">
        <div className="signup__input-content">
          <label className="signup__label" htmlFor="name">
            Имя
          </label>
          <input
            className="signup__input"
            type="text"
            minLength="2"
            maxLength="30"
            autoComplete="on"
            name="name"
            value={userData.name}
            required
            onChange={handleChange}
          />
        </div>
        <div className="signup__input-content">
          <label className="signup__label" htmlFor="email">
            E-mail
          </label>
          <input
            className="signup__input"
            type="email"
            name="email"
            value={userData.email}
            onBlur={() => {
              if (!isEmailValid(userData.email)) {
                setIsError(true);
              }
            }}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div className="signup__input-content">
          <label className="signup__label" htmlFor="password">
            Пароль
          </label>
          <input
            className="signup__input"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        {isError && (
          <span className={"errorField"}>Что-то пошло не так...</span>
        )}
        <button className="signup__edit" onClick={handleSubmit}>
          Зарегистрироваться
        </button>
      </div>
      <p className="signup__footer">
        Уже зарегистрированы?{" "}
        <Link to={"/signin"}>
          <button className="signup__signin">Войти</button>
        </Link>
      </p>
    </section>
  );
}
