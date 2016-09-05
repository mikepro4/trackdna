import React from 'react'
import { Field, reduxForm } from 'redux-form'
import classnames from 'classnames'

class TrackSearchForm extends React.Component {
  renderField({ input, label, type, placeholder, meta: { touched, error } }) {
    let containerClassName = classnames({
      'input_container': true,
      'input_container_valid': touched && !error,
      'input_container_error': touched && error,
      'input_container_populated': input.value
    })
    return (
      <div className={containerClassName}>
          <div className='track_search_input_label'>{label}</div>
          <input {...input} className="input track_search_input" placeholder={placeholder} type={type}/>
          <div className='input_error'>{touched && error && <span>{error}</span>}</div>
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='track_search_form_container'>
        <form onSubmit={handleSubmit}>
          <Field name="artist"  component={this.renderField} label="Artist" placeholder="Type artist name..." />
          <Field name="track_name"  component={this.renderField} label="Track Name" placeholder="Type track name..." />
          <button type="submit" className="button button_primary track_search_submit">Search</button>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}

  if (!values.artist) {
    errors.artist = 'Please enter artist name';
  }

  if (!values.track_name) {
    errors.track_name = 'Please enter track name';
  }

  return errors
}

export default reduxForm({
  form: 'TrackSearchForm',
  validate
})(TrackSearchForm)
