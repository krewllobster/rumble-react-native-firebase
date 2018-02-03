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
  Spinner
} from 'native-base';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: ''
    };
  }

  componentWillMount() {
    this.setState({ loading: false });
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
    const { email, password, loading } = this.state;
    const LoginForm = (
      <Content padder>
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
        <Button block style={{ marginTop: 10 }} onPress={() => this.login()}>
          <Text>Sign In</Text>
        </Button>
        <Button
          block
          style={{ marginTop: 10 }}
          onPress={() => navigate('Register')}
        >
          <Text>Register</Text>
        </Button>
      </Content>
    );
    return (
      <Container>
        {/* <Header>
          <Body>
            <Title>Rumblesum</Title>
          </Body>
        </Header> */}
        {loading ? (
          <Content>
            <Spinner />
          </Content>
        ) : (
          LoginForm
        )}
      </Container>
    );
  }
}

export default Login;
