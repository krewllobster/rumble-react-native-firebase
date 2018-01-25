import { Login, Logout, RegisterSuccess } from '../Actions/actionTypes';
import * as types from '../Actions/actionTypes';
import createReducer from '../Lib/createReducer';

const initialState = { isLoggedIn: false };

const loginReducer = createReducer(initialState, {
  [types.Login](state, action) {
    return { ...state, isLoggedIn: true };
  },
  [types.Logout](state, action) {
    return { ...state, isLoggedIn: false };
  },
  [types.RegisterSuccess](state, action) {
    return { ...state, isLoggedIn: true };
  },
  default(state, action) {
    return state;
  }
});

export default loginReducer;
