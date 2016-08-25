import React, {PropTypes} from 'react';
import { Link } from 'react-router'
import logo from '../../assets/logo.svg'

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Link to='/' className="logo"><img src={logo} role='presentation' /></Link>
          <Link to='/home'>Home</Link>
          <Link to='/browse'>Browse</Link>
          <Link to='/trends'>Trends</Link>
        </header>
      </div>
    );
  }
}
