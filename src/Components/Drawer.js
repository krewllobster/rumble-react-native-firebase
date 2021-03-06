import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class Drawer extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Drawer</Text>
        {/* <Button onPress={() => navigate('DrawerClose')} title="Close Me" /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 20,
    marginVertical: 20
  }
});
