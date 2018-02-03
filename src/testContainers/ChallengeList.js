import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import ChallengeList from '../testComponents/ChallengeList';

// export default compose(
//   firestoreConnect(['challenges']),
//   connect(({ firestore: { ordered } }, props) => ({
//     challenges: ordered.challenges
//   }))
// )(ChallengeList);

export default compose(
  firestoreConnect(['challenges']),
  connect((state, props) => ({
    challenges: state.firestore.ordered.challenges
  }))
)(ChallengeList);
