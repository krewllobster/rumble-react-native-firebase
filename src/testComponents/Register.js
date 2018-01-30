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

  componentDidUpdate(props) {
    if (props.auth.error.code) {
      Toast.show({
        text: props.auth.error.code,
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
    const credentials = { email, password, signIn: true };
    const profile = { firstName, lastName, email };
    this.props.submitRegistration({ credentials, profile });
  }

  render() {
    const { navigate } = this.props.navigation;
    const {
      email,
      password,
      firstName,
      lastName,
      passwordConfirm
    } = this.state;
    return (
      <Container>
        <Header>
          <Body>
            <Title>Rumblesum</Title>
          </Body>
        </Header>
        <Container>
          <Content padder>
            <Form>
              <Item fixedLabel>
                <Label>First Name</Label>
                <Input
                  autoCapitalize="none"
                  value={firstName}
                  onChangeText={t => this.setState({ firstName: t })}
                />
              </Item>
              <Item fixedLabel>
                <Label>Last Name</Label>
                <Input
                  autoCapitalize="none"
                  keyboardType="default"
                  value={lastName}
                  onChangeText={t => this.setState({ lastName: t })}
                />
              </Item>
              <Item fixedLabel>
                <Label>Email</Label>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={t => this.setState({ email: t })}
                />
              </Item>
              <Item fixedLabel last>
                <Label>Password</Label>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={t => this.setState({ password: t })}
                />
              </Item>
            </Form>
            <Button block onPress={() => this.register()}>
              <Text>Register</Text>
            </Button>
            <Button
              style={{ marginTop: 10 }}
              block
              onPress={() => navigate('Login')}
            >
              <Text>Sign In</Text>
            </Button>
          </Content>
        </Container>
      </Container>
    );
  }
}

export default Register;
