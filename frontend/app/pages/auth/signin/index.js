import React, {PropTypes} from 'react';
import { Link } from 'react-router'
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect'
import { signinUser } from '../../../actions/auth_actions'
import SignInForm from './signin_form'
import classNames from 'classNames'
import Logo from '../../../components/logo/logo'

@asyncConnect([], state => ({
  auth: state.auth,
  loading: state.loading
}))
export default class SignIn extends React.Component {
  handleFormSubmit({ email, password }) {
    this.props.dispatch(signinUser({ email, password }))
  }

  renderAlert() {
    if (this.props.auth.error) {
      return (
        <span>
          {this.props.auth.error}
        </span>
      );
    }
  }

  render() {
    let errorClass = classNames({
      'form_error': true,
      'show': this.props.auth.error
    });


    return (
      <div className='page_container page_signin'>
        <Helmet title="Track DNA – Sign In" />
        <div className='form_container'>
          <div className='form_header'>
            <Logo {...this.props} />
            <h2>Music Analysis Platform</h2>
          </div>

          <div className='form_top_section'>
            <h1 className='form_title'>Sign In</h1>
            <div className={errorClass}>{this.renderAlert()}</div>
          </div>

          <SignInForm errorMessage={this.props.auth.error} onSubmit={this.handleFormSubmit.bind(this)} />
          <div className='footer_link'>
            <span>Don't have an account? –</span> <Link to='/auth/signup' className='button button-small'>Sign Up </Link>
          </div>
        </div>
      </div>
    );
  }
}
