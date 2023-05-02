import "./Login.css";
import logo from "../../images/header-image/logo.svg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="signin">
      <div className="signin__header">
        <img className="signin__logo" src={logo} alt="Logo" />
        <h1 className="signin__title">Рады видеть!</h1>
      </div>
      <form className="signin__form">
        <div className="signin__input-content">
          <label className="signin__label" htmlFor="email">
            E-mail
          </label>
          <input
            className="signin__input"
            type="email"
            autoComplete="on"
            defaultValue="pochta@yandex.ru"
            required
          />
        </div>
        <div className="signin__input-content">
          <label className="signin__label" htmlFor="password">
            Пароль
          </label>
          <input className="signin__input" type="password" required />
        </div>
        <button className="signin__edit" type="submit">
          Войти
        </button>
      </form>
      <p className="signin__footer">
      Ещё не зарегистрированы? <Link to={"/signup"}><button className="signin__signup">Регистрация</button></Link>
      </p>
    </section>
  );
}
