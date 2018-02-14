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
  View,
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
  CheckBox
} from 'native-base';
import { Platform } from 'react-native';
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

  render() {
    const CustomPicker = ({ s, val }) => {
      const { label, options, type } = val;
      return (
        type == 'picker' && (
          <Item>
            <Label>{label}</Label>
            <Right>
              <Picker
                style={{
                  width: Platform.OS === 'ios' ? 150 : 150
                }}
                placeholder="select one"
                iosHeader={label}
                mode="dropdown"
                selectedValue={this.state[s]}
                onValueChange={(v, i) => this.setState({ [s]: v })}
              >
                {options.map(o => {
                  return (
                    <Picker.Item
                      key={o.label}
                      label={o.label}
                      value={o.value}
                    />
                  );
                })}
              </Picker>
            </Right>
          </Item>
        )
      );
    };
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content padder>
          <Form>
            {Object.keys(challengeModel).map(k => {
              return challengeModel[k].type == 'picker' ? (
                <CustomPicker key={k} s={k} val={challengeModel[k]} />
              ) : null;
            })}
          </Form>
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

export default ChallengeNew;
