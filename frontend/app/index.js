import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import {loadingMiddleware} from 'redux-loading'
import {
  AUTH_USER_SUCCESS
} from './actions/types';

const dest = document.getElementById('app')

if (process.env.NODE_ENV !== 'production') {
  window.React = React // enable debugger
}

// Create redux store
const middleware = [thunk, loadingMiddleware]

let finalCreateStore
if (__DEV__) {
  finalCreateStore = compose(
    applyMiddleware(...middleware),
    // Add support for Redux devtools chrome extension
    window.devToolsExtension ? window.devToolsExtension() : _ => _
  )(createStore)
} else {
  finalCreateStore = applyMiddleware(...middleware)(createStore)
}
const store = finalCreateStore(reducers, window.__data)
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER_SUCCESS });
}


// Render app function
let render = () => {
  let App = require('./app').default
  ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>, dest)
}

// If hot reload is enabled then accept changes to ./app and
// re-render the app if there are no render errors
if (module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react')
    ReactDOM.render(
      <RedBox error={error} />,
      dest
    )
  }
  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept('./app', () => {
    setTimeout(render)
  })
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default)
  })
}

render()
