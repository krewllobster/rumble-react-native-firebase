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

import activeCompanyActions from './companyActionCreator';

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

const loginSuccess = ({ uid }) => ({
  type: LoginSuccess,
  uid
});

const loginFailure = ({ error }) => ({
  type: LoginFailure,
  error
});

const registerSuccess = ({ uid, error }) => ({
  type: RegisterSuccess,
  uid,
  error
});

const registerFailure = ({ uid, error }) => ({
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

export const submitRegistration = ({
  email,
  password,
  username,
  companyCode
}) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(register());
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log(email, password, username);
    const companies = await firestore.get({
      collection: 'companies',
      where: ['companyCode', '==', companyCode]
    });

    const company = !!companies._docs[0] && companies._docs[0]._data;
    const companyId =
      !!companies._docs[0] && companies._docs[0]._ref._documentPath._parts[1];

    console.log(companies);
    console.log(company);
    console.log(companyId);

    if (!company && !companyId) {
      return dispatch(
        registerFailure(new Error('No company exists with that code'))
      );
    }

    firebase
      .createUser({ email, password }, { email, username, companyId })
      .then(userData => {
        const { uid } = getState().firebase.auth;
        //set active company
        dispatch(activeCompanyActions.setCompanySuccess(companyId));
        //set auth
        return dispatch(registerSuccess({ uid }));
      })
      .catch(error => {
        return dispatch(registerFailure({ error }));
      });
  };
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
      const { uid } = getState().firebase.auth;
      dispatch(loginSuccess({ uid }));
    })
    .catch(error => {
      dispatch(loginFailure({ error }));
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
