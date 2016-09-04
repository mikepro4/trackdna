import React, {PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form'
import classnames from 'classnames'

class TrackMetadataForm extends React.Component {
  renderField({ input, label, type, meta: { touched, error } }) {
    let containerClassName = classnames({
      'input_container': true,
      'input_container_valid': touched && !error,
      'input_container_error': touched && error
    })
    return (
      <div className={containerClassName}>
         <label>{label}</label>
          <input {...input} className="input input_big" placeholder={'Type ' + label + '...'} type={type}/>
          <div className='input_error'>{touched && error && <span>{error}</span>}</div>
      </div>
    )
  }
  render() {
    const { handleSubmit } = this.props
    return (
      <div className='track_metadata_form_container'>
        <form onSubmit={handleSubmit}>
          <Field name="artist"  component={this.renderField} label="Artist Name"/>
          <Field name="trackName"  component={this.renderField} label="Track Name"/>
          <Field name="bpm"  component={this.renderField} label="BPM"/>
          <Field name="youtubeLength"  component={this.renderField} label="Youtube Length Seconds"/>
          <Field name="beatportLength"  component={this.renderField} label="Beatport Length"/>
          <Field name="label"  component={this.renderField} label="Label"/>
          <Field name="genre"  component={this.renderField} label="Genre"/>
          <Field name="key"  component={this.renderField} label="Key"/>
          <Field name="youtubeUrl"  component={this.renderField} label="Youtube Video Id"/>
          <button type="submit" className="button button_primary">Start Analysis</button>
        </form>
      </div>
    )
  }
}

// const validate = values => {
//   const errors = {}
//
//   if (!values.artist) {
//     errors.artist = 'Please enter artist name';
//   }
//
//   if (!values.name) {
//     errors.name = 'Please enter track name';
//   }
//
//   if (!values.youtubeUrl) {
//     errors.youtubeUrl = 'Youtube Video ID is required';
//   }
//
//   return errors
// }

export default reduxForm({
  form: 'TrackMetadataForm'
})(TrackMetadataForm)
