import React, { PropTypes } from 'react'
import Helmet from "react-helmet";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import { loadTrack } from '../../actions';

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
export default class Track extends React.Component {

	render() {
		const { currentTrack,  } = this.props
    const { name, artist } = currentTrack
		return (
			<div>
			 	<Helmet title="Track – Track DNA" />
				<h1>{name} - {artist}</h1>
			</div>
		)
	}
}
