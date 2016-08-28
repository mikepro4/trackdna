import React from 'react'
import Helmet from "react-helmet";
import { asyncConnect } from 'redux-connect'
import { addTrack, loadTracks } from '../../actions';
import TrackList from '../../components/track/track_list'
import AddTrack from "../../components/track/add_track"

@asyncConnect([{
  promise: ({ store }) => Promise.all([
    store.getState().app.tracksLoaded ? Promise.resolve() : store.dispatch(loadTracks())
  ])
}], state => ({
  auth: state.auth,
	tracks: state.app.tracks,
	loading: state.loading
}))
export default class Browse extends React.Component {
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
		return (
			<div>
			 	<Helmet title="Browse – Track DNA" />

        <AddTrack {...this.props} onSubmit={this.handleFormSubmit.bind(this)} />

        ----
        <div>
  				<h3>Browse Tracks</h3>
  				<TrackList {...this.props} />
        </div>
			</div>
		)
	}
}
