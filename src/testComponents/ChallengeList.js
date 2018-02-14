import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import {
  Container,
  Text,
  List,
  ListItem,
  Item,
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
    this.state = {
      fabActive: false
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerLeft: (
      <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="menu" />
      </Button>
    ),
    title: 'Challenges',
    headerBackTitle: 'back'
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
                  challenges
                    .filter(c => c.companyId == this.props.activeCompany)
                    .map(item => {
                      return (
                        <ListItem
                          key={item.id}
                          onPress={() =>
                            navigate('ChallengeDetail', {
                              id: item.id,
                              name: item.name
                            })
                          }
                        >
                          <Body>
                            <Text>{item.name}</Text>
                          </Body>
                          <Right>
                            {item.createdBy == this.props.uid && (
                              <Button primary>
                                <Text>Edit</Text>
                              </Button>
                            )}
                            <Icon name="ios-information-circle-outline" />
                          </Right>
                        </ListItem>
                      );
                    })}
              </List>
            )}
          </Content>

          <Fab
            active={this.state.fabActive}
            direction={'up'}
            containerStyle={{}}
            style={{ backgroundColor: '#AA2222' }}
            position="bottomRight"
            onPress={() => this.setState({ fabActive: !this.state.fabActive })}
            // navigate('ChallengeNew')}
          >
            <Icon name="ios-add" />
            <Button
              onPress={() => navigate('ChallengeNew')}
              style={{ backgroundColor: '#34A34F' }}
            >
              <Icon name="create" />
            </Button>

            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="flash" />
            </Button>
          </Fab>
        </View>
      </Container>
    );
  }
}

export default compose(
  firestoreConnect(['challenges']),
  connect((state, props) => ({
    challenges: state.firestore.ordered.challenges,
    activeCompany: state.activeCompany.activeCompany,
    uid: state.auth.uid
  }))
)(ChallengeList);
// export default ChallengeList;
