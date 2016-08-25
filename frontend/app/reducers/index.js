import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import _ from 'lodash'

export const LOAD_TRACKS = 'app/LOAD_TRACKS'

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


export function loadTracks() {
  console.log('load shit')
  return dispatch => {
    dispatch({ type: LOAD_TRACKS })

    try {
      console.log('try')
      return fetch('http://localhost:3002/tracks')
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          console.log('sccess')
          dispatch({
            type: `${LOAD_TRACKS}_SUCCESS`,
            result: data
          })
        }).catch((error) => {
          console.log('request to tracks failed', error)
        })
    } catch (err) {
      console.log('Error', err)
    }
  }
}

const appReducer = (state = {}, action) => {
  switch (action.type) {
    case `${LOAD_TRACKS}_SUCCESS`:
      console.log('success switch')
      return Object.assign({}, state, {
        tracks: action.result,
        tracksLoaded: true
      })
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
