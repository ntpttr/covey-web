import {userConstants} from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function auth(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
    case userConstants.REGISTER_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
    case userConstants.REGISTER_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
    case userConstants.REGISTER_FAILURE:
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};