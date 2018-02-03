import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import NavigationStack from './navigationStack';

class App extends React.Component {
  render() {
    const { dispatch, navState, auth } = this.props;
    const isLoggedIn =
      auth && !auth.isEmpty && !auth.authError && auth.isLoaded;
    const state = isLoggedIn
      ? navState.stateForLoggedIn
      : navState.stateForLoggedOut;
    return (
      <NavigationStack
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  navState: state.nav,
  auth: state.firebase.auth
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
