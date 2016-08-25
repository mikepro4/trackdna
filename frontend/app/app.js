import React from 'react'
import routes from './routes'
import { Router } from 'react-router'
import { ReduxAsyncConnect } from 'redux-connect'
import 'isomorphic-fetch'

// Ordered Styles Loading
import './styles/base.scss'
import './styles/modules.scss'
import './styles/utilities.scss'

const App = ({ history }) => (
  <Router history={history} render={(props) => <ReduxAsyncConnect {...props} />}>
    {routes}
  </Router>
)
App.propTypes = {
  history: React.PropTypes.object.isRequired
}

export default App
