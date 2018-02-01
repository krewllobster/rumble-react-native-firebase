import { NavigationActions } from 'react-navigation';

import AppNavigator from '../Navigation/navigationStack';
import {
  LoginSuccess,
  LoginFailure,
  RegisterFailure,
  RegisterSuccess,
  Logout
} from '../Actions/actionTypes';
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

initialState = { stateForLoggedOut, stateForLoggedIn };

const navigationReducer = (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case LoginSuccess:
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          actionWhileLoggedIn,
          stateForLoggedOut
        )
      };
    case RegisterSuccess:
      nextState = {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          actionWhileLoggedIn,
          stateForLoggedOut
        )
      };
      break;
    case 'Navigation/BACK':
      return {
        ...state,
        stateForLoggedOut: AppNavigator.router.getStateForAction(
          NavigationActions.back(),
          stateForLoggedOut
        ),
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          NavigationActions.back(),
          state.stateForLoggedIn
        )
      };
    case Logout:
      nextState = { ...state, ...initialState };
      break;
    default:
      return {
        ...state,
        stateForLoggedOut: AppNavigator.router.getStateForAction(
          action,
          state.stateForLoggedOut
        ),
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          action,
          state.stateForLoggedIn
        )
      };
  }

  return nextState || state;
};

// const navigationReducer = (state = initialState, action) => {
//   const nextState = AppNavigator.router.getStateForAction(action, state);

//   return nextState || state;
// };

export default navigationReducer;
