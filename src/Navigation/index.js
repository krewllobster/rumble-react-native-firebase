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

// class AppNavigation extends Component {
//   componentDidMount() {
//     BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
//   }

//   componentWillUnmount() {
//     BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
//   }

//   onBackPress = () => {
//     const { dispatch, navigationState } = this.props;
//     if (navigationState.stateForLoggedIn.index <= 1) {
//       BackHandler.exitApp();
//       return;
//     }
//     dispatch(NavigationActions.back());
//     return true;
//   };

//   render() {
//     const { navigationState, dispatch, isLoggedIn } = this.props;
//     const state = isLoggedIn
//       ? navigationState.stateForLoggedIn
//       : navigationState.stateForLoggedOut;
//     return (
//       <NavigationStack navigation={addNavigationHelpers({ dispatch, state })} />
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     isLoggedIn: state.LoginReducer.isLoggedIn,
//     nav: state.NavigationReducer
//   };
// };

// export default connect(mapStateToProps)(AppNavigation);
