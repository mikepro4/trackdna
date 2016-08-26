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
        console.log('yay', response.data)
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

// function validate(values) {
//   const errors = {};
//
//   if (!values.artist) {
//     errors.artist = 'Enter artist';
//   }
//   if (!values.name) {
//     errors.name = 'Enter name';
//   }
//
//   return errors;
// }

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'TrackForm'
})(AddTrack)
