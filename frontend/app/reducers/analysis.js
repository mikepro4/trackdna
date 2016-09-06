import {
  LOAD_SINGLE_TRACK_SUCCESS,
  UPDATE_HOVER_TIME,
  ADD_CHANNEL,
  EDIT_CHANNEL,
  DELETE_CHANNEL
} from '../actions/types'
import update from 'react/lib/update'

export default (state = {}, action) => {
  switch (action.type) {
      case UPDATE_HOVER_TIME:
        return  {...state,
          hoverTime: action.hoverTime
        }
      case LOAD_SINGLE_TRACK_SUCCESS:
        return {... state,
          channels: action.result.channels,
        }

      case ADD_CHANNEL:
        return update(state, {
          channels: {$push: action.channel}
        })
      case DELETE_CHANNEL:
        return update(state, {
          channels: {$splice: [[action.channelId, 1]]}
        })
    default:
      return state
  }
}
