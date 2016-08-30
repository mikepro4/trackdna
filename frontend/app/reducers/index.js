import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import appReducer from './app_reducer'
import authReducer from './auth_reducer'
import currentVideoReducer from './current_video'
import timeReducer from './time'
import searchReducer from './search'
import {loadingReducer} from 'redux-loading'

const reducers = combineReducers({
  routing: routerReducer,
  app: appReducer,
  form: formReducer,
  loading: loadingReducer,
  auth: authReducer,
  currentVideo: currentVideoReducer,
  time: timeReducer,
  search: searchReducer,
  reduxAsyncConnect
})
export default reducers
