import { userConstants } from '../constants';
import { userService } from '../services';
import { history } from '../helpers';

export const userActions = {
  login,
  logout,
  register,
  update,
};

function login(username, password) {
  return dispatch => {
    userService.login(username, password)
      .then(
        user => {
          dispatch(success(user));
          history.push('/');
        },
        error => {
          console.log('ERROR', error);
        }
      );
  }

  function success(user) { return { type: userConstants.LOGIN, user } };
}

function register(username, password) {
  return dispatch => {
    userService.register(username, password)
      .then(
        user => {
          dispatch(success(user));
          history.push('/');
        },
        error => {
          console.log('ERROR', error);
        }
      );
  }

  function success(user) { return { type: userConstants.REGISTER, user } };
}

function update(field, value) {
  return dispatch => {
    let property = {};
    property[field] = value;

    userService.update(property)
      .then(
        user => {
          dispatch(success(user));
          history.push('/');
        },
        error => {
          console.log('ERROR', error);
        }
      );
  }

  function success(user) { return { type: userConstants.UPDATE, user } };
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}