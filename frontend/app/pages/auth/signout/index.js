import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from '../../../actions/auth_actions'
import { asyncConnect } from 'redux-connect'

@asyncConnect([], state => ({
  auth: state.auth
}))
export default class SignOut extends Component {
  componentWillMount() {
    this.props.dispatch(signoutUser());
  }

  render() {
    return <div>Sorry to see you go...</div>;
  }
}
