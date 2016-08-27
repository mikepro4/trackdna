import React from 'react'
import Helmet from "react-helmet";
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import { loadTracks } from '../../actions';
import TrackList from '../../components/track/track_list'
import AddTrack from "./add_track"

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
