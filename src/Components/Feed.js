import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Text,
  Container,
  Button,
  Header,
  Left,
  Right,
  Content,
  Card,
  CardItem,
  Body,
  Icon,
  Title
} from 'native-base';
import { firestoreConnect } from 'react-redux-firebase';
import createCompany from '../Factories/Company';
import HeaderButton from './HeaderButton';

class Feed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    let x = createCompany({ name: 'my company' });
    return (
      <Container>
        <HeaderButton onPress={() => navigate('DrawerOpen')} />
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>Chat App to talk some awesome people!</Text>
              </Body>
            </CardItem>
          </Card>
          <Button onPress={() => navigate('DrawerOpen')}>
            <Text>Open Drawer</Text>
          </Button>
          <Button onPress={() => navigate('company')}>
            <Text>Open Company</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default compose(
  firestoreConnect(['companies']),
  connect((state, props) => ({
    firestore: state.firestore
  }))
)(Feed);
