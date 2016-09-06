import React, {PropTypes} from 'react';

// actions
import {
  addChannel,
  deleteChannel
} from '../../../actions/analysis'

export default class ChannelsInfo extends React.Component {
  onAddChannel() {
    const newChannel = {
      id: Math.random(),
      name: Math.random()
    }

    this.props.dispatch(addChannel([newChannel]))
  }

  onDeleteChannel() {
    this.props.dispatch(deleteChannel(2))
  }

  render() {
    return (
      <div className='channels_info'>
        {/* {this.props.currentTrack.channels.map(channel => (
          <div>{channel.name}</div>
        ))} */}
        {this.props.analysis.channels ?
          this.props.analysis.channels.map((channel, i) => (
            <div key={i} onClick={this.onDeleteChannel.bind(this)}>{channel.name}</div>
          ))
          : ''
        }
        <button className='button' onClick={this.onAddChannel.bind(this)}>Add Channel</button>
      </div>
    );
  }
}
