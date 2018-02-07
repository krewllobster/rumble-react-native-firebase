import React from 'react';
import { Button, Text, Icon } from 'native-base';
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from 'react-navigation';

import Drawer from '../Components/Drawer';
import Register from '../testContainers/Register';
import PeopleList from '../testComponents/PeopleList';
import Login from '../testContainers/Login';
import Feed from '../testContainers/Feed';
import ChallengeList from '../testContainers/ChallengeList';
import ChallengeDetail from '../testComponents/ChallengeDetail';
import ChallengeNewButton from '../testComponents/ChallengeNewButton';
import ChallengeNew from '../testComponents/ChallengeNew';
import AddActivities from '../testComponents/AddActivities';

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
      screen: ChallengeDetail
    },
    ChallengeNew: {
      screen: ChallengeNew,
      navigationOptions: {
        title: 'New Challenge',
        headerBackTitle: 'Cancel'
      }
    },
    AddActivities: {
      screen: AddActivities,
      navigationOptions: {
        title: 'Add Activities',
        headerBackTitle: 'Back'
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
    Login: {
      screen: Login,
      navigationOptions: { title: 'Rumblesum', headerBackTitle: null }
    },
    Register: {
      screen: Register,
      navigationOptions: { title: 'Rumblesum', headerBackTitle: null }
    }
  },
  {
    headerMode: 'float'
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
