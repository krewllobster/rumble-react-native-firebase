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
  Icon,
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body
} from 'native-base';

import ChallengeModel from '../Factories/Challenge';
import CreateForm from './CreateForm';
import { challengeSchema } from '../Factories/ChallengeFactory';

const cards = [
  {
    text: 'Card One',
    name: 'One'
  }
];
class ChallengeNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      participantType: 'team',
      winCondition: {
        type: null,
        measure: null
      },
      goalType: null,
      activities: []
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerBackTitle: 'cancel'
  });

  selectParticipantType() {
    const { participantType } = this.state;
    return (
      <Container>
        <Content padder>
          <List>
            <ListItem
              onPress={() => this.setState({ participantType: 'individual' })}
            >
              <Text>Individual Challenge</Text>
              <Right>
                <Radio selected={participantType == 'individual'} />
              </Right>
            </ListItem>
            <ListItem
              onPress={() => this.setState({ participantType: 'team' })}
            >
              <Text>Team Challenge</Text>
              <Right>
                <Radio selected={participantType == 'team'} />
              </Right>
            </ListItem>
          </List>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              disabled={!participantType}
              onPress={() => this.setState({ index: 1 })}
            >
              <Text>Next</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  setWinCondition() {
    const { winCondition: { type, measure }, participantType } = this.state;
    return (
      <Container>
        <Content padder>
          <List>
            <ListItem itemHeader first>
              <Text>
                How will{' '}
                {participantType == 'individual' ? 'an individual' : 'a team'}{' '}
                win?
              </Text>
            </ListItem>
            <ListItem
              onPress={() =>
                this.setState(prevState => ({
                  winCondition: {
                    ...prevState.winCondition,
                    type: 'firstToGoal'
                  }
                }))
              }
            >
              <Text>First to a goal</Text>
              <Right>
                <Radio selected={type == 'firstToGoal'} />
              </Right>
            </ListItem>
            <ListItem
              onPress={() =>
                this.setState(prevState => ({
                  winCondition: {
                    ...prevState.winCondition,
                    type: 'goalAfterTime'
                  }
                }))
              }
            >
              <Text>Highest goal after time period</Text>
              <Right>
                <Radio selected={type == 'goalAfterTime'} />
              </Right>
            </ListItem>
            <ListItem itemHeader>
              <Text>How will the goal be measured?</Text>
            </ListItem>
            <ListItem
              onPress={() =>
                this.setState(prevState => ({
                  winCondition: { ...prevState.winCondition, measure: 'sum' }
                }))
              }
            >
              <Text>Sum Total</Text>
              <Right>
                <Radio selected={measure == 'sum'} />
              </Right>
            </ListItem>
            <ListItem
              onPress={() =>
                this.setState(prevState => ({
                  winCondition: {
                    ...prevState.winCondition,
                    measure: 'average'
                  }
                }))
              }
            >
              <Text>Average</Text>
              <Right>
                <Radio selected={measure == 'average'} />
              </Right>
            </ListItem>
          </List>
        </Content>
        <Footer>
          <FooterTab>
            <Button full onPress={() => this.setState({ index: 0 })}>
              <Text>Previous</Text>
            </Button>
            <Button
              full
              disabled={!measure || !type}
              onPress={() => this.setState({ index: 2 })}
            >
              <Text>Next</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  render() {
    const { index } = this.state;
    const screens = [this.selectParticipantType(), this.setWinCondition()];
    // return <Container>{screens[index]}</Container>;
    return (
      <Container>
        <Content>
          <DeckSwiper
            ref={c => (this._deckSwiper = c)}
            dataSource={screens}
            renderEmpty={() => (
              <View style={{ alignSelf: 'center' }}>
                <Text>Over</Text>
              </View>
            )}
            renderItem={item => item}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button
              full
              iconLeft
              onPress={() => this._deckSwiper._root.swipeLeft()}
            >
              <Text>Back</Text>
            </Button>
          </FooterTab>
          <FooterTab icon="arrow-forward">
            <Button
              full
              iconRight
              onPress={() => this._deckSwiper._root.swipeRight()}
            >
              <Text>Next</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default ChallengeNew;
