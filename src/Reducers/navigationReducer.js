import { NavigationActions } from 'react-navigation';

import AppNavigator from '../Navigation/navigationStack';
// import {
//   Login,
//   Logout,
//   Register,
//   RegisterSuccess,
//   NavigateToLogoutScreen
// } from '../Actions/actionTypes';
// const initialState = NavigationStack.router.getStateForAction(
//   NavigationActions.init()
// );
let initialState = AppNavigator.router.getStateForAction(
  NavigationActions.init()
);

const actionWhileLoggedOut = AppNavigator.router.getActionForPathAndParams(
  'SignedOut'
  // initialState
);

const actionWhileLoggedIn = AppNavigator.router.getActionForPathAndParams(
  'SignedIn'
);

const stateForLoggedOut = AppNavigator.router.getStateForAction(
  actionWhileLoggedOut,
  initialState
);

const stateForLoggedIn = AppNavigator.router.getStateForAction(
  actionWhileLoggedIn,
  stateForLoggedOut
);

// initialState = { stateForLoggedOut, stateForLoggedIn };

const navigationReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  return nextState || state;
};

export default navigationReducer;
