import {
  SEARCH_TERM_UPDATE,
  YOUTUBE_SEARCH,
  YOUTUBE_SEARCH_SUCCESS,
  BEATPORT_SEARCH,
  BEATPORT_SEARCH_SUCCESS,
  CLEAR_SEARCH,
  SELECT_YOUTUBE_VIDEO
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
    case SELECT_YOUTUBE_VIDEO:
      return  {...state,
        youtubeSelectedVideo: action.video
      }
    case CLEAR_SEARCH:
      return  {}
    default:
      return state
  }
}
