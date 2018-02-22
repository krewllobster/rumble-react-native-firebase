import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Body,
  Form,
  Item,
  Label,
  Input,
  Spinner,
  Icon,
  Fab,
  Header,
  Left,
  SafeAreaView,
  Right
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground
} from 'react-native';
import ActionButton from 'react-native-action-button';

class ChallengeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fabActive: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params;
    return {
      title: !!name ? name : 'no title',
      headerStyle: {},
      // headerTintColor: '#fff',
      headerLeft: (
        <Button transparent onPress={() => navigation.navigate('Challenges')}>
          <Icon name="ios-close" color={'white'} />
        </Button>
      )
    };
  };

  render() {
    const { challenge, users, navigation } = this.props;
    if (!challenge) {
      return <Spinner />;
    }
    return (
      <Container>
        {/* <Content> */}
        <Card transparent style={{ flex: 0 }}>
          <CardItem bordered>
            <Body>
              <Text>{challenge.description}</Text>
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
        <View style={styles.actionContainer}>
          {challenge &&
            challenge.activityTypes.map((t, i) => {
              return (
                <Button
                  key={i}
                  small
                  transparent
                  bordered
                  style={styles.actionButton}
                >
                  <Text style={styles.actionText}>
                    {t.activity} - {t.measureType}
                  </Text>
                </Button>
              );
            })}
        </View>
        <Card style={{ flex: 1 }}>
          <CardItem header>
            <Text>Recent Activity</Text>
          </CardItem>
          {challenge && challenge.activities ? (
            <Text>Activities Here</Text>
          ) : (
            <CardItem>
              <Text>No one has posted any activities</Text>
            </CardItem>
          )}
        </Card>
        {/* </Content> */}
        <ActionButton buttonColor="rgba(231,76,60,1)">
          {challenge.activityTypes.map((type, i) => {
            return (
              <ActionButton.Item
                key={i}
                size={35}
                buttonColor={'blue'}
                title={`${type.activity} - ${type.measureType}s`}
              >
                <Icon name="ios-add" style={{ color: 'white' }} />
              </ActionButton.Item>
            );
          })}
        </ActionButton>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  byline: {
    color: 'grey',
    fontSize: 12
  },
  actionContainer: {
    flex: 0,
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  actionButton: {
    margin: 2,
    padding: 0,
    borderColor: 'black'
  },
  actionText: {
    fontSize: 11,
    color: 'black',
    padding: 0
  }
});

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.navigation.state.params;
  return {
    challenge:
      !!state.firestore.data.challenges[id] &&
      state.firestore.data.challenges[id],
    users: state.firestore.data.users
  };
};

export default connect(mapStateToProps)(ChallengeDetail);
