import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AddDescription from '../testComponents/AddDescription';
import { submitChallenge } from '../Actions/submitChallengeThunk';

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  submitChallenge
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDescription);
