import React, {PropTypes} from 'react';
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form';
import { signinUser } from '../../../actions/auth_actions'
import { asyncConnect } from 'redux-connect'
import SignInForm from './signin_form'
import logo from '../../../assets/logo.svg'

@asyncConnect([], state => ({
  auth: state.auth
}))
export default class SignIn extends React.Component {
  handleFormSubmit({ email, password }) {
    this.props.dispatch(signinUser({ email, password }))
  }

  render() {
    return (
      <div>
        <Link to='/' className="logo"><img src={logo} role='presentation' /></Link>
        <SignInForm errorMessage={this.props.auth.error} onSubmit={this.handleFormSubmit.bind(this)} />
      </div>
    );
  }
}
