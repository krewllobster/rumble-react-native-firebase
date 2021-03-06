import React, { Component } from 'react';
import {
  Container,
  Text,
  Body,
  Title,
  Button,
  Content,
  Header,
  Icon,
  Form,
  Item,
  Label,
  Input,
  Card,
  CardItem,
  Image,
  Toast
} from 'native-base';

import { Keyboard } from 'react-native';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authError && nextProps.authError.message) {
      Toast.show({
        text: nextProps.authError.message,
        position: 'top',
        buttonText: 'Hide',
        type: 'danger',
        duration: 5000
      });
    }
  }

  updateForm(text, field) {
    this.setState({ [field]: text });
  }

  register() {
    Keyboard.dismiss();
    const { email, password, firstName, lastName } = this.state;
    const credentials = { email, password, signIn: false };
    const profile = { email, username: `${firstName} ${lastName}` };
    this.props.submitRegistration(credentials, profile);
  }

  render() {
    const { navigate } = this.props.navigation;
    const { email, password, firstName, lastName } = this.state;
    return (
      <Container>
        {/* <Header>
          <Body>
            <Title>Rumblesum</Title>
          </Body>
        </Header> */}
        <Container>
          <Content padder>
            <Form>
              <Item floatingLabel>
                <Label>First Name</Label>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={firstName}
                  onChangeText={t => this.setState({ firstName: t })}
                />
              </Item>
              <Item floatingLabel>
                <Label>Last Name</Label>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  value={lastName}
                  onChangeText={t => this.setState({ lastName: t })}
                />
              </Item>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={t => this.setState({ email: t })}
                />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={t => this.setState({ password: t })}
                />
              </Item>
              <Button
                disabled={!email || !password || !firstName || !lastName}
                block
                onPress={() => this.register()}
              >
                <Text>Register</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      </Container>
    );
  }
}

export default Register;
