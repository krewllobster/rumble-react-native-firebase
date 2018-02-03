import {
  Login,
  Logout,
  RegisterSuccess,
  RegisterFailure,
  LoginSuccess,
  LoginFailure
} from '../Actions/actionTypes';
import createReducer from '../Lib/createReducer';

const initialState = { isLoggedIn: false };

const authReducer = createReducer(initialState, {
  [Logout](state, action) {
    return { isLoggedIn: false };
  },
  [LoginSuccess](state, action) {
    return { isLoggedIn: true };
  },
  [LoginFailure](state, action) {
    return { isLoggedIn: false };
  },
  [RegisterSuccess](state, action) {
    return { isLoggedIn: true };
  },
  [RegisterFailure](state, action) {
    return { isLoggedIn: false };
  },
  default(state, action) {
    return state;
  }
});

export default authReducer;
