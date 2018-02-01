import {
  incrementCounter,
  decrementCounter,
  Login,
  Logout,
  Register,
  LoginSuccess,
  LoginFailure,
  RegisterSuccess,
  RegisterFailure,
  NavigateToLogoutScreen
} from './actionTypes';

const incrementAction = () => ({
  type: incrementCounter
});

const decrementAction = () => ({
  type: decrementCounter
});

const login = () => ({
  type: Login
});

const logout = () => ({
  type: Logout
});

const register = () => ({
  type: Register
});

const loginSuccess = userData => ({
  type: LoginSuccess,
  userData
});

const loginFailure = error => ({
  type: LoginFailure,
  error
});

const registerSuccess = userData => ({
  type: RegisterSuccess,
  userData
});

const registerFailure = error => ({
  type: RegisterFailure,
  error
});

const navigateToLogoutScreen = () => ({
  type: NavigateToLogoutScreen
});

export const initLogout = () => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  firebase
    .logout()
    .then(dispatch(logout()))
    .catch(e => console.log(e));
};

export const submitRegistration = (credentials, profile) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    return firebase
      .createUser(credentials, profile)
      .then(userData => {
        return dispatch(registerSuccess(userData));
      })
      .catch(error => {
        return dispatch(registerFailure(error));
      });
  };
};

// export const submitRegistration = (credentials, profile) => (
//   dispatch,
//   getState,
//   getFirebase
// ) => {
//   const firebase = getFirebase();
//   firebase
//     .createUser(credentials, profile)
//     .then(userData => {
//       dispatch(registerSuccess(userData));
//     })
//     .catch(error => {
//       dispatch(registerFailure(error));
//     });
// };

export const submitLogin = ({ credentials }) => (
  dispatch,
  getState,
  getFirebase
) => {
  const firebase = getFirebase();
  firebase
    .login(credentials)
    .then(userData => {
      dispatch(loginSuccess(userData));
    })
    .catch(error => {
      dispatch(loginFailure(error));
    });
};

export {
  incrementAction,
  decrementAction,
  login,
  logout,
  register,
  registerSuccess
};
