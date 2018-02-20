import React, { Component } from 'react';
import {
  Card,
  CardItem,
  Button,
  Badge,
  Text,
  Right,
  Left,
  Icon
} from 'native-base';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

class ActivitySummary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { activity, user, responses } = this.props;
    return (
      <Card>
        <CardItem style={{ justifyContent: 'center' }}>
          <Left>
            <Text>
              {user.username} did a {activity.activity} for {activity.count}{' '}
              {activity.measureType} with a difficulty of {activity.difficulty}
            </Text>
          </Left>

          <Right>
            <Button
              transparent
              badge
              vertical
              style={{ alignContent: 'center' }}
            >
              {responses && (
                <Badge
                  style={{ backgroundColor: 'white', alignSelf: 'flex-end' }}
                >
                  <Text style={{ color: 'black' }}>{responses.length}</Text>
                  <Icon active name="ios-heart" />
                </Badge>
              )}
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { activity, user } = ownProps;
  return {
    responses: state.firestore.ordered[`${ownProps.activity.id}/responses`]
  };
};

export default compose(
  firestoreConnect(props => [
    {
      collection: `activities/${props.activity.id}/responses`,
      storeAs: `${props.activity.id}/responses`
    }
  ]),
  connect(mapStateToProps)
)(ActivitySummary);
