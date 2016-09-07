import React, {PropTypes} from 'react';
import Channel from './channel'

// actions
import {
  deleteChannel
} from '../../../actions/analysis'

export default class TrackChannels extends React.Component {
  render() {
    return (
      <div className='channels_container'>
        {this.props.analysis.channels ?
          this.props.analysis.channels.map((channel, i) => (
            <Channel
              {...this.props}
              channel={channel}
              channelPosition={i}
              key={i}
            />
          ))
          : ''
        }
      </div>
    );
  }
}
