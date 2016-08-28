import {
  CURRENT_TRACK_UPDATE
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case CURRENT_TRACK_UPDATE:
      console.log('update current playing video')
      return  Object.assign({}, state, {
        currentVideo: action.payload,
        playerAction: action.playerAction,
        videoLoaded: true
      })
    default:
      return state
  }
}
