import {
  UPDATE_TIME
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
      case UPDATE_TIME:
        return  {...state,
          durationMinutes: action.durationMinutes,
          durationSeconds: action.durationSeconds,
          currentMinutes: action.currentMinutes,
          currentSeconds: action.currentSeconds
        }
    default:
      return state
  }
}
