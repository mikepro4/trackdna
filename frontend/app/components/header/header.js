import React, {PropTypes} from 'react';
import { Link } from 'react-router'
import logo from '../../assets/logo.svg'
import Loader from '../loader'
import { connect } from 'react-redux'
import { loadTracks} from '../../actions/'

@connect(() => ({}))
export default class Header extends React.Component {
  test() {
    this.props.dispatch(loadTracks())
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
          <Link to='/home'>Home</Link>
          <Link to='/browse'>Browse</Link>
          <Link to='/trends'>Trends</Link>
          <Link to='/auth/signin'>Sign In</Link>
          <Link to='/auth/signup'>Sign Up</Link>
          <span className="loading">Global Loading Indicator: <Loader loading={this.props.loading}/></span>
          <button onClick={this.test.bind(this)}>Dispatch Test</button>
        </header>
      </div>
    );
  }
}
