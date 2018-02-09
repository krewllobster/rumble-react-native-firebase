import React, { Component } from 'react';
import { withFirestore } from 'react-redux-firebase';
import ChallengeDetail from '../testComponents/ChallengeDetail';

import { Container, Button, Text, Content, Spinner } from 'native-base';

class connectedChallengeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      challenge: {}
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    const editing = state.params.mode === 'edit';
    return {
      title: 'detail',
      headerLeft: (
        <Button onPress={() => navigate('ChallengeList')}>
          <Text>List</Text>
        </Button>
      ),
      headerBackTitle: 'back',
      headerRight: (
        <Button
          style={{ marginRight: 5 }}
          small
          onPress={() => setParams({ mode: editing ? 'save' : 'edit' })}
        >
          <Text>{editing ? 'save' : 'edit'}</Text>
        </Button>
      )
    };
  };

  componentWillMount() {
    this.props.firestore
      .get({
        collection: 'challenges',
        doc: this.props.navigation.state.params.id
      })
      .then(response => {
        this.setState({ challenge: response._data, loading: false });
      })
      .catch(error => {
        this.setState({ challenge: { error } });
      });
  }

  render() {
    const { loading, challenge } = this.state;
    return (
      <Container>
        <Content>
          {loading ? (
            <Spinner />
          ) : (
            <ChallengeDetail
              {...this.props}
              onBack={() => this.props.navigation.navigate('ChallengeList')}
              challenge={challenge}
            />
          )}
        </Content>
      </Container>
    );
  }
}

export default withFirestore(connectedChallengeDetail);
