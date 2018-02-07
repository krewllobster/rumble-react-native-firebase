import React, { Component } from 'react';
import {
  Text,
  Body,
  Left,
  Right,
  Item,
  Container,
  List,
  ListItem,
  CheckBox
} from 'native-base';

import { View } from 'react-native';
import ActivitySelect from '../Forms/ActivitySelect';

class AddActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityTypes: []
    };
    this.toggle = this.toggle.bind(this);
    this.isIn = this.isIn.bind(this);
  }

  isIn({ type, measure }, val) {
    return type == val.type && measure == val.measure;
  }

  toggle(val) {
    this.setState(prevState => {
      const { activityTypes } = prevState;
      if (activityTypes.find(i => this.isIn(i, val))) {
        return {
          activityTypes: activityTypes.filter(i => !this.isIn(i, val))
        };
      } else {
        return {
          activityTypes: [...activityTypes, val]
        };
      }
    });
  }

  render() {
    const { challenge } = this.props.navigation.state.params;

    const activities = Object.entries(ActivitySelect)
      .filter(([k, v]) => v.type == challenge.challengeType)
      .map(([k, v]) => ({ name: k, ...v }))
      .map(i => ({
        ...i,
        measures: i.measures.filter(o => o.type == challenge.goalMeasureType)
      }));

    return (
      <Container>
        <Text>{JSON.stringify(this.state.activityTypes)}</Text>
        <List>
          {activities.map(({ name, type, measures }) => {
            return (
              <View key={name}>
                <ListItem
                  itemHeader
                  style={{ height: 20, backgroundColor: 'grey' }}
                >
                  <Text>{name.toUpperCase()}</Text>
                </ListItem>
                {measures.map((m, i) => {
                  return (
                    <ListItem key={i} style={{ height: 35 }}>
                      <Body>
                        <Text>{m.label}</Text>
                      </Body>

                      <Right>
                        <CheckBox
                          checked={
                            !!this.state.activityTypes.find(
                              i => i.type == m.type && i.measure == m.value
                            )
                          }
                          onPress={() =>
                            this.toggle({ type: name, measure: m.value })
                          }
                        />
                      </Right>
                    </ListItem>
                  );
                })}
              </View>
            );
          })}
        </List>
      </Container>
    );
  }
}

export default AddActivities;
