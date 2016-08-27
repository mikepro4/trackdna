import React, {PropTypes} from 'react';
import { Link } from 'react-router'
import logo from '../../assets/logo.svg'
import Loader from '../loader'
import { connect } from 'react-redux'
import { loadTracks} from '../../actions/'

export default class Header extends React.Component {
  test() {
    this.props.dispatch(loadTracks())
  }

  renderLinks() {
    if(this.props.auth.authenticated) {
      return (
        <li key="SignOut"><Link to='/auth/signout'>Sign Out</Link></li>
      )
    } else {
      return [
        <li key="Signin"><Link to='/auth/signin'>Sign In</Link></li>,
        <li key="SignUp"><Link to='/auth/signup'>Sign Up</Link></li>
      ]
    }
  }

  render() {
    const path = this.props.location.pathname
    if(path === '/auth/signin' || path === '/auth/signup') {
      return (<div></div>)
    }

    return (
      <div>
        <header>
          <Link to='/' className="logo"><img src={logo} role='presentation' /></Link>

          <ul className="nav">
            {this.props.auth.authenticated ? <li><Link to='/home'>Home</Link></li> : ''}
            <li><Link to='/browse'>Browse</Link></li>
            <li><Link to='/trends'>Trends</Link></li>
            {this.renderLinks()}
          </ul>
          <span className="loading">Global Loading Indicator: <Loader loading={this.props.loading}/></span>
          <button onClick={this.test.bind(this)}>Dispatch Test</button>
        </header>
      </div>
    );
  }
}
