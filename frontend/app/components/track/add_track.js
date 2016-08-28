import React from 'react'
import { Field, reduxForm } from 'redux-form'

class AddTrack extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h3>Add Track</h3>

          <div>
            <label>Artist</label>
            <Field name="artist" type="text" component="input" className="form-control"  />
          </div>

          <div>
            <label>Name</label>
            <Field  name="name" type="text" component="input" className="form-control" />
          </div>

          <button type="submit" className="button">Add Track</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'TrackForm'
})(AddTrack)
