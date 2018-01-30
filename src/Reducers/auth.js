import {
  Login,
  Logout,
  RegisterSuccess,
  RegisterFailure,
  LoginSuccess,
  LoginFailure
} from '../Actions/actionTypes';
import createReducer from '../Lib/createReducer';

const initialState = { isLoggedIn: false, error: {}, userData: {} };

const authReducer = createReducer(initialState, {
  [LoginSuccess](state, action) {
    return { ...initialState, isLoggedIn: true, userData: action.userData };
  },
  [LoginFailure](state, action) {
    return { ...initialState, error: action.error };
  },
  [RegisterSuccess](state, action) {
    return { ...initialState, userData: action.userData, isLoggedIn: true };
  },
  [RegisterFailure](state, action) {
    return { ...initialState, isLoggedIn: false, error: action.error };
  },
  default(state, action) {
    return state;
  }
});

export default authReducer;
