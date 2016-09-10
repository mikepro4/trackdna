import {
  LOAD_SINGLE_TRACK_SUCCESS,
  UPDATE_HOVER_TIME,
  UPDATE_RANGE_TIME,
  ADD_CHANNEL,
  UPDATE_CHANNEL,
  DELETE_CHANNEL,
  SELECT_CHANNEL,
  ADD_CLIP,
  SELECT_CLIP,
  DELETE_CLIP,
  UPDATE_CLIP
} from '../actions/types'
import update from 'react/lib/update'
import _ from 'lodash'

export default (state = {}, action) => {
  switch (action.type) {
      case UPDATE_HOVER_TIME:
        return  {...state,
          hoverTime: action.hoverTime
        }
      case UPDATE_RANGE_TIME:
        return  {...state,
          rangeStart: action.rangeStart,
          rangeLength: action.rangeLength,
          direction: action.direction
        }
      case LOAD_SINGLE_TRACK_SUCCESS:
        return {... state,
          channels: action.result.channels,
        }

      case ADD_CHANNEL:
        return update(state, {
          channels: {$push: action.channel}
        })
      case SELECT_CHANNEL:
        return {... state,
          selectedChannel: action.channel || {},
        }
      case UPDATE_CHANNEL:
        let channeltoUpdateIndex = _.findIndex(state.channels,  {id: action.channel.id})
        return update(state, {
          channels: {$splice: [[channeltoUpdateIndex, 1, action.channel]]}
        })
      case UPDATE_CLIP:
        let channelToUpdateNow = _.find(state.channels, {id: action.channelId})
        let filteredClipYo = _.filter(channelToUpdateNow.clips, (clip) => {
          return (clip.id === action.clip.id)
        })

        const clipEnd = action.clip.end
        const clipStart = action.clip.start
        let updatedClipYo = {...filteredClipYo[0],
          end: clipEnd,
          start: clipStart
        }

        let clipToFilterIndexYo = _.findIndex(channelToUpdateNow.clips,  {id: action.clip.id})
        let updatedChannelYo = update(channelToUpdateNow, {
          clips: {$splice: [[clipToFilterIndexYo, 1, updatedClipYo]]}
        })
        // console.log(updatedChannelYo)
        // let channelToUpdate = _.find(state.channels, {id: action.channelId})
        // let channelUpdatedClip = update(channelToUpdate, {
        //   clips: {$splice: [action.clip]}
        // })
        let channelsToFilterIndexYo = _.findIndex(state.channels,  {id: action.channelId})

        return update(state, {
          channels: {$splice: [[channelsToFilterIndexYo, 1, updatedChannelYo]]}
        })
      case DELETE_CHANNEL:
        return update(state, {
          channels: {$splice: [[action.channelId, 1]]}
        })
      case SELECT_CLIP:
        return {... state,
          selectedClip: action.clip || {},
        }
      case DELETE_CLIP:
        let channeltoFilter = _.find(state.channels, {id: action.channelId})
        let channelFilterdClips = _.filter(channeltoFilter.clips, (clip) => {
          return (clip.id != action.clipId)
        })
        channeltoFilter.clips = channelFilterdClips
        let channeltoFilterIndex = _.findIndex(state.channels,  {id: action.channelId})
        return update(state, {
          channels: {$splice: [[channeltoFilterIndex, 1, channeltoFilter]]}
        })
      case ADD_CLIP:
        let channel = _.find(state.channels, {id: action.channelId})
        let newChannel = update(channel, {
          clips: {$push: [action.clip]}
        })

        let newClipStart = action.clip.start
        let newClipEnd = action.clip.end

        // filter completely overlapping clips
        const filteredClips = _.filter(channel.clips, (clip) => {
          let start = clip.start
          let end = clip.end

          const startInRange = (start > newClipStart && start < newClipEnd)
          const endInRange = (end > newClipStart && end < newClipEnd)

          let inRange = (startInRange && endInRange ? true : false)

          return !inRange
        })

        // trim partially overlapping clips
        const updatedChannelClips = _.map(filteredClips, (clip) => {
          let start = clip.start
          let end = clip.end
          // console.log(newClipStart < clip.end)
          if(newClipStart > start && newClipStart < end) {
            let diff = clip.end - newClipStart
            end = clip.end - diff
          }
          if(newClipEnd > start && newClipEnd < end) {
            if(newClipEnd > clip.start) {
              let diff = newClipEnd - clip.start
              start = clip.start + diff
            }
          }

          return {
            ...clip,
            start: start,
            end: end
          }
        })

        channel.clips = updatedChannelClips

        let newChannelNewClip = update(channel, {
          clips: {$push: [action.clip]}
        })

        let index = _.findIndex(state.channels,  {id: action.channelId})
        return update(state, {
          channels: {$splice: [[index, 1, newChannelNewClip]]}
        })
    default:
      return state
  }
}
