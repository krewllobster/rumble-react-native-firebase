import { combineReducers } from 'redux';
import CounterReducer from './counterReducer';
import NavigationReducer from './navigationReducer';
import AuthReducer from './auth';

const AppReducer = combineReducers({
  CounterReducer,
  AuthReducer
});

export default AppReducer;
