import { NavigationActions } from 'react-navigation';

import AppNavigator from '../Navigation/navigationStack';
// import {
//   Login,
//   Logout,
//   Register,
//   RegisterSuccess,
//   NavigateToLogoutScreen
// } from '../Actions/actionTypes';

// const ActionForLoggedOut = AppNavigator.router.getActionForPathAndParams(
//   'login'
// );

// const ActionForLoggedIn = AppNavigator.router.getActionForPathAndParams(
//   'mainScreens'
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
