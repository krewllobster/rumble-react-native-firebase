import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withFirestore } from 'react-redux-firebase';

import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Body,
  Form,
  Item,
  Label,
  Input,
  Spinner
} from 'native-base';

class ChallengeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
    const { challenge } = this.props;
    return (
      <Container>
        <Content>
          {!!challenge ? (
            <Spinner />
          ) : (
            <Card>
              <Text>{JSON.stringify(this.state.challenge)}</Text>
            </Card>
          )}
        </Content>
      </Container>
    );
  }
}

export default withFirestore(ChallengeDetail);
