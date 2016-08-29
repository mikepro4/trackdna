import axios from 'axios';
import {
  LOAD_TRACKS,
  LOAD_TRACKS_SUCCESS,
  LOAD_SINGLE_TRACK,
  LOAD_SINGLE_TRACK_SUCCESS,
  ADD_TRACK,
  ADD_TRACK_SUCCESS,
  DELETE_TRACK,
  DELETE_TRACK_SUCCESS,
  EDIT_TRACK,
  EDIT_TRACK_SUCCESS,
  CURRENT_TRACK_UPDATE
} from './types';

const ROOT_URL = 'http://localhost:3002';

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
    meta: {
      loading: false
    }
  };
}

export function updateTrack(id, action, seconds, duration, currentMinutes, currentSeconds) {
  return {
    type: CURRENT_TRACK_UPDATE,
    payload: id,
    playerAction: action,
    seconds: seconds,
    duration: duration,
    currentMinutes: currentMinutes,
    currentSeconds: currentSeconds
  };
}

export function loadTracks() {
  console.log('load tracks')
  return dispatch => {
    dispatch({
      type: LOAD_TRACKS,
      meta: {
        loading: true
      }
    })
    try {
      return axios.get(`${ROOT_URL}/tracks`)
        .then(response => {
            dispatch({
              type: LOAD_TRACKS_SUCCESS,
              result: response.data,
              meta: {
                loading: false
              }
            })
          }
        )
        .catch(error => console.log(error));
    } catch (err) {
      console.log('Error', err)
    }
  }
}

export function loadTrack(id) {
  console.log('load track')
  return dispatch => {
    dispatch({
      type: LOAD_SINGLE_TRACK,
      meta: {
        loading: true
      }
    })
    try {
      return axios.get(`${ROOT_URL}/tracks/${id}`)
        .then(response => {
            dispatch({
              type: LOAD_SINGLE_TRACK_SUCCESS,
              result: response.data,
              meta: {
                loading: false
              }
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
    dispatch({
      type: ADD_TRACK,
      meta: {
        loading: true
      }
    })
    return axios.post(`${ROOT_URL}/tracks`, props)
      .then(response => {
          dispatch({
            type: ADD_TRACK_SUCCESS,
            meta: {
              loading: false
            }
          })
        }
      )
      .catch(error => console.log(error));
    }
}

export function editTrack(track) {
  console.log('Edit')
  return dispatch => {
    dispatch({
      type: EDIT_TRACK,
      meta: {
        loading: true
      }
    })
    return axios.post(`${ROOT_URL}/tracks`, track)
      .then(response => {
          dispatch({
            type: EDIT_TRACK_SUCCESS,
            meta: {
              loading: false
            }
          })
        }
      )
      .catch(error => console.log(error));
    }
}

export function deleteTrack(id) {
  return dispatch => {
    console.log('actions id:', id)
    dispatch({
      type: DELETE_TRACK,
      meta: {
        loading: true
      }
    })
    return axios.delete(`${ROOT_URL}/tracks/${id.id}`)
      .then(response => {
          dispatch({
            type: DELETE_TRACK_SUCCESS,
            meta: {
              loading: false
            }
          })
        }
      )
      .catch(error => console.log(error));
  }
}
