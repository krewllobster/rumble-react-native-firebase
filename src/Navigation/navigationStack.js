import React from 'react';
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from 'react-navigation';

import Counter from '../Components/Counter';
import Logout from '../Components/Logout';
import Login from '../Components/LoginScreen';
import Feed from '../Components/Feed';
import Notification from '../Components/Notification';
import Signup from '../Components/SignupScreen';
import Drawer from '../Components/Drawer';

export const Tabs = TabNavigator({
  feed: {
    screen: Feed,
    navigationOptions: {
      tabBarLabel: 'Feed',
      title: 'Feed'
    }
  },
  counter: {
    screen: Counter,
    navigationOptions: {
      tabBarLabel: 'Counter'
    }
  },
  logout: {
    screen: Logout,
    navigationOptions: {
      tabBarLabel: 'Logout',
      title: 'Logout'
    }
  }
});

const AdminWithDrawer = DrawerNavigator(
  {
    Tabs: {
      screen: Tabs
    }
  },
  {
    contentComponent: props => <Drawer {...props} />
  }
);

const TabsWithDrawer = DrawerNavigator(
  {
    Tabs: {
      screen: Tabs
    }
  },
  {
    contentComponent: props => <Drawer {...props} />
  }
);

const navigator = StackNavigator(
  {
    login: {
      screen: Login,
      navigationOptions: {
        title: 'Login'
      }
    },
    signup: {
      screen: Signup,
      navigationOptions: {
        title: 'Register'
      }
    },
    admin: {
      screen: AdminWithDrawer,
      navigationOptions: {
        gesturesEnabled: false,
        headerLeft: null
      }
    },
    mainScreens: {
      screen: TabsWithDrawer,
      navigationOptions: {
        gesturesEnabled: false,
        headerLeft: null
      }
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

export default navigator;
