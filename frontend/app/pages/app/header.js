import React, {PropTypes} from 'react';
import { Link } from 'react-router'

import logo from '../../assets/logo.svg'
import './header.scss'

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Link to='/'><img src={logo} role='presentation' /></Link>
          <Link to='/home'>Home</Link>
          <Link to='/browse'>Browse</Link>
          <Link to='/trends'>Trends</Link>
        </header>
      </div>
    );
  }
}
