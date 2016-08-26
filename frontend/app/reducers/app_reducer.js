import {
  LOAD_TRACKS_SUCCESS
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_TRACKS_SUCCESS:
      console.log('load tracks success switch')
      return  Object.assign({}, state, {
        tracks: action.result,
        tracksLoaded: true
      })
    default:
      return state
  }
}
