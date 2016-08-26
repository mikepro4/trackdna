import React, {PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form'
import { editTrack } from '../../actions';

class TrackEditForm extends React.Component {
  // handleFormSubmit({ artist, name}) {
  //   const id = this.props.trackId;
  //   console.log({id, artist, name})
  //   console.log(this.props)
  //   this.props.dispatch(editTrack({id, artist, name}))
  //     .then((response) => {
  //       console.log('yay')
  //     });
  // }

  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        <h1>From from TrackEditForm</h1>
        <form onSubmit={handleSubmit}>
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
  form: 'TrackFormEdit'
})(TrackEditForm)
