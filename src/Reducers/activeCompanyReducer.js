import * as types from '../Actions/actionTypes';
import createReducer from '../Lib/createReducer';

const initialState = { defaultCompany: null, activeCompany: null, error: null };

const activeCompanyReducer = createReducer(initialState, {
  [types.SetActiveCompany](state, action) {
    return {
      ...state,
      activeCompany: action.companyId,
      error: null
    };
  },
  ['@@reactReduxFirebase/SET_PROFILE'](state, action) {
    return {
      ...state,
      activeCompany: Object.entries(action.profile.companies).find(
        ([k, v]) => v.default
      )[0]
    };
  },
  default(state, action) {
    return { ...state };
  }
});

export default activeCompanyReducer;
