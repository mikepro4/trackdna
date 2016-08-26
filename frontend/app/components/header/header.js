import React, {PropTypes} from 'react';
import { Link } from 'react-router'
import logo from '../../assets/logo.svg'
import { connect } from 'react-redux'

export default class Header extends React.Component {
  renderLoading() {
    const loading = this.props.loading.pending
    if(loading) {
      return (
        <span>Loading...</span>
      )
    } return (
      <span> Content Loaded.</span>
    )
  }

  render() {
    return (
      <div>
        <header>
          <Link to='/' className="logo"><img src={logo} role='presentation' /></Link>
          <Link to='/home'>Home</Link>
          <Link to='/browse'>Browse</Link>
          <Link to='/trends'>Trends</Link>
          <span className="loading">Global Loading Indicator: {this.renderLoading()}</span>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading
  };
}

export default connect(mapStateToProps, {})(Header);
