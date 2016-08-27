import React, {PropTypes} from 'react';
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form';

class SignInForm extends React.Component {
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        {this.renderAlert()}
        <div>
          <label>Email:</label>
          <Field name="email" component="input" />
        </div>
        <div>
          <label>Password:</label>
          <Field name="password" component="input" />
        </div>
        <button action="submit">Sign in</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signin'
})(SignInForm);
