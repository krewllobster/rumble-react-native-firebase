import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, getVal } from 'react-redux-firebase';
import ChallengeModalWrapper from './ChallengeModalWrapper';
import {
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Body,
  Form,
  Item,
  Label,
  Title,
  Spinner,
  Icon,
  Header,
  Left,
  Right,
  Badge
} from 'native-base';
import { View, StyleSheet, StatusBar } from 'react-native';
import ActivitySummary from '../activity/ActivitySummary';

class ChallengeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params;
    return {
      title: !!name ? name : 'no title',
      headerStyle: {
        backgroundColor: '#6F0F58'
      },
      headerTintColor: '#fff',
      headerLeft: (
        <Button transparent onPress={() => navigation.navigate('Challenges')}>
          <Icon name="ios-close" color={'white'} />
        </Button>
      ),
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon name="create" tintColor={'#fff'} />;
      }
    };
  };

  render() {
    const { activities, challenge, users, navigation, uid } = this.props;
    if (!challenge) {
      return <Spinner />;
    }
    return (
      <ChallengeModalWrapper
        challenge={{ ...challenge, id: this.props.navigation.state.params.id }}
      >
        <Content>
          <StatusBar barStyle="light-content" />
          <Card transparent style={styles.descriptionCard}>
            <CardItem bordered style={styles.descriptionCard}>
              <Body>
                <Text style={styles.descriptionText}>
                  {challenge.description}
                </Text>
              </Body>
            </CardItem>
            <CardItem
              footer
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.byline}>
                Created By: {users[challenge.createdBy].username}
              </Text>
              <Text style={styles.byline}>Starts: 01/01/2019</Text>
            </CardItem>
          </Card>

          <Body style={{ flex: 0 }}>
            <Text style={styles.activityText}>Featured Activities</Text>
            <View style={styles.actionContainer}>
              {challenge &&
                challenge.activityTypes.map((t, i) => {
                  return (
                    <Badge key={i} style={styles.actionBadge}>
                      <Text style={styles.actionText}>
                        {t.activity} - {t.measureType}
                      </Text>
                    </Badge>
                  );
                })}
            </View>
          </Body>
          <Card transparent style={{ flex: 1 }}>
            <CardItem header>
              <Text>Recent Activity</Text>
            </CardItem>
            {(!challenge || !activities) && (
              <CardItem>
                <Text>No one has posted any activities</Text>
              </CardItem>
            )}
            {activities &&
              activities.map(a => {
                return (
                  <ActivitySummary
                    createdBy={users[a.createdBy]}
                    currentUser={uid}
                    activity={a}
                    key={a.id}
                  />
                );
              })}
          </Card>
        </Content>
      </ChallengeModalWrapper>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#241933'
  },
  descriptionCard: {
    flex: 0
  },
  descriptionText: {
    color: '#000'
  },
  difficultyButtonInactive: {
    borderColor: '#6F0F58',
    flex: 1,
    justifyContent: 'center'
  },
  difficultyButtonActive: {
    borderColor: '#6F0F58',
    backgroundColor: '#6F0F58',
    flex: 1,
    justifyContent: 'center'
  },
  difficultyTextInactive: {
    color: '#000'
  },
  difficultyTextActive: {
    color: '#fff'
  },
  inputItem: {
    height: 40,
    padding: 0,
    margin: 0
  },
  difficultySegment: {
    width: '100%',
    backgroundColor: 'white'
  },
  activityText: {
    color: '#fff',
    fontSize: 14,
    margin: 5
  },
  byline: {
    color: 'grey',
    fontSize: 12
  },
  actionContainer: {
    flex: 0,
    alignContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  actionBadge: {
    margin: 2,
    padding: 0,
    backgroundColor: '#6F0F58',
    borderColor: 'white',
    borderWidth: 1
  },
  actionText: {
    fontSize: 11,
    color: '#FFF',
    padding: 0
  },
  formButtonContainer: {
    marginTop: 15
  },
  formButtonCancel: {
    borderColor: '#6F0F58',
    marginRight: 2,
    flex: 1,
    justifyContent: 'center'
  },
  formButtonSubmit: {
    backgroundColor: '#6F0F58',
    marginLeft: 2,
    flex: 1,
    justifyContent: 'center'
  },
  cancelText: {
    color: 'black'
  }
});

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.navigation.state.params;
  return {
    challenge:
      !!state.firestore.data.challenges[id] &&
      state.firestore.data.challenges[id],
    activities: state.firestore.ordered[`${id}/activities`],
    users: state.firestore.data.users,
    uid: state.auth.uid
  };
};

export default compose(
  firestoreConnect(props => [
    {
      collection: 'activities',
      where: [[`challenges.${props.navigation.state.params.id}`, '==', true]],
      storeAs: `${props.navigation.state.params.id}/activities`
    }
  ]),
  connect(mapStateToProps)
)(ChallengeDetail);
