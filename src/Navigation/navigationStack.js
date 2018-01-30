import React from 'react';
import { Button, Text, Icon } from 'native-base';
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from 'react-navigation';

import Register from '../testContainers/Register';
import PeopleList from '../testComponents/PeopleList';
import Login from '../testContainers/Login';
import Feed from '../testComponents/Feed';
import ChallengeList from '../testComponents/ChallengeList';
import ChallengeDetail from '../testComponents/ChallengeDetail';
import ChallengeNewButton from '../testComponents/ChallengeNewButton';
import ChallengeNew from '../testComponents/ChallengeNew';

const challengeStack = StackNavigator(
  {
    ChallengeList: {
      screen: ChallengeList,
      navigationOptions: ({ navigation }) => ({
        title: 'My Challenges',
        headerRight: (
          <Button onPress={() => navigation.navigate('ChallengeNew')}>
            <Text>New</Text>
          </Button>
        )
      })
    },
    ChallengeDetail: {
      screen: ChallengeDetail,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.title
      })
    },
    ChallengeNew: {
      screen: ChallengeNew,
      navigationOptions: {
        title: 'New Challenge'
      }
    }
  },
  {
    initialRouteName: 'ChallengeList',
    mode: 'modal',
    headerBackTitle: 'Cancel'
  }
);

const mainTabs = TabNavigator(
  {
    Feed: {
      screen: Feed,
      navigationOptions: ({ navigation }) => ({
        title: 'Feed',
        headerLeft: (
          <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
            <Icon name="menu" />
          </Button>
        )
      })
    },
    Challenges: {
      screen: ChallengeList,
      navigationOptions: ({ navigation }) => ({
        title: 'Challenges',
        headerLeft: (
          <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
            <Icon name="menu" />
          </Button>
        )
      })
    },
    People: {
      screen: PeopleList,
      navigationOptions: ({ navigation }) => ({
        title: 'People',
        headerLeft: (
          <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
            <Icon name="menu" />
          </Button>
        )
      })
    }
  },
  {
    order: ['Feed', 'Challenges', 'People'],
    initialRouteName: 'Feed',
    animationEnabled: true,
    swipeEnabled: true,
    activeTintColor: '#0044af'
  }
);

const mainStack = StackNavigator(
  {
    main: { screen: mainTabs },
    ChallengeDetail: {
      screen: ChallengeDetail,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.title
      })
    },
    ChallengeNew: {
      screen: ChallengeNew,
      navigationOptions: {
        title: 'New Challenge',
        headerBackTitle: 'Cancel'
      }
    }
  },
  {
    navigationOptions: {
      initialRouteName: 'mainTabs',
      mode: 'modal'
    }
  }
);

const SignedIn = DrawerNavigator({
  Main: { screen: mainStack, navigationOptions: { title: 'Main Stuff' } }
});

const SignedOut = StackNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register }
  },
  {
    headerMode: 'none'
  }
);

const rootStack = StackNavigator(
  {
    SignedIn: { screen: SignedIn },
    SignedOut: { screen: SignedOut }
  },
  {
    initialRouteName: 'SignedOut',
    headerMode: 'none'
  }
);

export default rootStack;

// export const feedStack = StackNavigator({
//   feed: {
//     screen: Feed
//   }
// });

// export const Tabs = TabNavigator({
//   feed: {
//     screen: feedStack,
//     navigationOptions: {
//       tabBarLabel: 'Feed',
//       title: 'Feed'
//     }
//   },
//   counter: {
//     screen: Counter,
//     navigationOptions: {
//       tabBarLabel: 'Counter'
//     }
//   },
//   logout: {
//     screen: Logout,
//     navigationOptions: {
//       tabBarLabel: 'Logout',
//       title: 'Logout'
//     }
//   }
// });

// const AdminWithDrawer = DrawerNavigator(
//   {
//     Tabs: {
//       screen: Tabs
//     }
//   },
//   {
//     contentComponent: props => <Drawer {...props} />
//   }
// );

// const TabsWithDrawer = DrawerNavigator(
//   {
//     Tabs: {
//       screen: Tabs
//     }
//   },
//   {
//     headerMode: 'screen',
//     contentComponent: props => <Drawer {...props} />
//   }
// );

// const navigator = StackNavigator(
//   {
//     login: {
//       screen: Login,
//       navigationOptions: {
//         title: 'Login'
//       }
//     },
//     signup: {
//       screen: Signup,
//       navigationOptions: {
//         title: 'Register'
//       }
//     },
//     admin: {
//       screen: AdminWithDrawer,
//       navigationOptions: {
//         gesturesEnabled: false,
//         headerLeft: null
//       }
//     },
//     mainScreens: {
//       screen: TabsWithDrawer,
//       navigationOptions: {
//         gesturesEnabled: false,
//         headerLeft: null
//       }
//     },
//     company: {
//       screen: Company
//     }
//   },
//   {
//     mode: 'modal',
//     headerMode: 'none'
//   }
// );

// export default navigator;
