import React, { PureComponent } from 'react';
import {
  Text,
  Body,
  Left,
  Right,
  Item,
  Container,
  List,
  ListItem,
  CheckBox,
  Card,
  CardItem,
  Content,
  Button,
  Icon,
  Footer,
  Title,
  FooterTab,
  H3,
  Separator,
  Switch
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import GridList from 'react-native-grid-list';
import { View, Dimensions } from 'react-native';
import ActivitySelect, { listActivitySelect } from '../Forms/ActivitySelect';
import ItemGrid from '../Lib/ItemGrid';
import FooterButton from '../Lib/FooterButton';

const CheckList = ({ activities, onPress }) => {
  return (
    <Content>
      {activities.map(([k, v]) => {
        return (
          <View key={`${k}${v.value}`}>
            <Separator>
              <Text>{k.toUpperCase()}</Text>
            </Separator>
            {v.map((i, index) => (
              <ListItem key={i.label} last={index == v.length - 1}>
                <Body>
                  <Text>{i.label}</Text>
                </Body>
                <Right style={{ width: 100 }}>
                  <Switch
                    onValueChange={() =>
                      onPress({ activity: k, measureType: i.value })
                    }
                    value={i.selected}
                  />
                </Right>
              </ListItem>
            ))}
          </View>
        );
      })}
    </Content>
  );
};

class AddActivities extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activityTypes: []
    };
  }

  toggle = item => {
    this.setState(prevState => {
      const selected =
        prevState.activityTypes.findIndex(i => {
          return (
            i.activity == item.activity && i.measureType == item.measureType
          );
        }) > -1;
      if (selected) {
        return {
          activityTypes: prevState.activityTypes.filter(i => {
            return !(
              i.activity == item.activity && i.measureType == item.measureType
            );
          })
        };
      } else {
        return {
          activityTypes: prevState.activityTypes.concat(item)
        };
      }
    });
  };

  render() {
    const { challenge } = this.props.navigation.state.params;
    const { challengeType, goalMeasureType } = challenge;
    const { navigate } = this.props.navigation;
    const { activityTypes } = this.state;

    const validActivity = ({ activityType, measureType }) => {
      return activityType == challengeType && measureType == goalMeasureType;
    };

    const activities = Object.entries(listActivitySelect)
      .filter(([k, v]) => {
        return v.some(validActivity);
      })
      .map(([k, v]) => {
        return [k, v.filter(validActivity)];
      })
      .map(([k, v]) => {
        return [
          k,
          v.map(i => {
            const isSelected = !!activityTypes.find(
              a => a.activity == i.activity && a.measureType == i.value
            );
            return { ...i, selected: isSelected };
          })
        ];
      });

    return (
      <Container>
        <CheckList activities={activities} onPress={val => this.toggle(val)} />
        <FooterButton
          disabled={activityTypes.length < 1}
          onPress={() =>
            navigate('AddDescription', {
              challenge: { ...challenge, activityTypes }
            })
          }
          text="Add Description & Finish"
        />
      </Container>
    );
  }
}

export default AddActivities;
