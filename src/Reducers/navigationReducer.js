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

const actionWhileLoggedOut = AppNavigator.router.getActionForPathAndParams(
  'SignedOut',
  initialState
);

const actionWhileLoggedIn = AppNavigator.router.getActionForPathAndParams(
  'SignedIn'
);

const stateWhileLoggedOut = AppNavigator.router.getStateForAction(
  actionWhileLoggedOut
);

// const stateWhileLoggedIn = AppNavigator.router.getStateForAction(
//   actionWhileLoggedIn,
//   stateWhileLoggedOut
// );

// const stateForLoggedOut = AppNavigator.router.getStateForAction(
//   ActionForLoggedOut
// );

// const stateForLoggedIn = AppNavigator.router.getStateForAction(
//   ActionForLoggedIn,
//   stateForLoggedOut
// );

// const initialState = { stateForLoggedOut, stateForLoggedIn };

const initialState = AppNavigator.router.getStateForAction(
  NavigationActions.init()
);

const navigationReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  return nextState || state;
};

export default navigationReducer;
