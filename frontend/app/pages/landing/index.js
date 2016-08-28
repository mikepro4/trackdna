import React, { PropTypes } from 'react'
import Helmet from 'react-helmet';
import { asyncConnect} from 'redux-connect'

@asyncConnect([], state => ({
  auth: state.auth
}))
export default class Landing extends React.Component {
	static contextTypes = {
		router: PropTypes.object
	};

	componentWillMount() {
		if (this.props.auth.authenticated) {
			this.context.router.push('/home');
		} else {
			this.context.router.push('/');
		}
	}

	render() {
		console.log(this.props.auth)
		return (
			<div>
			 	<Helmet title="Track DNA – Music Analysis Platform" />
				Landing
			</div>
		)
	}
}
