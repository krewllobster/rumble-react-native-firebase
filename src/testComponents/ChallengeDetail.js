import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withFirestore } from 'react-redux-firebase';

import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Body,
  Form,
  Item,
  Label,
  Input,
  Spinner,
  Icon,
  Fab
} from 'native-base';

class ChallengeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fabActive: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params;
    return {
      title: !!name ? name : 'no title',
      headerLeft: (
        <Button transparent onPress={() => navigation.navigate('Challenges')}>
          <Icon name="ios-close" />
        </Button>
      )
    };
  };

  render() {
    const { challenge } = this.props;
    return (
      <Container>
        <Content>
          {!challenge ? (
            <Spinner />
          ) : (
            <Card>
              <Text>{JSON.stringify(this.props.navigation.state.params)}</Text>
              <Text>{JSON.stringify(this.props.challenge)}</Text>
            </Card>
          )}
        </Content>
        <Fab
          active={this.state.fabActive}
          direction={'up'}
          containerStyle={{}}
          style={{ backgroundColor: '#AA2222' }}
          position="bottomRight"
          onPress={() => this.setState({ fabActive: !this.state.fabActive })}
          // navigate('ChallengeNew')}
        >
          <Icon name="ios-add" />
          {challenge.activityTypes.map((type, i) => {
            return (
              <Button key={i} style={{ backgroundColor: '#3B5998' }}>
                <Text>{i + 1}</Text>
              </Button>
            );
          })}
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.navigation.state.params;
  return {
    challenge:
      !!state.firestore.data.challenges[id] &&
      state.firestore.data.challenges[id]
  };
};

export default connect(mapStateToProps)(ChallengeDetail);
