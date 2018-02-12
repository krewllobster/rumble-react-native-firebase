import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';

import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener
} from 'react-navigation-redux-helpers';

import NavigationStack from './navigationStack';

export const reactNavigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const addListener = createReduxBoundAddListener('root');

class App extends React.Component {
  render() {
    const { dispatch, navState, auth } = this.props;
    const { isLoggedIn } = auth;
    const state = isLoggedIn
      ? navState.stateForLoggedIn
      : navState.stateForLoggedOut;
    return (
      <NavigationStack
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state,
          addListener
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  navState: state.nav,
  auth: state.auth
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
