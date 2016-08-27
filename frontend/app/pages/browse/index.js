import React from 'react'
import Helmet from "react-helmet";
import { asyncConnect } from 'redux-connect'
import { loadTracks } from '../../actions';
import TrackList from '../../components/track/track_list'
import AddTrack from "./add_track"

@asyncConnect([], state => ({
  auth: state.auth,
	tracks: state.app.tracks,
	loading: state.loading
}))
export default class Browse extends React.Component {
	render() {
		return (
			<div>
			 	<Helmet title="Browse – Track DNA" />

        <AddTrack />

        ----
        <div>
  				<h3>Browse Tracks</h3>
  				<TrackList {...this.props} />
        </div>
			</div>
		)
	}
}
