import axios from 'axios';
import OAuth from 'oauth-1.0a'
import moment from 'moment'
import { browserHistory } from 'react-router';
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
} from './types';

const YOUTUBE_API_KEY = 'AIzaSyDQ_kgowJCa-mH5wnjnQ1mOE4nBqQIGij8'

const oauth = OAuth({
    consumer: {
        public: 'ac24c59a7d307088bde16c1954710b3a1be86959',
        secret: 'c517c8175fc5bbfb50adb202ebad7db8c014fcae'
    },
    signature_method: 'HMAC-SHA1'
});

const token = {
    public: '44544de2454973ae18248c12ae5ad70093c03158',
    secret: 'b7728c4a3cd249b170fb43e285875d98226f1792'
};

export function updateSearchTerm(artist, track_name) {
  return {
    type: SEARCH_TERM_UPDATE,
    artist,
    track_name
  };
}

export function searchYoutube( searchTerm ) {
  console.log('search youtube for:', searchTerm)
  const searchTermEncoded = encodeURIComponent(searchTerm)
  return dispatch => {
    dispatch({
      type: YOUTUBE_SEARCH,
      loadingVideos: true,
      meta: {
        loading: true
      }
    });
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${YOUTUBE_API_KEY}&q=${searchTermEncoded}&type=video&maxResults=5`)
      .then(response => {
        dispatch({
          type: YOUTUBE_SEARCH_SUCCESS,
          videos: response.data.items,
          loadingVideos: false,
          preSelected: false,
          meta: {
            loading: false
          }
        });
      })
      .catch(() => {
      });
  }
}

export function searchBeatport( searchTerm ) {
  console.log('search beatport for:', searchTerm)
  const searchTermEncoded = encodeURIComponent(searchTerm)
  const request_data = {
    url: `https://oauth-api.beatport.com/catalog/3/search/?query=${searchTermEncoded}&perPage=20`,
    method: 'GET'
  };
  return dispatch => {
    dispatch({
      type: BEATPORT_SEARCH,
      loadingBeatport: true,
      meta: {
        loading: true
      }
    });
    return axios.get(`https://oauth-api.beatport.com/catalog/3/search/?query=${searchTermEncoded}&perPage=20`, {
      headers: oauth.toHeader(oauth.authorize(request_data, token))
    })
      .then(response => {
        dispatch({
          type: BEATPORT_SEARCH_SUCCESS,
          beatportData: response.data.results,
          loadingBeatport: false,
          meta: {
            loading: false
          }
        });
      })
      .catch(() => {
      });
  }
}


export function clearSearchResults() {
  return {
    type: CLEAR_SEARCH
  };
}

export function updateYoutubeSelectedVideo(video, preSelectedVideo) {
  return {
    type: SELECT_YOUTUBE_VIDEO,
    video,
    preSelectedVideo
  };
}

export function updateBeatportSelectedMetadata(track, preSelectedTrack) {
  return {
    type: SELECT_BEATPORT_TRACK,
    track,
    preSelectedTrack
  };
}

export function loadYoutubeVideoData(video) {
  console.log('load youtube data', video.id.videoId)
  return dispatch => {
    return axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${video.id.videoId}&key=${YOUTUBE_API_KEY}`)
       .then((results) => {
         dispatch({
           type: LOAD_YOUTUBE_VIDEO_DETAILS,
           videoYoutubeDetails: results.data.items[0]
         });
       })
  }
}
