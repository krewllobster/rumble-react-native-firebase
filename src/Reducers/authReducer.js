import {
  Login,
  Logout,
  RegisterSuccess,
  RegisterFailure,
  LoginSuccess,
  LoginFailure,
  Register
} from '../Actions/actionTypes';
import createReducer from '../Lib/createReducer';

const initialState = { isLoggedIn: false, uid: null, error: null };

const authReducer = createReducer(initialState, {
  [Logout](state, action) {
    return { ...initialState };
  },
  [LoginSuccess](state, action) {
    return { isLoggedIn: true, uid: action.uid, error: null };
  },
  [LoginFailure](state, action) {
    return { isLoggedIn: false, uid: null, error: action.error };
  },
  [Register](state, action) {
    return {
      ...state,
      isLoading: true
    };
  },
  [RegisterSuccess](state, action) {
    return { isLoggedIn: true, uid: action.uid, error: null, isLoading: false };
  },
  [RegisterFailure](state, action) {
    return {
      isLoggedIn: false,
      uid: null,
      error: action.error,
      isLoading: false
    };
  },
  default(state, action) {
    return state;
  }
});

export default authReducer;
