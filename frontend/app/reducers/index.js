import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import appReducer from './app_reducer'
import {loadingReducer} from 'redux-loading'

const reducers = combineReducers({
  routing: routerReducer,
  app: appReducer,
  form: formReducer,
  loading: loadingReducer,
  reduxAsyncConnect
})
export default reducers
