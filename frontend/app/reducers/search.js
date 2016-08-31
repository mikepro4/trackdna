import {
  SEARCH_TERM_UPDATE,
  YOUTUBE_SEARCH,
  YOUTUBE_SEARCH_SUCCESS,
  BEATPORT_SEARCH,
  BEATPORT_SEARCH_SUCCESS,
  CLEAR_SEARCH,
  SELECT_YOUTUBE_VIDEO,
  SELECT_BEATPORT_TRACK,
  LOAD_YOUTUBE_VIDEO_DETAILS
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case SEARCH_TERM_UPDATE:
      return  {...state,
        artist: action.artist,
        track_name: action.track_name
      }
    case YOUTUBE_SEARCH:
      return  {...state,
        loadingVideos: action.loadingVideos
      }
    case YOUTUBE_SEARCH_SUCCESS:
      return  {...state,
        videos: action.videos,
        loadingVideos: action.loadingVideos
      }
    case BEATPORT_SEARCH_SUCCESS:
      return  {...state,
        beatportData: action.beatportData,
        loadingBeatport: action.loadingBeatport
      }
    case SELECT_YOUTUBE_VIDEO:
      return  {...state,
        youtubeSelectedVideo: action.video,
        preSelectedVideo: action.preSelectedVideo
      }
    case SELECT_BEATPORT_TRACK:
      return  {...state,
        beatportSelectedTrack: action.track,
        preSelectedTrack: action.preSelectedTrack
      }
    case LOAD_YOUTUBE_VIDEO_DETAILS:
      return {...state,
        videoYoutubeDetails: action.videoYoutubeDetails
      }
    case CLEAR_SEARCH:
      return  {}
    default:
      return state
  }
}
