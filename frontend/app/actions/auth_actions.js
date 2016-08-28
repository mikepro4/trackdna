import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  AUTH_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  console.log('signinUser action stuff', { email, password })
  return dispatch => {
    dispatch({
      type: AUTH_USER,
      meta: {
        loading: true
      }
    });
    return axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({
          type: AUTH_USER_SUCCESS,
          meta: {
            loading: false
          }
        });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/home');
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, password }) {
  console.log('signupUser action stuff', { email, password })
  return dispatch => {
    dispatch({
      type: SIGNUP_USER,
      meta: {
        loading: true
      }
    });
    return axios.post(`${ROOT_URL}/signup`, { email, password})
      .then(response => {
        dispatch({
          type: SIGNUP_USER_SUCCESS,
          meta: {
            loading: false
          }
        });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/home');
      })
      .catch(error => {
        dispatch(authError(error.response.data.error))
      });
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  console.log('sign out')
  return { type: UNAUTH_USER };
}
