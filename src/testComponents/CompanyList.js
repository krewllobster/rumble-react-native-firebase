import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { submitCompany } from '../Actions/actionCreator';
import { setActiveCompany } from '../Actions/companyActionCreator';

import {
  Left,
  Right,
  Body,
  Container,
  Content,
  List,
  ListItem,
  Text,
  Spinner,
  CheckBox,
  Button,
  Icon,
  Footer,
  FooterTab,
  Card,
  CardItem,
  Header,
  Form,
  Input,
  Label,
  Item,
  Toast
} from 'native-base';

import { Keyboard, View } from 'react-native';
import Modal from 'react-native-modal';

class CompanyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      companyCodeInput: '',
      companyCodeError: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Manage Companies',
    headerLeft: (
      <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="menu" />
      </Button>
    )
  });

  componentWillUpdate(nextProps, nextState) {
    if (nextState.companyCodeError) {
      Toast.show({
        text: 'No company exists with that code',
        position: 'top',
        buttonText: 'Hide',
        type: 'danger',
        duration: 4000
      });
    }
  }

  openModal() {
    this.setState({
      modalVisible: true,
      companyCodeInput: '',
      companyCodeError: false
    });
  }

  closeModal() {
    Keyboard.dismiss();
    this.setState({
      modalVisible: false,
      companyCodeInput: '',
      companyCodeError: false
    });
  }

  switchCompany(active, id) {
    if (!active) {
      this.props.setActiveCompany(id);
    }
  }

  addCompany() {
    const { submitCompany } = this.props;
    const { companyCodeInput } = this.state;
    submitCompany(companyCodeInput)
      .then(response => {
        this.setState({ response });
        this.closeModal();
      })
      .catch(error => {
        this.setState({ companyCodeError: true });
        this.closeModal();
      })
      .then(Keyboard.dismiss());
  }

  renderCompanyItem = ({ id, active, isDefault, displayName }) => (
    <ListItem key={id}>
      <Body>
        <Text>{displayName}</Text>
      </Body>
      <Right>
        <CheckBox
          checked={active}
          onPress={() => this.switchCompany(active, id)}
        />
      </Right>
    </ListItem>
  );

  render() {
    const { userCompanies, allCompanies, activeCompany } = this.props;
    const { modalVisible, companyCodeError, companyCodeInput } = this.state;

    return (
      <Container>
        <Modal
          onBackdropPress={() => this.closeModal()}
          onBackButtonPress={() => this.closeModal()}
          avoidKeyboard
          isVisible={modalVisible}
        >
          <View style={{ backgroundColor: 'white' }}>
            <Form>
              <Item last error={companyCodeError}>
                <Input
                  autoCorrect={false}
                  value={companyCodeInput}
                  placeholder={'Company Code'}
                  autoCapitalize={'characters'}
                  onChangeText={t =>
                    this.setState({ companyCodeInput: t.toUpperCase() })
                  }
                />
              </Item>
            </Form>
            <Button full onPress={() => this.addCompany()}>
              <Text>Add Company</Text>
            </Button>
          </View>
        </Modal>
        <Content padder>
          {!allCompanies ? (
            <Spinner />
          ) : (
            <List>
              <ListItem itemHeader first>
                <Body>
                  <Text style={{ fontWeight: 'bold' }}>Company Name</Text>
                </Body>
                <Right>
                  <Text>Current</Text>
                </Right>
              </ListItem>
              {Object.entries(userCompanies).map(([k, v]) => {
                const { displayName } = allCompanies[k];
                const { default: isDefault } = v;
                return this.renderCompanyItem({
                  id: k,
                  isDefault,
                  displayName,
                  active: k == activeCompany
                });
              })}
            </List>
          )}
        </Content>
        <Footer>
          <FooterTab>
            <Button full primary onPress={() => this.openModal()}>
              <Text style={{ color: 'white' }}>Add Another Company</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  allCompanies: state.firestore.data.companies,
  userCompanies: state.firebase.profile.companies,
  activeCompany: state.activeCompany.activeCompany
});

const mapDispatchToProps = {
  submitCompany,
  setActiveCompany
};

export default compose(
  firestoreConnect(['companies']),
  connect(mapStateToProps, mapDispatchToProps)
)(CompanyList);
