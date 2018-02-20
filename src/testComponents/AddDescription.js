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
  FooterTab,
  Card
} from 'native-base';
import { withFirestore } from 'react-redux-firebase';
import FooterButton from '../Lib/FooterButton';

class AddDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      startDate: '01/01/2019'
    };
  }

  updateStartDate = text => {
    this.setState({
      startDate: text
    });
  };

  updateDescription = text => {
    this.setState({ description: text });
  };

  handleSubmit = () => {
    const { name, description } = this.state;
    const { challenge } = this.props.navigation.state.params;
    const { submitChallenge } = this.props;

    submitChallenge({ ...challenge, name, description });
  };

  render() {
    const { name, description, startDate } = this.state;
    return (
      <Container>
        <Content>
          <Card style={{ height: '100%' }}>
            <Form>
              <Item floatingLabel>
                <Label>Name</Label>
                <Input
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  autoCapitalize="words"
                  value={name}
                  onChangeText={text => this.setState({ name: text })}
                />
              </Item>
              <Item floatingLabel>
                <Label>
                  Description{' '}
                  {description.length > 0
                    ? `(${150 - description.length} chars remaining)`
                    : null}
                </Label>
                <Input
                  autoCorrect={false}
                  returnKeyType="done"
                  enablesReturnKeyAutomatically
                  clearButtonMode="while-editing"
                  maxLength={150}
                  value={description}
                  onChangeText={this.updateDescription}
                />
              </Item>
              <Item floatingLabel last>
                <Label>Start Date</Label>
                <Input
                  autoCorrect={false}
                  returnKeyType="done"
                  enablesReturnKeyAutomatically
                  clearButtonMode="while-editing"
                  value={startDate}
                  onChangeText={this.updateStartDate}
                />
              </Item>
            </Form>
          </Card>
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

export default AddDescription;
