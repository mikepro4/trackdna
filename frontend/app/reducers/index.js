import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import _ from 'lodash'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

function parseJSON(response) {
  return response.json()
}

const appReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const reducers = combineReducers({
  routing: routerReducer,
  app: appReducer,
  form: formReducer,
  reduxAsyncConnect
})
export default reducers
