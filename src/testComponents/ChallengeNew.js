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
  Body,
  Picker,
  CheckBox
} from 'native-base';
import { Platform } from 'react-native';
import { challengeModel } from '../Forms/ChallengeForm';

class ChallengeNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalMeasureType: 'count',
      participantType: 'team',
      winConditionType: 'firstToGoal',
      winConditionMeasure: 'sum',
      challengeType: 'fitness'
    };
    this.isDisabled = this.isDisabled.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    headerBackTitle: 'cancel'
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
                iosHeader={label}
                // mode="dropdown"
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
        <Footer>
          <FooterTab>
            <Button
              disabled={this.isDisabled()}
              full
              onPress={() =>
                navigate('AddActivities', { challenge: this.state })
              }
              style={{ backgroundColor: this.isDisabled() ? '#777' : '#37F' }}
            >
              <Text style={{ color: '#FFF' }}>Add Activities</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default ChallengeNew;
