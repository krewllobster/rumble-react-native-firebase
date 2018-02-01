import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { initLogout } from '../Actions/actionCreator';
import Feed from '../testComponents/Feed';

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  initLogout
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
