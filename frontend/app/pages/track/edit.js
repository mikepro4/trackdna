import React, { PropTypes } from 'react'
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { asyncConnect } from 'redux-connect'
import { loadTrack, loadTracks, editTrack } from '../../actions';
import TrackEditForm from './edit-form'

@asyncConnect([{
  promise: (props) => {
    return Promise.resolve(props.store.dispatch(loadTrack(props.params.id)))
  }
}], state => ({
  currentTrack: state.app.currentTrack
}))
export default class TrackEdit extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleFormSubmit({ artist, name}) {
    const id = this.props.currentTrack.id;
    console.log('from edit', {id, artist, name})
    const track =  {id, artist, name, channels: []}
    this.updateTrack(track)
  }

  updateTrack(track) {
    this.props.dispatch(editTrack(track))
      .then((response) => {
        this.props.dispatch(loadTracks())
         .then((response) => {this.context.router.push('/browse')})
      });
  }

	render() {
    const { name, artist, id } = this.props.currentTrack

    const myInitialValues = {
      initialValues: {
        name: name,
        artist: artist
      }
    }
		return (
			<div>
			 	<Helmet title="Track – Track DNA" />
				<h1>Edit - {name} - {artist}</h1>
        <TrackEditForm {...myInitialValues} onSubmit={this.handleFormSubmit.bind(this)} />
			</div>
		)
	}
}
