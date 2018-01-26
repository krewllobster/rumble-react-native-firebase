import { NavigationActions } from 'react-navigation';

import AppNavigator, { Tabs } from '../Navigation/navigationStack';
import {
  Login,
  Logout,
  Register,
  RegisterSuccess,
  NavigateToLogoutScreen
} from '../Actions/actionTypes';

const ActionForLoggedOut = AppNavigator.router.getActionForPathAndParams(
  'login'
);

const ActionForLoggedIn = AppNavigator.router.getActionForPathAndParams(
  'mainScreens'
);

const stateForLoggedOut = AppNavigator.router.getStateForAction(
  ActionForLoggedOut
);

const stateForLoggedIn = AppNavigator.router.getStateForAction(
  ActionForLoggedIn,
  stateForLoggedOut
);

const initialState = { stateForLoggedOut, stateForLoggedIn };

const navigationReducer = (state = initialState, action) => {
  let nextState;

  return {
    ...state,
    stateForLoggedIn: AppNavigator.router.getStateForAction(action, state)
  };
};

export default navigationReducer;
