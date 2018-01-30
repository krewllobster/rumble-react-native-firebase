import React, { Component } from 'react';
import { Container, Text, Button } from 'native-base';

class People extends Component {
  render() {
    return (
      <Container>
        <Text>People Screen</Text>
        <Button onPress={() => this.props.navigation.navigate('DrawerOpen')}>
          <Text>Open Drawer</Text>
        </Button>
      </Container>
    );
  }
}

export default People;
