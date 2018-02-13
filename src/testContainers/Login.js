import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { submitLogin } from '../Actions/actionCreator';
import Login from '../testComponents/Login';

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  submitLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
