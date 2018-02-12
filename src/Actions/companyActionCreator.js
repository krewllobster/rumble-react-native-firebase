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

export const setCompany = companyCode => (dispatch, getState, getFirebase) => {
  console.log('async stuff here');
};

export default {
  setCompanySuccess,
  setCompanyFailure,
  setCompany
};
