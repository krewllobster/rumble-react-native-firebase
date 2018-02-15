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
  H3,
  Input,
  Thumbnail
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

  renderChallenge = ({ challenge, index, onPress }) => {
    const { id, name, createdBy } = challenge;
    return (
      <ListItem onPress={() => onPress()} first={index == 0} key={id} avatar>
        <Left>
          <Thumbnail source={require('../assets/flag-1095057_640.png')} />
        </Left>
        <Body>
          <Text>{name}</Text>
        </Body>
        <Right>
          {createdBy == this.props.uid && (
            <Button primary small>
              <Text>Edit</Text>
            </Button>
          )}
        </Right>
      </ListItem>
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    const { challenges } = this.props;

    return (
      <Container>
        <Header searchBar rounded>
          <Item style={{ margin: 0 }}>
            <Icon name="ios-search" />
            <Input placeholder="Filter" />
          </Item>
        </Header>
        <Content>
          {!challenges ? (
            <Spinner />
          ) : (
            <List>
              {challenges &&
                challenges
                  .filter(c => c.companyId == this.props.activeCompany)
                  .map((item, index) =>
                    this.renderChallenge({
                      challenge: item,
                      index,
                      onPress: () =>
                        navigate('ChallengeDetail', {
                          id: item.id,
                          name: item.name
                        })
                    })
                  )}
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
      </Container>
    );
  }
}

export default compose(
  firestoreConnect(['challenges', 'users']),
  connect((state, props) => ({
    challenges: state.firestore.ordered.challenges,
    activeCompany: state.activeCompany.activeCompany,
    uid: state.auth.uid
  }))
)(ChallengeList);
// export default ChallengeList;
