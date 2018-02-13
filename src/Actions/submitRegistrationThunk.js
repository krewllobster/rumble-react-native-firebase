import { register, registerSuccess, registerFailure } from './actionCreator';
import activeCompanyActions from './companyActionCreator';

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
        //set default company
        // dispatch(activeCompanyActions.setDefaultCompany(companyId));
        //set auth
        return dispatch(registerSuccess({ uid }));
      })
      .catch(error => {
        return dispatch(registerFailure({ error }));
      });
  };
};
