import React, { Component } from 'react';
import { Container, Text, Button } from 'native-base';

class Feed extends Component {
  render() {
    return (
      <Container>
        <Text>Feed Screen</Text>
        <Button onPress={() => this.props.navigation.navigate('DrawerOpen')}>
          <Text>Open Drawer</Text>
        </Button>
        <Button
          onPress={() =>
            this.props.navigation.navigate('ChallengeDetail', {
              title: 'Second Challenge'
            })
          }
        >
          <Text>Open Second Challenge</Text>
        </Button>
      </Container>
    );
  }
}

export default Feed;
