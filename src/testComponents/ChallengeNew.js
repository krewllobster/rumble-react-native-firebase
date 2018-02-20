import React, { Component } from 'react';
import {
  Container,
  Text,
  Content,
  Form,
  ListItem,
  Right,
  Button,
  Radio,
  List,
  Footer,
  FooterTab,
  DeckSwiper,
  Item,
  Label,
  Input,
  Icon,
  Card,
  CardItem,
  Left,
  Thumbnail,
  Row,
  Body,
  Picker,
  CheckBox,
  Segment
} from 'native-base';
import { Platform, View, StyleSheet } from 'react-native';
import { challengeModel } from '../Forms/ChallengeForm';
import FooterButton from '../Lib/FooterButton';

class ChallengeNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalMeasureType: null,
      participantType: 'team',
      winConditionType: 'firstToGoal',
      winConditionMeasure: 'sum',
      challengeType: 'fitness'
    };
    this.isDisabled = this.isDisabled.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    headerBackTitle: 'cancel',
    title: 'New Challenge'
  });

  isDisabled() {
    return Object.values(this.state).some(v => v == null);
  }

  renderItems(key, { label, options }) {
    return (
      <View>
        <CardItem>
          <Body>
            <Text style={{ alignSelf: 'center' }}>{label}</Text>
            <Segment style={styles.segment}>
              {options.map((o, i) => (
                <Button
                  style={styles.segmentButton}
                  first={i == 0}
                  last={i == options.length - 1}
                  active={this.state[key] == o.value}
                  key={o.label}
                  onPress={() => this.setState({ [key]: o.value })}
                >
                  <Text style={styles.segmentText}>{o.label}</Text>
                </Button>
              ))}
            </Segment>
          </Body>
        </CardItem>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
          <Card>
            {/* <Text>{JSON.stringify(challengeModel)}</Text> */}
            {Object.entries(challengeModel).map(([k, v]) => {
              return this.renderItems(k, v);
            })}
            {/* {Object.keys(challengeModel).map(k => {
              return challengeModel[k].type == 'picker' ? (
                <CustomPicker key={k} s={k} val={challengeModel[k]} />
              ) : null;
            })} */}
          </Card>
        </Content>
        <FooterButton
          disabled={this.isDisabled()}
          onPress={() => navigate('AddActivities', { challenge: this.state })}
          text="Add Activities"
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  segment: {
    backgroundColor: 'white',
    width: '100%'
  },
  segmentButton: {
    flex: 1,
    padding: 0,
    alignContent: 'center',
    justifyContent: 'center'
  },
  segmentText: {
    fontSize: 10
  }
});

export default ChallengeNew;
