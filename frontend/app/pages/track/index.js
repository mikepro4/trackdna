import React, { PropTypes } from 'react'
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { asyncConnect } from 'redux-connect'
import { loadTrack} from '../../actions'

@asyncConnect([{
  promise: (props) => {
    return Promise.resolve(props.store.dispatch(loadTrack(props.params.id)))
  }
}], state => ({
  currentTrack: state.app.currentTrack
}))
export default class Track extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
    const { name, artist } = this.props.currentTrack
		return (
			<div>
			 	<Helmet title="Track – Track DNA" />
				<h1>{name} - {artist}</h1>
			</div>
		)
	}
}
