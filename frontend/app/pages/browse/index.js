import React from 'react'
import Helmet from "react-helmet";
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import { loadTracks } from '../../reducers'

@asyncConnect([{
  promise: ({ store }) => Promise.all([
    store.getState().app.tracksLoaded ? Promise.resolve() : store.dispatch(loadTracks())
  ])
}], state => ({
  tracks: state.app.tracks || []
}))
export default class Browse extends React.Component {

	renderTrack(trackData) {
		const id = trackData.id;
    const name = trackData.name;

    return (
      <div key={id}>
        <h1>{trackData.artist} - {trackData.name}</h1>
      </div>
    );
  }

	render() {
		console.log(this.props.tracks)
		return (
			<div>
			 	<Helmet title="Browse" />
				Browse Tracks
				{this.props.tracks.map(this.renderTrack)}
			</div>
		)
	}
}
