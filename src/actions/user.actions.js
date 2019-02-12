import { userConstants } from '../constants';
import { userService } from '../services';
import { history } from '../helpers';

export const userActions = {
  login,
  logout,
  register,
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password)
      .then(
        response => {
          dispatch(success(response.user));
          history.push('/');
        },
        error => {
          dispatch(failure(error));
        }
      );
  }

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } };
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } };
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } };
}

function register(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    userService.register(username, password)
      .then(
        response => {
          dispatch(success(response.user));
          history.push('/');
        },
        error => {
          dispatch(failure(error));
        }
      );
  }

  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } };
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } };
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } };
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}