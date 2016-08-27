import React, {PropTypes} from 'react';
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form';
import { signupUser } from '../../../actions/auth_actions'
import { asyncConnect } from 'redux-connect'
import SignUpForm from './signup_form'
import logo from '../../../assets/logo.svg'

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
        <Link to='/' className="logo"><img src={logo} role='presentation' /></Link>
        <SignUpForm errorMessage={this.props.auth.error} onSubmit={this.handleFormSubmit.bind(this)} />
      </div>
    );
  }
}
