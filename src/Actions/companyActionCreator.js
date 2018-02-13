import {
  SetActiveCompany,
  SetActiveCompanyFailure,
  SetActiveCompanySuccess
} from './actionTypes';

const setCompanySuccess = id => ({
  type: SetActiveCompanySuccess,
  companyId: id
});

const setCompanyFailure = error => ({
  type: SetActiveCompanyFailure,
  error
});

// const setDefaultCompany = id => {
//   return async (dispatch, getState, { getFirebase, getFirestore}) => {

//   }
// }

export const setCompany = companyCode => (dispatch, getState, getFirebase) => {
  console.log('async stuff here');
};

export default {
  setCompanySuccess,
  setCompanyFailure,
  setCompany
  // setDefaultCompany
};
