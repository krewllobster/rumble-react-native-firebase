import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  Footer,
  FooterTab
} from 'native-base';
import { withFirestore } from 'react-redux-firebase';
import FooterButton from '../Lib/FooterButton';

class AddDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
  }

  updateDescription = text => {
    this.setState({ description: text });
  };

  handleSubmit = () => {
    const { firestore } = this.props;
    this.setState({ response: JSON.stringify(Object.keys(firestore)) });
    const { name, description } = this.state;
    const { navigate } = this.props.navigation;
    const { challenge } = this.props.navigation.state.params;
    firestore
      .add('challenges', { ...challenge, name, description })
      .then(response => {
        const id = response._documentPath._parts[1];
        navigate('ChallengeDetail', { id });
      });
  };

  render() {
    const { name, description } = this.state;
    return (
      <Container>
        <Content>
          <Text>{this.state.response || null}</Text>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input
                clearButtonMode="while-editing"
                autoCapitalize="words"
                value={name}
                onChangeText={text => this.setState({ name: text })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>
                Description{' '}
                {description.length > 0
                  ? `(${150 - description.length} chars remaining)`
                  : null}
              </Label>
              <Input
                returnKeyType="done"
                enablesReturnKeyAutomatically
                clearButtonMode="while-editing"
                maxLength={150}
                value={description}
                onChangeText={this.updateDescription}
              />
            </Item>
          </Form>
        </Content>
        <FooterButton
          text="Submit Challenge"
          disabled={name.length == 0 || description.length == 0}
          onPress={this.handleSubmit}
        />
      </Container>
    );
  }
}

// const AddTodo = () =>
//   <div>
//     <button onClick={() => add('todos', { done: false, text: 'Sample' })}>
//       Add Sample Todo
//     </button>
//   </div>

export default withFirestore(AddDescription);
