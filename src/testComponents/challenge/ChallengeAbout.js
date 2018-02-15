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
  SafeAreaView
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
      header: null,
      // title: !!name ? name : 'no title',
      // headerStyle: {
      //   backgroundColor: '#000066'
      // },
      // headerTintColor: '#fff',
      // headerLeft: (
      //   <Button transparent onPress={() => navigation.navigate('Challenges')}>
      //     <Icon name="ios-close" color={'white'} />
      //   </Button>
      // ),
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon name="create" tintColor={'#fff'} />;
      }
    };
  };

  render() {
    const { challenge, users, navigation } = this.props;
    if (!challenge) {
      return <Spinner />;
    }

    return (
      <Container style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Content>
          <Grid>
            <Col>
              <Row style={styles.intro}>
                <ImageBackground
                  style={styles.introImage}
                  source={{
                    uri:
                      'https://cdn.pixabay.com/photo/2016/03/22/15/31/background-image-1273097_960_720.jpg'
                  }}
                >
                  <Text style={styles.introText}>{challenge.name}</Text>
                </ImageBackground>
                <Button
                  style={styles.closeButton}
                  transparent
                  onPress={() => navigation.navigate('Challenges')}
                >
                  <Icon name="ios-close" color={'white'} />
                </Button>
              </Row>
              <Row style={styles.header}>
                <Text style={styles.headerText}>Description</Text>
              </Row>
              <Row style={styles.content}>
                <Text style={styles.description}>{challenge.description}</Text>
              </Row>
              <Row style={styles.header}>
                <Text style={styles.headerText}>Activities</Text>
              </Row>
              <Row style={styles.contentWrap}>
                {challenge.activityTypes.map((item, index) => {
                  return (
                    <Button key={index} disabled small style={styles.pill}>
                      <Text>
                        {item.activity} - {item.measureType}
                      </Text>
                    </Button>
                  );
                })}
              </Row>
              <Row>
                <Col>
                  <Row style={styles.headerSecondary}>
                    <Text style={styles.headerTextSecondary}>Author</Text>
                  </Row>
                  <Row style={styles.centered}>
                    <Text style={styles.detail}>
                      {users[challenge.createdBy].username}
                    </Text>
                  </Row>
                </Col>
                <Col>
                  <Row style={styles.headerSecondary}>
                    <Text style={styles.headerTextSecondary}>
                      Challenge Type
                    </Text>
                  </Row>
                  <Row style={styles.centered}>
                    <Text style={styles.detail}>{challenge.challengeType}</Text>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Grid>
        </Content>
        {/* <Content padder>
          <Card>
            <CardItem headerLeft>
              <Text>Author</Text>
            </CardItem>
            <CardItem>
              <Text>{users[challenge.createdBy].username}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>Challenge Description</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{challenge.description}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content> */}
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
  intro: {
    backgroundColor: 'blue'
  },
  introImage: {
    flex: 1,
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  introTextContainer: {
    position: 'absolute',
    height: 150,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  introText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 0
  },
  container: {
    backgroundColor: '#000066'
  },
  header: {
    backgroundColor: '#7700dd',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerSecondary: {
    backgroundColor: '#7700dd',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  pill: {
    margin: 2
  },
  headerTextSecondary: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  content: {
    padding: 10
  },
  contentWrap: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  detail: {
    color: '#fff'
  },
  description: {
    color: '#fff'
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
