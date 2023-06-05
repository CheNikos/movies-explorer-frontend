import { Link } from "react-router-dom";
import { useContext, useState, useCallback, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormValidation from "../../hooks/useForm";
import {PATTERN_EMAIL, PATTERN_USERNAME} from '../../utils/constants';
import "./Profile.css";

export default function Profile({ handleSingOut, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { values, setValues, handleInputChange, isValid } = useFormValidation();

  const checkStatusSubmit = useCallback(() => {
    return (
      !isValid ||
      (values.name === currentUser.name) & (values.email === currentUser.email)
    );
  }, [isValid, values, currentUser]);

  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
  }, [setValues, currentUser]);

  useEffect(() => {
    setIsButtonDisabled(checkStatusSubmit());
  }, [checkStatusSubmit]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsButtonDisabled(true);
    onSubmit(values);
    checkStatusSubmit();
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, {`${currentUser.name}`}!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__input-content">
            <label className="profile__label" htmlFor="name">
              Имя
            </label>
            <input
              value={values.name || ""}
              className="profile__input"
              name="name"
              id="name"
              type="text"
              pattern={PATTERN_USERNAME}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="profile__line"></div>
          <div className="profile__input-content">
            <label className="profile__label" htmlFor="email">
              E-mail
            </label>
            <input
              value={values.email || ""}
              className="profile__input"
              name="email"
              id="email"
              type="email"
              pattern={PATTERN_EMAIL}
              required
              onChange={handleInputChange}
            />
          </div>
          <button
            className="profile__edit"
            type="submit"
            isButtonDisabled={isButtonDisabled}
          >
            Редактировать
          </button>
        </form>
        <Link to={"/"}>
          <button
            className="profile__exit"
            type="button"
            onClick={handleSingOut}
          >
            Выйти из аккаунта
          </button>
        </Link>
      </div>
    </section>
  );
}
