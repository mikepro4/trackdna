import React, {PropTypes} from 'react';
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form';
import classNames from 'classNames'
import check from '../../../assets/check.svg'

class SignInForm extends React.Component {
  renderField({ input, label, type, meta: { touched, error } }) {
    let containerClassName = classNames({
      'input_container': true,
      'input_container_valid': touched && !error,
      'input_container_error': touched && error
    })
    return (
      <div className={containerClassName}>
          <input {...input} className="input input_big" placeholder={label} type={type}/>
          <div className='input_error'>{touched && error && <span>{error}</span>}</div>
          <div className='input_valid'><img src={check}/></div>
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="email"  component={this.renderField} label="Email" ref="email" />
        <Field name="password"  component={this.renderField} label="Password" />
        <Link to='/auth/forgot_password' className='forgot_link'>Forgot password?</Link>
        <button action="submit" className='button button_primary button_big button_submit'>Sign In</button>
      </form>
    );
  }
}

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Please enter a password';
  }

  return errors
}

export default reduxForm({
  form: 'signin',
  validate
})(SignInForm);
