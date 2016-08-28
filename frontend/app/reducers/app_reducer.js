import {
  LOAD_TRACKS_SUCCESS,
  LOAD_SINGLE_TRACK_SUCCESS
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_TRACKS_SUCCESS:
      console.log('load tracks success switch')
      return  Object.assign({}, state, {
        tracks: action.result,
        tracksLoaded: true
      })
    case LOAD_SINGLE_TRACK_SUCCESS:
      return Object.assign({}, state, {
        currentTrack: action.result,
        singleTrackLoaded: true
      })
    default:
      return state
  }
}
