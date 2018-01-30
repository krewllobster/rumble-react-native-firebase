import React, { Component } from 'react';
import { Container, Text, Content } from 'native-base';

import ChallengeModel from '../Factories/Challenge';
import CreateForm from './CreateForm';

class ChallengeNew extends Component {
  render() {
    return (
      <Container>
        <Content>
          <CreateForm model={ChallengeModel} />
        </Content>
      </Container>
    );
  }
}

export default ChallengeNew;
