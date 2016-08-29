import React, {PropTypes} from 'react';
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form';
import { signupUser } from '../../../actions/auth_actions'
import { asyncConnect } from 'redux-connect'
import Helmet from 'react-helmet';
import SignUpForm from './signup_form'
import classnames from 'classnames'
import Logo from '../../../components/logo/logo'


@asyncConnect([], state => ({
  auth: state.auth,
  loading: state.loading
}))
export default class SignUp extends React.Component {
  renderAlert() {
    if (this.props.auth.error) {
      return (
        <span>
          {this.props.auth.error}
        </span>
      );
    }
  }
  handleFormSubmit({ email, password }) {
    this.props.dispatch(signupUser({ email, password }))
  }

  render() {
    let errorClass = classnames({
      'form_error': true,
      'show': this.props.auth.error
    });
    return (
      <div className='page_container page_signup'>
        <Helmet title="Track DNA – Sign Up" />
        <div className='form_container'>
          <div className='form_header'>
            <Logo {...this.props} />
            <h2>Music Analysis Platform</h2>
          </div>

          <div className='form_top_section'>
            <h1 className='form_title'>Sign Up</h1>
            <div className={errorClass}>{this.renderAlert()}</div>
          </div>

          <SignUpForm errorMessage={this.props.auth.error} onSubmit={this.handleFormSubmit.bind(this)} />
          <div className='footer_link'>
            <span>Already registered? –</span> <Link to='/auth/signin' className='button button-small'>Sign In </Link>
          </div>
        </div>
      </div>
    );
  }
}
