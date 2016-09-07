import {
  LOAD_SINGLE_TRACK_SUCCESS,
  UPDATE_HOVER_TIME,
  ADD_CHANNEL,
  EDIT_CHANNEL,
  DELETE_CHANNEL,
  ADD_CLIP
} from '../actions/types'
import update from 'react/lib/update'
import _ from 'lodash'

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
      case ADD_CLIP:
        let channel = _.find(state.channels, {id: action.channelId})
        let newChannel = update(channel, {
          clips: {$push: [action.clip]}
        })

        let index = _.findIndex(state.channels,  {id: action.channelId})
        return update(state, {
          channels: {$splice: [[index, 1, newChannel]]}
        })
      case DELETE_CHANNEL:
        return update(state, {
          channels: {$splice: [[action.channelId, 1]]}
        })
    default:
      return state
  }
}
