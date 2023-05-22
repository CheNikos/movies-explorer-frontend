import "./Login.css";
import logo from "../../images/header-image/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login({ handleLogin }) {
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

    if (!userData.email || !userData.password) {
      return;
    }
    handleLogin(userData)
      .then(() => {
        setUserData({ email: "", password: "" });
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className="signin">
      <div className="signin__header">
        <img className="signin__logo" src={logo} alt="Logo" />
        <h1 className="signin__title">Рады видеть!</h1>
      </div>
      <form className="signin__form" onSubmit={handleSubmit}>
        <div className="signin__input-content">
          <label className="signin__label" htmlFor="email">
            E-mail
          </label>
          <input
            className="signin__input"
            type="email"
            autoComplete="on"
            name="email"
            defaultValue="pochta@yandex.ru"
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
            name="password"
            required
            onChange={handleChange}
          />
        </div>
        <button className="signin__edit" type="submit">
          Войти
        </button>
      </form>
      <p className="signin__footer">
        Ещё не зарегистрированы?{" "}
        <Link to={"/signup"}>
          <button className="signin__signup">Регистрация</button>
        </Link>
      </p>
    </section>
  );
}
