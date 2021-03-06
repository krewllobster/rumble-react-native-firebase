import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { submitRegistration } from '../Actions/actionCreator';
import Register from '../testComponents/Register';

const mapStateToProps = state => ({
  firebase: state.firebase,
  authError: state.firebase.authError
});

const mapDispatchToProps = {
  submitRegistration
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
