import axios from 'axios';
import OAuth from 'oauth-1.0a'
import { browserHistory } from 'react-router';
import {
  SEARCH_TERM_UPDATE,
  YOUTUBE_SEARCH,
  YOUTUBE_SEARCH_SUCCESS,
  BEATPORT_SEARCH,
  BEATPORT_SEARCH_SUCCESS,
  CLEAR_SEARCH,
  SELECT_YOUTUBE_VIDEO,
  SELECT_BEATPORT_TRACK
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
  const searchTermEncoded = encodeURI(searchTerm)
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
        // dispatch(authError('Bad Login Info'));
      });
  }
}

export function searchBeatport( searchTerm ) {
  console.log('search beatport for:', searchTerm)
  const searchTermEncoded = encodeURI(searchTerm)
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
    return axios.get(`https://oauth-api.beatport.com/catalog/3/search/?query=${searchTermEncoded}&perPage=20`, {headers: oauth.toHeader(oauth.authorize(request_data, token))})
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
        // dispatch(authError('Bad Login Info'));
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

//
// export function signupUser({ email, password }) {
//   console.log('signupUser action stuff', { email, password })
//   return dispatch => {
//     dispatch({
//       type: SIGNUP_USER,
//       meta: {
//         loading: true
//       }
//     });
//     return axios.post(`${ROOT_URL}/signup`, { email, password})
//       .then(response => {
//         dispatch({
//           type: SIGNUP_USER_SUCCESS,
//           meta: {
//             loading: false
//           }
//         });
//         localStorage.setItem('token', response.data.token);
//         browserHistory.push('/home');
//       })
//       .catch(error => {
//         dispatch(authError(error.response.data.error))
//       });
//   }
// }
//
// export function signoutUser() {
//   localStorage.removeItem('token');
//   console.log('sign out')
//   return { type: UNAUTH_USER };
// }
