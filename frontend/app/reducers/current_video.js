import {
  CURRENT_TRACK_UPDATE
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case CURRENT_TRACK_UPDATE:
      return  Object.assign({}, state, {
        currentVideo: action.payload,
        playerAction: action.playerAction,
        videoLoaded: true,
        seconds: action.seconds,
        duration: action.duration,
        currentMinutes: action.currentMinutes,
        currentSeconds: action.currentSeconds
      })
    default:
      return state
  }
}
