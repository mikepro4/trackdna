import React, {PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form'
import classNames from 'classnames'

export default class ChannelDetailsForm extends React.Component {
  componentDidMount() {
    this.props.initialize(
      this.props.initialValues
    )
  }

  renderInputField({ input, label, type, meta: { touched, error } }) {
    let containerClassName = classNames({
      'input_container': true,
      'input_container_valid': touched && !error,
      'input_container_error': touched && error
    })
    return (
      <div className={containerClassName}>
        <label className='form_label'>{label}</label>
        <input {...input} className="input" placeholder={'Type ' + label + '...'} type={type} />
        <div className='input_error'>{touched && error && <span>{error}</span>}</div>
      </div>
    )
  }

  renderDropdownField({ input, label, type, name, options, meta: { touched, error } }) {
    let containerClassName = classNames({
      'input_container': true,
      'input_container_valid': touched && !error,
      'input_container_error': touched && error
    })
    return (
      <div className={containerClassName}>
        <label className='form_label'>{label}</label>
        <select name={name} {...input}>
          <option value="">Select {name}...</option>
          {options.map(colorOption =>
              <option value={colorOption} key={colorOption}>{colorOption}</option>)}
        </select>
      </div>
    )
  }

  render() {
    const { handleSubmit, load, pristine, reset, submitting } = this.props

    const colors = [
      'default', 'red', 'orange', 'green', 'blue', 'indigo', 'violet'
    ]

    const roles = [
      'groove', 'lead', 'background', 'fill'
    ]

    const sources = [
      'synthesized', 'acoustic', 'noise', 'vocal'
    ]

    const types = [
      'bass', 'keyboard', 'pluck', 'pad', 'fx', 'sequence', 'synth', 'ambiance', 'acid', 'bell', 'choir'
    ]

    const categories = [
      'drums', 'synths', 'percussion', 'vocals', 'instruments', 'fx', 'sampled', 'unassigned'
    ]

    return (
      <div className='channel_details_form'>
        <form onSubmit={handleSubmit}>
          <Field name="name"  component={this.renderInputField} label="Channel Name"/>
          <Field name="color"  component={this.renderDropdownField} label="Color" options={colors}/>
          <Field name="groupCategory"  component={this.renderDropdownField} label="Group Category" options={categories}/>
          <Field name="role"  component={this.renderDropdownField} label="Channel Role" options={roles}/>
          <Field name="source"  component={this.renderDropdownField} label="Sound Source" options={sources}/>
          <Field name="type"  component={this.renderDropdownField} label="Sound Type" options={types}/>
          {/* <button type="submit" className="button button_primary">Update Channel</button> */}
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Please enter channel name';
  }

  return errors
}

export default reduxForm({
  form: 'ChannelDetailsForm',
  validate
})(ChannelDetailsForm)
