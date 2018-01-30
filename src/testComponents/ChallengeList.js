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
  Spinner
} from 'native-base';

class ChallengeList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    const { challenges } = this.props;

    return (
      <Container>
        <View flex={1}>
          {!challenges ? (
            <Spinner />
          ) : (
            <List>
              {challenges &&
                challenges.map(item => {
                  return (
                    <ListItem
                      key={item.name}
                      onPress={() =>
                        navigate('ChallengeDetail', {
                          title: item.name,
                          id: item.id
                        })
                      }
                    >
                      <Text>{item.name}</Text>
                    </ListItem>
                  );
                })}
            </List>
          )}

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
  firestoreConnect(props => [
    { collection: 'challenges' } // or `todos/${props.todoId}`
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    challenges: ordered.challenges
  }))
)(ChallengeList);

// export default compose(
//   firestoreConnect(['challenges']),
//   connect((state, props) => ({
//     challenges: state.firestore.ordered.challenges
//   }))
// )(ChallengeList);
