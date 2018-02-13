import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import {
  Left,
  Right,
  Body,
  Container,
  Content,
  List,
  ListItem,
  Text
} from 'native-base';

class CompanyList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  CompanyItem = ({ id, active, isDefault, name }) => {
    return <ListItem key={id} />;
  };

  render() {
    const { userCompanies, allCompanies, activeCompany } = this.props;
    return (
      <Container>
        <Content padder>
          <List>
            <ListItem>
              <Left>
                <Text>Default</Text>
              </Left>
              <Body>
                <Text>Company Name</Text>
              </Body>
              <Right>
                <Text>Active</Text>
              </Right>
            </ListItem>
            {Object.entries(userCompanies).map(([k, v]) => {
              return (
                <ListItem key={k}>
                  <Text>{allCompanies[k].displayName}</Text>
                </ListItem>
              );
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  allCompanies: state.firestore.data.companies,
  userCompanies: state.firebase.profile.companies,
  activeCompany: state.activeCompany.activeCompany
});

const mapDispatchToProps = {};

export default compose(
  firestoreConnect(['companies']),
  connect(mapStateToProps, mapDispatchToProps)
)(CompanyList);
