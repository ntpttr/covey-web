import {userConstants} from '../constants';

let currentUser = JSON.parse(localStorage.getItem('currentUser'));
const initialState = currentUser ? { currentUser } : {};

export function user(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN:
    case userConstants.REGISTER:
    case userConstants.UPDATE:
      return {
        ...state,
        currentUser: action.user
      }
    case userConstants.LOGOUT:
      return {
        ...state,
        currentUser: null
      };
    default:
      return state;
  }
};