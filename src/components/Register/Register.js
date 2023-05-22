import "./Register.css";
import logo from "../../images/header-image/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register({ handleRegister }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (userData.password) {
      handleRegister(userData).catch((err) => console.log(err));
    }
  }

  return (
    <section className="signup">
      <div className="signup__header">
        <img className="signup__logo" src={logo} alt="Logo" />
        <h1 className="signup__title">Добро пожаловать!</h1>
      </div>
      <form className="signup__form" onSubmit={handleSubmit}>
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
            defaultValue="Николай"
            name="name"
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
            autoComplete="on"
            defaultValue="pochta@yandex.ru"
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
            onChange={handleChange}
            required
          />
        </div>
        <button className="signup__edit" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="signup__footer">
        Уже зарегистрированы?{" "}
        <Link to={"/signin"}>
          <button className="signup__signin">Войти</button>
        </Link>
      </p>
    </section>
  );
}
