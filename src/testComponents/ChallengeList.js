import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import {
  Container,
  Text,
  List,
  ListItem,
  Button,
  Fab,
  Icon,
  View,
  Spinner,
  Content,
  Card,
  CardItem,
  Right,
  Body,
  Header,
  Left,
  H3
} from 'native-base';

class ChallengeList extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerLeft: (
      <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="menu" />
      </Button>
    ),
    title: 'Challenges'
  });

  render() {
    const { navigate } = this.props.navigation;
    const { challenges } = this.props;

    const ChallengeCard = ({ challenge }) => {
      return (
        <Card key={challenge.id}>
          <CardItem header>
            <Text>{challenge.name}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{challenge.description}</Text>
            </Body>
            <Right>
              <Button
                onPress={() =>
                  navigate('ChallengeDetail', {
                    id: challenge.id,
                    name: challenge.name,
                    challenge: challenge
                  })
                }
              >
                <Text>Details</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      );
    };

    return (
      <Container>
        <View flex={1}>
          <Content>
            {!challenges ? (
              <Spinner />
            ) : (
              <List>
                {challenges &&
                  challenges.map(item => {
                    return (
                      <ListItem
                        key={item.id}
                        onPress={() =>
                          navigate('ChallengeDetail', {
                            id: item.id
                          })
                        }
                      >
                        <Body>
                          <Text>{item.name}</Text>
                        </Body>
                        <Right>
                          <Icon name="ios-information-circle-outline" />
                        </Right>
                      </ListItem>
                    );
                  })}
              </List>
            )}
          </Content>

          <Fab
            active={true}
            containerStyle={{}}
            style={{ backgroundColor: '#AA2222' }}
            position="bottomRight"
            onPress={() => navigate('ChallengeNew')}
          >
            <Icon name="ios-add" />
          </Fab>
        </View>
      </Container>
    );
  }
}
export default compose(
  firestoreConnect(['challenges']),
  connect((state, props) => ({
    challenges: state.firestore.ordered.challenges
  }))
)(ChallengeList);
// export default ChallengeList;
