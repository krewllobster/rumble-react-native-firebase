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

export const submitCompany = companyCode => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const { companies } = getState().firebase.profile;
  const firebase = getFirebase();
  const firestore = getFirestore();
  const newCompany = await firestore.get({
    collection: 'companies',
    where: ['companyCode', '==', companyCode]
  });

  const company = !!newCompany._docs[0] && newCompany._docs[0]._data;
  const companyId =
    !!newCompany._docs[0] && newCompany._docs[0]._ref._documentPath._parts[1];

  if (!company && !companyId) {
    return reject(new Error('No company with that code exists'));
  }

  if (!!company && !!companyId) {
    return firebase.updateProfile({
      companies: { ...companies, [companyId]: { default: false } }
    });
  }
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
