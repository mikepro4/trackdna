import React from 'react'
import { Link } from 'react-router'
import Helmet from 'react-helmet';
import Header from '../../components/header/header'
import { asyncConnect } from 'redux-connect'
import { loadTracks } from '../../actions';

@asyncConnect([], state => ({
  loading: state.loading,
  auth: state.auth
}))
class AppContainer extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div>
        <Helmet title="App" />
        <Header {...this.props} />

        <div className='container'>
          {children}
        </div>
      </div>
    )
  }
}

export default AppContainer
