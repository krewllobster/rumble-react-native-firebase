import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import { Container, Text, Button } from 'native-base';

class ChallengeDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { description, id } = this.props.challenge;
    return (
      <Container>
        <Text>Description:</Text>
        <Text>{description}</Text>
      </Container>
    );
  }
}

export default connect((state, props) => ({
  challenge: state.firestore.data.challenges[props.navigation.state.params.id]
}))(ChallengeDetail);
