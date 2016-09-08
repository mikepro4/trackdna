import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  UPDATE_HOVER_TIME,
  UPDATE_RANGE_TIME,
  ADD_CHANNEL,
  EDIT_CHANNEL,
  DELETE_CHANNEL,
  ADD_CLIP,
  SELECT_CLIP,
  DELETE_CLIP
} from './types';

export function updateHoverTime(hoverTime) {
  return {
    type: UPDATE_HOVER_TIME,
    hoverTime
  };
}

export function updateRangeTime(rangeStart, rangeLength, direction) {
  return {
    type: UPDATE_RANGE_TIME,
    rangeStart, rangeLength, direction
  };
}


// Channels
export function addChannel(channel) {
  return {
    type: ADD_CHANNEL,
    channel
  };
}

export function deleteChannel(channelId) {
  return {
    type: DELETE_CHANNEL,
    channelId
  };
}

export function editChannel(channel) {
  return {
    type: EDIT_CHANNEL,
    channel
  };
}

export function addClip(channelId, clip) {
  return {
    type: ADD_CLIP,
    channelId,
    clip
  };
}

export function selectClip(clip) {
  return {
    type: SELECT_CLIP,
    clip
  };
}

export function deleteClip(clipId, channelId) {
  return {
    type: DELETE_CLIP,
    clipId,
    channelId
  };
}
