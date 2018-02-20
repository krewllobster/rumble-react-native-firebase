import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { StyleSheet } from 'react-native';
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
      fabActive: false,
      searchString: ''
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
    const { users, uid } = this.props;
    return (
      <Card key={id} style={styles.card}>
        <CardItem
          style={{
            flex: 3,
            flexDirection: 'column',
            alignItems: 'baseline'
          }}
        >
          <Text>{name}</Text>
          <Text style={styles.byline}>
            {users && users[createdBy].username}
          </Text>
        </CardItem>
        <CardItem>
          {uid &&
            createdBy &&
            uid == createdBy && (
              <Button small primary>
                <Text>Edit</Text>
              </Button>
            )}
          <Button
            style={styles.viewButton}
            small
            success
            onPress={() => onPress()}
          >
            <Text>View</Text>
          </Button>
        </CardItem>
      </Card>
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    const { challenges, users } = this.props;
    const { searchString } = this.state;
    return (
      <Container style={styles.container}>
        {challenges && (
          <Item>
            <Icon name="ios-search" />
            <Input
              onChangeText={t => this.setState({ searchString: t })}
              clearButtonMode="while-editing"
              placeholder="Filter"
            />
          </Item>
        )}
        <Content>
          {!challenges ? (
            <Spinner />
          ) : (
            <View>
              {challenges &&
                users &&
                challenges
                  .filter(c => c.companyId == this.props.activeCompany)
                  .filter(c => c.name.search(searchString) !== -1)
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
            </View>
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

const styles = StyleSheet.create({
  byline: {
    fontSize: 12,
    color: 'grey'
  },
  container: {
    padding: 0,
    margin: 0
  },
  viewButton: {
    marginLeft: 2
  },
  card: {
    flexDirection: 'row',
    shadowRadius: -5,
    margin: 0
  }
});

export default compose(
  firestoreConnect(props => {
    console.log(props);
    return ['challenges', 'users'];
  }),
  connect((state, props) => ({
    challenges: state.firestore.ordered.challenges,
    activeCompany: state.activeCompany.activeCompany,
    uid: state.auth.uid,
    users: state.firestore.data.users
  }))
)(ChallengeList);
// export default ChallengeList;
