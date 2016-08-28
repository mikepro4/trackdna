import React, {PropTypes} from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Logo from '../logo/logo'

export default class Header extends React.Component {
  renderLinks() {
    if(this.props.auth.authenticated) {
      return (
        <li key="SignOut"><Link to='/auth/signout' className="button">Sign Out</Link></li>
      )
    } else {
      return [
        <li key="Signin"><Link to='/auth/signin' className="button">Sign In</Link></li>,
        <li key="SignUp"><Link to='/auth/signup' className="button button_primary">Sign Up</Link></li>
      ]
    }
  }

  render() {
    const path = this.props.location.pathname
    // Don't render header for Signin and Signup pages
    if(path === '/auth/signin' || path === '/auth/signup') {
      return (<div></div>)
    }

    return (
      <div className='header_container'>
        <header className="app_header">
          <div className='header_left_section'>
            <Logo {...this.props} />

            <ul className='nav'>
              {this.props.auth.authenticated ? <li><Link to='/home' activeClassName='active'>Home</Link></li> : ''}
              <li><Link to='/browse' activeClassName='active'>Browse</Link></li>
              <li><Link to='/trends' activeClassName='active'>Trends</Link></li>
              <li><Link to='/track/new' activeClassName='active'>New Track</Link></li>
            </ul>
          </div>

          <div className='header_right_section'>
            <ul className="nav_auth">
              {this.renderLinks()}
            </ul>
          </div>
        </header>
      </div>
    );
  }
}
