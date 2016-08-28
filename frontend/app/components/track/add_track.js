import React from 'react'
import { Field, reduxForm } from 'redux-form'
import classNames from 'classNames'

class AddTrack extends React.Component {
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
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='track_form'>
        <form onSubmit={handleSubmit}>
          <h3>Add Track</h3>
          <Field name="artist"  component={this.renderField} label="Artist"/>
          <Field name="name"  component={this.renderField} label="Name"/>
          <Field name="youtubeUrl"  component={this.renderField} label="Youtube Video Id"/>
          <button type="submit" className="button button_primary">Add Track</button>
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

  if (!values.name) {
    errors.name = 'Please enter track name';
  }

  if (!values.youtubeUrl) {
    errors.youtubeUrl = 'Youtube Video ID is required';
  }

  return errors
}

export default reduxForm({
  form: 'TrackForm',
  validate
})(AddTrack)
