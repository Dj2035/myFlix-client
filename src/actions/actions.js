export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_AUTH = 'SET_AUTH';
export const SET_USER = 'SET_USER';

export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  };
}

export function setAuth(value) {
  return {
    type: SET_AUTH,
    value: { token, user }
  }
}

export function setUser(value) {
  return {
    type: SET_USER,
    value
  };
}