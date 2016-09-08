import React, {PropTypes} from 'react';

import ClipsTimeline from './clips_timeline'
import MomentsTimeline from './moments_timeline'

// actions
import {
  deleteChannel
} from '../../../actions/analysis'

export default class Channel extends React.Component {

  onDeleteChannel() {
    this.props.dispatch(deleteChannel(this.props.channelPosition))
  }

  render() {
    return (
      <div className='channel_container'>

        <div className='channel_top_container'>

          <div className='channel_name'>
            {this.props.channel.name}
            <button className='button' onClick={this.onDeleteChannel.bind(this)}>Delete channel</button>
          </div>

          <div className='channel_content'>
            <ClipsTimeline {...this.props} />
            <MomentsTimeline {...this.props} />
          </div>

        </div>

      </div>);
  }
}
