import React from 'react'
import Helmet from "react-helmet";
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import { loadTracks } from '../../reducers'
import TrackList from './track_list'

@asyncConnect([{
  promise: ({ store }) => Promise.all([
    store.getState().app.tracksLoaded ? Promise.resolve() : store.dispatch(loadTracks())
  ])
}], state => ({
  tracks: state.app.tracks || []
}))
export default class Browse extends React.Component {

	render() {
		console.log(this.props.tracks)
		return (
			<div>
			 	<Helmet title="Browse" />
				Browse Tracks
				<TrackList {...this.props} />
			</div>
		)
	}
}
