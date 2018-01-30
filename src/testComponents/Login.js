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
  Image
} from 'native-base';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: ''
    };
  }

  login() {
    const credentials = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.submitLogin({ credentials });
  }
  render() {
    const { navigate } = this.props.navigation;
    const { email, password } = this.state;
    return (
      <Container>
        <Header>
          <Body>
            <Title>Rumblesum</Title>
          </Body>
        </Header>
        <Container>
          <Content>
            <Form>
              <Item fixedLabel>
                <Label>Email</Label>
                <Input
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={text => this.setState({ email: text })}
                />
              </Item>
              <Item fixedLabel last>
                <Label>Password</Label>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  password={true}
                  value={password}
                  onChangeText={text => this.setState({ password: text })}
                />
              </Item>
            </Form>
            <Content padding={10}>
              <Button block onPress={() => navigate('SignedIn')}>
                <Text>Sign In</Text>
              </Button>
            </Content>
            <Content padding={10}>
              <Button block onPress={() => navigate('Register')}>
                <Text>Register</Text>
              </Button>
            </Content>
          </Content>
        </Container>
      </Container>
    );
  }
}

export default Login;
