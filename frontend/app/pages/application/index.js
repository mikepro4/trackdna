import React from 'react'
import { Link } from 'react-router'
import Helmet from 'react-helmet';
import Header from '../../components/header/header'

class AppContainer extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <Helmet title="App" />

        <Header />

        <div className='container'>
          {children}
        </div>
      </div>
    )
  }
}

export default AppContainer
