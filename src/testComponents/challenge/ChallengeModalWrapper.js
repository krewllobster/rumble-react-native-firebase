import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { submitActivity } from '../../Actions/submitActivityThunk';
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
  Title,
  Spinner,
  Icon,
  Fab,
  Header,
  Left,
  SafeAreaView,
  Right,
  Segment,
  Footer,
  FooterTab
} from 'native-base';
import Modal from 'react-native-modal';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground
} from 'react-native';
import ActionButton from 'react-native-action-button';

class ChallengeModalWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fabActive: false,
      modalVisible: false,
      newActivity: {
        count: undefined,
        activity: undefined,
        measureType: undefined,
        difficulty: '2',
        comment: ''
      }
    };
  }

  isSumbitDisabled() {
    const {
      newActivity: { count, activity, measureType, difficulty, comment }
    } = this.state;
    return !count || !activity || !measureType || !difficulty;
  }

  updateActivity(data) {
    this.setState(prevState => ({
      newActivity: { ...prevState.newActivity, ...data }
    }));
  }

  closeModal() {
    this.setState({ modalVisible: false });
    this.updateActivity({
      activity: '',
      measureType: '',
      count: undefined,
      difficulty: 2,
      comment: undefined
    });
  }

  openModal({ activity, measureType }) {
    this.setState({ modalVisible: true });
    this.updateActivity({ activity, measureType });
  }

  submitActivity() {
    const newActivity = {
      ...this.state.newActivity,
      createdAt: new Date(),
      challenges: {
        [this.props.challenge.id]: true
      },
      createdBy: this.props.auth.uid,
      companyId: this.props.challenge.companyId
    };
    this.props.submitActivity(newActivity).then(() => this.closeModal());
  }

  renderModal = () => {
    const {
      modalVisible,
      newActivity: { count, comment, activity, measureType, difficulty }
    } = this.state;
    return (
      <Modal
        onBackdropPress={() => this.closeModal()}
        onBackButtonPress={() => this.closeModal()}
        avoidKeyboard
        isVisible={modalVisible}
      >
        <Card style={{ flex: 0 }}>
          <CardItem header>
            <Text>Log an Activity</Text>
          </CardItem>
          <CardItem>
            <Text>How many {measureType}s?</Text>
          </CardItem>
          <CardItem bordered style={styles.inputItem}>
            <Input
              autoFocus={true}
              autoCorrect={false}
              keyboardType="decimal-pad"
              value={count}
              placeholder={'0'}
              autoCapitalize={'characters'}
              onChangeText={t => this.updateActivity({ count: t })}
            />
          </CardItem>
          <CardItem>
            <Text>Any thoughts you'd like to share?</Text>
          </CardItem>
          <CardItem bordered style={styles.inputItem}>
            <Input
              autoCorrect={false}
              value={comment}
              onChangeText={t => this.updateActivity({ comment: t })}
            />
          </CardItem>
          <CardItem>
            <Text>How difficult was this?</Text>
          </CardItem>
          <CardItem style={styles.inputItem}>
            <Segment style={styles.difficultySegment}>
              {['1', '2', '3'].map((v, i) => {
                return (
                  <Button
                    style={
                      difficulty == v
                        ? styles.difficultyButtonActive
                        : styles.difficultyButtonInactive
                    }
                    key={i}
                    first={i == 0}
                    last={i == 2}
                    active={difficulty == v}
                    onPress={() => this.updateActivity({ difficulty: v })}
                  >
                    <Text
                      style={
                        difficulty == v
                          ? styles.difficultyTextActive
                          : styles.difficultyTextInactive
                      }
                    >
                      {v}
                    </Text>
                  </Button>
                );
              })}
            </Segment>
          </CardItem>
          <CardItem style={styles.formButtonContainer}>
            <Button
              onPress={() => this.closeModal()}
              bordered
              transparent
              block
              style={styles.formButtonCancel}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Button>
            <Button
              onPress={() => this.submitActivity()}
              block
              primary
              disabled={this.isSumbitDisabled()}
              style={styles.formButtonSubmit}
            >
              <Text>Log Activity</Text>
            </Button>
          </CardItem>
        </Card>
      </Modal>
    );
  };

  render() {
    return (
      <Container style={styles.mainContainer}>
        {this.renderModal()}
        {this.props.children}
        <ActionButton buttonColor="#6F0F58">
          {this.props.challenge.activityTypes.map((type, i) => {
            return (
              <ActionButton.Item
                key={i}
                size={35}
                buttonColor={'#6F0F58'}
                title={`${type.activity} - ${type.measureType}s`}
                onPress={() =>
                  this.openModal({
                    activity: type.activity,
                    measureType: type.measureType
                  })
                }
              >
                <Icon name="ios-add" style={{ color: 'white' }} />
              </ActionButton.Item>
            );
          })}
        </ActionButton>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#241933'
  },
  descriptionCard: {
    flex: 0
  },
  descriptionText: {
    color: '#000'
  },
  difficultyButtonInactive: {
    borderColor: '#6F0F58',
    flex: 1,
    justifyContent: 'center'
  },
  difficultyButtonActive: {
    borderColor: '#6F0F58',
    backgroundColor: '#6F0F58',
    flex: 1,
    justifyContent: 'center'
  },
  difficultyTextInactive: {
    color: '#000'
  },
  difficultyTextActive: {
    color: '#fff'
  },
  inputItem: {
    height: 40,
    padding: 0,
    margin: 0
  },
  difficultySegment: {
    width: '100%',
    backgroundColor: 'white'
  },
  activityText: {
    color: '#fff',
    fontSize: 14,
    margin: 5
  },
  byline: {
    color: 'grey',
    fontSize: 12
  },
  actionContainer: {
    flex: 0,
    alignContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  actionButton: {
    margin: 2,
    padding: 0,
    backgroundColor: '#6F0F58',
    borderColor: 'white'
  },
  actionText: {
    fontSize: 11,
    color: '#FFF',
    padding: 0
  },
  formButtonContainer: {
    marginTop: 15
  },
  formButtonCancel: {
    borderColor: '#6F0F58',
    marginRight: 2,
    flex: 1,
    justifyContent: 'center'
  },
  formButtonSubmit: {
    backgroundColor: '#6F0F58',
    marginLeft: 2,
    flex: 1,
    justifyContent: 'center'
  },
  cancelText: {
    color: 'black'
  }
});

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  submitActivity
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ChallengeModalWrapper
);
