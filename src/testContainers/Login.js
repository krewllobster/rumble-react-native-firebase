import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { submitLogin } from '../Actions/actionCreator';
import Login from '../testComponents/Login';

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  submitLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
