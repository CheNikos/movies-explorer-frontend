export const BASE_URL = "https://api.diploma.parkharidi.nomoredomains.monster";

export const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";

export const PATTERN_EMAIL =
  "[A-z0-9!#$%&'*+-/=?^_`{|]{1,64}@[A-z0-9-.]{2,253}\\.[A-z]{2,63}";
export const PATTERN_USERNAME = "[A-я0-9-\\s]{2,30}";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/;

export const isEmailValid = (value) => {
  return emailRegex.test(value);
};

export const MAX_SHORT_MOVIE_DURATION = 40;

export const MOVIE_NUMBER = {
  SMALL: {
    DEFAULT: 5,
    ADD: 2,
  },
  MEDIUM: {
    DEFAULT: 8,
    ADD: 2,
  },
  LARGE: {
    DEFAULT: 12,
    ADD: 3,
  },
  EXTRA_LARGE: {
    DEFAULT: 16,
    ADD: 4,
  },
};

export const SCREEN_BREAKPOINT = {
  LAPTOP: 1279,
  TABLET: 1023,
  SMARTPHONE: 767,
};

export const MESSAGES = {
  MOVIE_NOT_FOUND: "Не найденно",
  PAGE_NOT_FOUND: "Страница не найдена",
};

export const NOTIFICATION_DURATION = 3000;
