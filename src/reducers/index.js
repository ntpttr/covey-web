import { combineReducers } from 'redux';

import { auth } from './auth.reducer';
import { common } from './common.reducer';

export default combineReducers({
  auth,
  common,
});