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

class Company extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let x = createCompany({ name: 'my company' });
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>Company Details</Text>
              </Body>
            </CardItem>
          </Card>
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
)(Company);
