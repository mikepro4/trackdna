import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import Header from '../../components/header/header'

@connect(state => ({}))
class AppContainer extends React.Component {
  static propTypes = {
    children: React.PropTypes.any.isRequired
  }

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
