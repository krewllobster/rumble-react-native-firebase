import {
  Login,
  Logout,
  Register,
  LoginSuccess,
  LoginFailure,
  RegisterSuccess,
  RegisterFailure,
  NavigateToLogoutScreen
} from './actionTypes';

const login = () => ({
  type: Login
});

const logout = () => ({
  type: Logout
});

export const register = () => ({
  type: Register
});

const loginSuccess = ({ uid }) => ({
  type: LoginSuccess,
  uid
});

const loginFailure = ({ error }) => ({
  type: LoginFailure,
  error
});

export const registerSuccess = ({ uid, error }) => ({
  type: RegisterSuccess,
  uid,
  error
});

export const registerFailure = ({ uid, error }) => ({
  type: RegisterFailure,
  error
});

const navigateToLogoutScreen = () => ({
  type: NavigateToLogoutScreen
});

export const initLogout = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  firebase
    .logout()
    .then(dispatch(logout()))
    .catch(e => console.log(e));
};

export const submitLogin = ({ credentials }) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  firebase
    .login(credentials)
    .then(userData => {
      console.log('logging in userdata');
      console.log(userData);
      const { uid } = getState().firebase.auth;
      //TODO: If no companyId, goto default company
      dispatch(loginSuccess({ uid }));
    })
    .catch(error => {
      dispatch(loginFailure({ error }));
    });
};
