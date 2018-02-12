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
  Toast,
  Spinner
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
      companyCode: '',
      password: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.error && nextProps.auth.error.message) {
      Toast.show({
        text: nextProps.auth.error.message,
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
    const { companyCode, email, password, firstName, lastName } = this.state;
    const username = `${firstName} ${lastName}`;
    this.props.submitRegistration({ email, password, username, companyCode });
  }

  render() {
    const { isLoading } = this.props.auth;
    const { navigate } = this.props.navigation;
    const { email, password, companyCode, firstName, lastName } = this.state;
    if (isLoading) {
      return (
        <Container>
          <Content padder>
            <Spinner />
          </Content>
        </Container>
      );
    }
    return (
      <Container>
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
                  clearButtonMode="while-editing"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={t => this.setState({ email: t })}
                />
              </Item>
              <Item floatingLabel>
                <Label>Company Code</Label>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={companyCode}
                  onChangeText={t =>
                    this.setState({ companyCode: t.toUpperCase() })
                  }
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
