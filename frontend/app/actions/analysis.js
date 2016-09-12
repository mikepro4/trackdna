import axios from 'axios';
import { browserHistory } from 'react-router';
import {
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

export function deleteChannel(channel) {
  return {
    type: DELETE_CHANNEL,
    channel
  };
}

export function selectChannel(channel) {
  return {
    type: SELECT_CHANNEL,
    channel
  };
}

export function updateChannel(channel) {
  return {
    type: UPDATE_CHANNEL,
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

export function updateClip(channelId, clip) {
  return {
    type: UPDATE_CLIP,
    channelId,
    clip
  };
}
