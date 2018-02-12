import * as types from '../Actions/actionTypes';
import createReducer from '../Lib/createReducer';

const initialState = { companyId: null, error: null };

const activeCompanyReducer = createReducer(initialState, {
  [types.SetActiveCompanySuccess](state, action) {
    return {
      ...state,
      companyId: action.companyId,
      error: null
    };
  },
  [types.SetActiveCompanyFailure](state, action) {
    return {
      ...state,
      companyId: null,
      error: action.error
    };
  },
  default(state, action) {
    return { ...state };
  }
});

export default activeCompanyReducer;
