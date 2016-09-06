import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  UPDATE_HOVER_TIME
} from './types';

export function updateHoverTime(hoverTime) {
  return {
    type: UPDATE_HOVER_TIME,
    hoverTime
  };
}
