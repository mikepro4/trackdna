import axios from 'axios';
import {
  LOAD_TRACKS,
  LOAD_TRACKS_SUCCESS,
  ADD_TRACK
} from './types';

const ROOT_URL = 'http://localhost:3002';

export function loadTracks() {
  console.log('load tracks')
  return dispatch => {

    try {
      return axios.get(`${ROOT_URL}/tracks`)
        .then(response => {
            dispatch({
              type: LOAD_TRACKS_SUCCESS,
              result: response.data
            })
          }
        )
        .catch(error => console.log(error));
    } catch (err) {
      console.log('Error', err)
    }
  }

}

export function addTrack(props) {
  return dispatch => {
    dispatch({ type: ADD_TRACK })
    return axios.post(`${ROOT_URL}/tracks`, props)
  }
}
