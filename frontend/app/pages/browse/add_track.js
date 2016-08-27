import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { addTrack, loadTracks } from '../../actions';

class AddTrack extends React.Component {
  handleFormSubmit({ artist, name}) {
    this.props.dispatch(addTrack({
        artist,
        name,
        "channels": []
      }))
      .then((response) => {
        this.props.dispatch(loadTracks())
      });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h3>Add Track</h3>

          <div>
            <label>Artist</label>
            <Field name="artist" type="text" component="input" className="form-control"  />
          </div>

          <div>
            <label>Name</label>
            <Field  name="name" type="text" component="input" className="form-control" />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'TrackForm'
})(AddTrack)
