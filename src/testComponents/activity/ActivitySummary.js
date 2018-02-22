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
import {
  addResponseThunk,
  removeResponseThunk
} from '../../Actions/responseThunks';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

const ResponseBadge = ({
  activity,
  responses,
  type,
  currentUser,
  add,
  remove
}) => {
  if (!responses) {
    return null;
  }
  console.log('activity is', activity);
  const selected = responses.find(r => r.createdBy == currentUser);
  const currentUserResponse =
    selected && responses.find(r => r.createdBy == currentUser);

  const iconName =
    type == 'congrats'
      ? selected ? 'ios-heart' : 'ios-heart-outline'
      : selected ? 'ios-hand' : 'ios-hand-outline';

  const handlePress = () => {
    if (selected) {
      return remove(activity.id, currentUserResponse);
    }
    if (!selected) {
      return add(activity.id, { createdBy: currentUser, responseType: type });
    }
  };

  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <Badge style={styles[type + 'Badge']}>
        <Icon name={iconName} style={styles[type + 'BadgeIcon']} />
        <Text style={styles[type + 'BadgeText']}>{responses.length}</Text>
      </Badge>
    </TouchableOpacity>
  );
};

class ActivitySummary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { activity, createdBy, currentUser, responses } = this.props;
    const congrats =
      responses && responses.filter(r => r.responseType == 'congrats');
    const smackDowns =
      responses && responses.filter(r => r.responseType == 'smackDown');

    return (
      <Card>
        <CardItem>
          <Left>
            <Text>
              {createdBy.username} did a {activity.activity} for{' '}
              {activity.count} {activity.measureType} with a difficulty of{' '}
              {activity.difficulty}
            </Text>
          </Left>
          <Right>
            <ResponseBadge
              activity={activity}
              type="congrats"
              currentUser={currentUser}
              responses={congrats}
              add={this.props.addResponse}
              remove={this.props.removeResponse}
            />
            <ResponseBadge
              activity={activity}
              type="smackDown"
              currentUser={currentUser}
              responses={smackDowns}
              add={this.props.addResponse}
              remove={this.props.removeResponse}
            />
          </Right>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  congratsBadge: {
    marginBottom: 2,
    width: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#241933'
  },
  congratsBadgeIcon: {
    fontSize: 20,
    color: 'white',
    lineHeight: 20
  },
  congratsBadgeText: {
    fontSize: 15,
    color: 'white',
    lineHeight: 20
  },
  smackDownBadge: {
    marginTop: 2,
    width: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#6F0F58'
  },
  smackDownBadgeIcon: {
    fontSize: 20,
    color: 'white',
    lineHeight: 20
  },
  smackDownBadgeText: {
    fontSize: 15,
    color: 'white',
    lineHeight: 20
  }
});

const mapStateToProps = (state, ownProps) => {
  const { activity } = ownProps;
  return {
    responses: state.firestore.ordered[`${ownProps.activity.id}/responses`]
  };
};

const mapDispatchToProps = {
  addResponse: addResponseThunk,
  removeResponse: removeResponseThunk
};

export default compose(
  firestoreConnect(props => [
    {
      collection: `activities/${props.activity.id}/responses`,
      storeAs: `${props.activity.id}/responses`
    }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(ActivitySummary);
