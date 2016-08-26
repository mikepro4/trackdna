import React from 'react'
import Helmet from "react-helmet";
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import { loadTracks } from '../../actions';
import TrackList from '../../components/track/track_list'
import AddTrack from "./add_track"

@asyncConnect([{
  promise: ({ store }) => Promise.all([
    store.getState().app.tracksLoaded ? Promise.resolve() : store.dispatch(loadTracks())
  ])
}], state => ({
  tracks: state.app.tracks || []
}))
export default class Browse extends React.Component {
	render() {
    console.log(this.props)
		return (
			<div>
			 	<Helmet title="Browse – Track DNA" />

        <AddTrack />

        ----
        <div>
  				Browse Tracks
  				<TrackList {...this.props} />
        </div>
			</div>
		)
	}
}
