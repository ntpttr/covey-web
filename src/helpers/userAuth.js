import { history } from '../helpers';

export function authHeader() {
  // return authorization header with jwt token
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser && currentUser.token) {
      return { 'Authorization': 'Bearer ' + currentUser.token };
  } else {
      return {};
  }
}

export function getCurrentUser() {
  var currentUser;

  // Try getting the current user from browser localstorage
  try {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
  } catch (e) {
    currentUser = null;
  }

  return currentUser;
}

export function logout() {
  // remove user from local storage to log user out
  history.push('/');
  localStorage.removeItem('currentUser');
}