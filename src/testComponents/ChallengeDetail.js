import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import {
  Container,
  Text,
  Button,
  Card,
  CardItem,
  Body,
  Form,
  Item,
  Label,
  Input
} from 'native-base';

class ChallengeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDescription: ''
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    const editing = state.params.mode === 'edit';
    const { challenge } = state.params;
    return {
      title: challenge.name,
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

  render() {
    const {
      challenge: { description, id },
      mode
    } = this.props.navigation.state.params;
    const { newDescription } = this.state;
    return (
      <Container>
        <Card padder>
          {mode && mode === 'edit' ? (
            <Form>
              <Item regular>
                <Input
                  placeholder={description}
                  value={newDescription}
                  onChangeText={t => this.setState({ newDescription: t })}
                />
              </Item>
            </Form>
          ) : (
            <CardItem>
              <Body>
                <Text>{description}</Text>
              </Body>
            </CardItem>
          )}
        </Card>
      </Container>
    );
  }
}

export default compose(
  firestoreConnect(props => [
    `challenges/${props.navigation.state.params.challenge.id}`
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    challenges:
      ordered.challenges &&
      ordered.challenges[props.navigation.state.params.challenge.id]
  }))
)(ChallengeDetail);
