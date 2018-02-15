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
import ChallengeList from '../testComponents/ChallengeList';
import ChallengeDetail from '../testComponents/ChallengeDetail';
import ChallengeNewButton from '../testComponents/ChallengeNewButton';
import ChallengeNew from '../testComponents/ChallengeNew';
import AddActivities from '../testComponents/AddActivities';
import AddDescription from '../testComponents/AddDescription';
import SubmitChallenge from '../testContainers/SubmitChallenge';
import CompanyList from '../testComponents/CompanyList';
import ChallengeAbout from '../testComponents/challenge/ChallengeAbout';

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
      screen: ChallengeList
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
    initialRouteName: 'Challenges',
    animationEnabled: true,
    swipeEnabled: true,
    activeTintColor: '#0044af'
  }
);

const challengeTabs = TabNavigator(
  {
    details: {
      screen: ChallengeAbout,
      navigationOptions: {
        title: 'About',
        tabBarIcon: <Icon name="people" />
      }
    },
    leaderboard: {
      screen: ChallengeDetail,
      navigationOptions: {
        title: 'Leaders',
        headerTitleStyle: {
          fontSize: 10
        }
      }
    },
    people: {
      screen: ChallengeDetail,
      navigationOptions: {
        title: 'Participants'
      }
    }
  },
  {
    swipeEnabled: true,
    animationEnabled: false,
    activeTintColor: '#0044af',
    tabBarOptions: {
      showIcon: true,
      showLabel: true
    }
  }
);

const mainStack = StackNavigator(
  {
    main: { screen: mainTabs },
    ChallengeDetail: {
      screen: challengeTabs,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.name
      })
    },
    ChallengeNew: {
      screen: ChallengeNew
    },
    AddActivities: {
      screen: AddActivities,
      navigationOptions: {
        title: 'Add Activities',
        headerBackTitle: 'Back'
      }
    },
    AddDescription: {
      screen: SubmitChallenge,
      navigationOptions: {
        title: 'Add Description',
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

const CompanyManagement = StackNavigator({
  ManageCompany: {
    screen: CompanyList
  }
});

const SignedIn = DrawerNavigator({
  Main: { screen: mainStack, navigationOptions: { title: 'Main Stuff' } },
  ManageCompany: {
    screen: CompanyManagement,
    navigationOptions: {
      title: 'Manage Companies'
    }
  }
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
