import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import NavigationStack from './navigationStack';

class App extends React.Component {
  render() {
    const { dispatch, navState, isLoggedIn } = this.props;
    console.log(navState);
    // const initialState = NavigationStack.router.getStateForAction(
    //   NavigationActions.init()
    // );
    const signedOutAction = NavigationStack.router.getActionForPathAndParams(
      'SignedOut'
      // initialState
    );

    const signedInAction = NavigationStack.router.getActionForPathAndParams(
      'SignedIn'
      // initialState
    );

    const signedOutState = NavigationStack.router.getStateForAction(
      signedOutAction
      // initialState
    );
    console.log('hi');
    console.log(signedOutAction);
    console.log(signedInAction);
    console.log(signedOutState);

    const signedInState = NavigationStack.router.getStateForAction(
      signedInAction,
      signedOutState
    );

    console.log(signedInState);
    return (
      <NavigationStack
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navState
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  navState: state.nav,
  isLoggedIn: state.auth.isLoggedIn
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
