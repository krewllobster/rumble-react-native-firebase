import React, { Component } from 'react';
import { Container, Text, Button } from 'native-base';

class ChallengeList extends Component {
  render() {
    return (
      <Button onPress={() => this.props.navigation.navigate('ChallengeNew')}>
        <Text>New</Text>
      </Button>
    );
  }
}

export default ChallengeList;
