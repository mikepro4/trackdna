import React, {PropTypes} from 'react';
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form';
import { signupUser } from '../../../actions/auth_actions'
import { asyncConnect } from 'redux-connect'
import SignUpForm from './signup_form'

@asyncConnect([], state => ({
  auth: state.auth
}))
export default class SignUp extends React.Component {
  handleFormSubmit({ email, password }) {
    this.props.dispatch(signupUser({ email, password }))
  }

  render() {
    return (
      <div>
        <SignUpForm onSubmit={this.handleFormSubmit.bind(this)} />
      </div>
    );
  }
}
