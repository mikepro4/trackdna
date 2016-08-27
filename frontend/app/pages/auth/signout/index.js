import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from '../../../actions/auth_actions'
import { asyncConnect } from 'redux-connect'
import Helmet from 'react-helmet';

@asyncConnect([], state => ({
  auth: state.auth
}))
export default class SignOut extends Component {
  componentWillMount() {
    this.props.dispatch(signoutUser());
  }

  render() {
    return (
      <div>
        <Helmet title="Track DNA – Sign Out" />
        Sorry to see you go...
      </div>
    )
  }
}
