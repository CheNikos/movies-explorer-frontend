export const BASE_URL = "https://api.diploma.parkharidi.nomoredomains.monster";

export const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";

export const PATTERN_EMAIL =
  "[A-z0-9!#$%&'*+-/=?^_`{|]{1,64}@[A-z0-9-.]{2,253}\\.[A-z]{2,63}";
export const PATTERN_USERNAME = "[A-я0-9-\\s]{2,30}";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/;

export const isEmailValid = (value) => {
  return emailRegex.test(value);
};
