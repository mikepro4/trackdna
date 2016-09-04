import {
  UPDATE_TIME
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
      case UPDATE_TIME:
        return  {...state,
          duration: action.duration,
          currentTime: action.currentTime || 0,
          playingVideoId: action.playingVideoId
        }
    default:
      return state
  }
}
