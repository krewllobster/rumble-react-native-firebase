import * as types from '../Actions/actionTypes';
import createReducer from '../Lib/createReducer';

const initialState = { counter: 0, counterString: '1' };

const counterReducer = createReducer(initialState, {
  [types.incrementCounter](state, action) {
    return {
      ...state,
      counter: state.counter + 1,
      counterString: state.counterString + '1'
    };
  },
  [types.decrementCounter](state, action) {
    return {
      ...state,
      counter: state.counter - 1
    };
  },
  [types.logout](state, action) {
    return { ...initialState };
  },
  ['default'](state, action) {
    return state;
  }
});

export default counterReducer;
