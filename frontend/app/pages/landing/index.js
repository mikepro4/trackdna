import React, { PropTypes } from 'react'
import Helmet from 'react-helmet';
import { Link } from 'react-router'
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
		console.log('auth state', this.props.auth)
		return (
			<div className='page_container page_landing'>
			 	<Helmet title="Track DNA – Music Analysis Platform" />

        <div className='page_content'>

          <div className='block-welcome'>
            <h1>Welcome to Track DNA</h1>
            <p>Yo! It's Working. Some cool stuff over here...</p>
            <ul className='welcome_nav'>
              <li key="Signin"><Link to='/auth/signin' className="button">Sign In</Link></li>
              <li key="SignUp"><Link to='/auth/signup' className="button button_primary">Sign Up</Link></li>
            </ul>
          </div>

          <div className='block-content'>
            <div className='block block-1'>
              <h2>We Do Stuff..</h2>
              <p>Some Description</p>
            </div>
            <div className='block block-2'>
              <h2>We Have Stuff..</h2>
              <p>Some Description</p>
            </div>

            <div className='block block-3'>
              <h2>We Sell Stuff..</h2>
              <p>Some Description</p>
            </div>
          </div>

          <div className='block-content'>
            <div className='block block-1'>
              <h2>Header..</h2>
              <p>Some Description</p>
            </div>
            <div className='block block-2'>
              <h2>Header..</h2>
              <p>Some Description</p>
            </div>

            <div className='block block-3'>
              <h2>Header..</h2>
              <p>Some Description</p>
            </div>
          </div>
          <div className='block-content'>
            <div className='block block-1'>
              <h2>Header..</h2>
              <p>Some Description</p>
            </div>
            <div className='block block-2'>
              <h2>Header..</h2>
              <p>Some Description</p>
            </div>

            <div className='block block-3'>
              <h2>Header..</h2>
              <p>Some Description</p>
            </div>
          </div>
        </div>
			</div>
		)
	}
}
