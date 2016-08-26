import React, { PropTypes } from 'react'
import Helmet from "react-helmet";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import { loadTrack } from '../../actions';
import { Field, reduxForm } from 'redux-form'

@asyncConnect([{
  promise: (props) => {
    const promises = []
    const appState = props.store.getState()
    const currentTrack = appState.app.currentTrack
    if (!currentTrack || currentTrack.id !== props.params.id) {
      promises.push(props.store.dispatch(loadTrack(props.params.id)))
    }
    return Promise.all(promises)
  }
}], state => ({
  currentTrack: state.app.currentTrack
}))
export default class TrackEdit extends React.Component {
  handleFormSubmit({ artist, name}) {
    console.log({ artist, name})
    // this.props.dispatch(addTrack({
    //     artist,
    //     name,
    //     "channels": []
    //   }))
    //   .then((response) => {
    //     this.props.dispatch(loadTracks())
    //   });
  }
	render() {
    const { handleSubmit } = this.props
    console.log(this.props)
		return (
			<div>
			 	<Helmet title="Track – Track DNA" />
				<h1>Edit</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
function mapStateToProps(state) {
  return {
    initialState: state.app.currentTrack
  };
}

export default reduxForm({
  form: 'TrackFormEdit'
}, mapStateToProps)(TrackEdit)
