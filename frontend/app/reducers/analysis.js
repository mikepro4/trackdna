import {
  UPDATE_HOVER_TIME
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
      case UPDATE_HOVER_TIME:
        return  {...state,
          hoverTime: action.hoverTime
        }
    default:
      return state
  }
}
