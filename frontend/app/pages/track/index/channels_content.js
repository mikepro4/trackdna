import React, {PropTypes} from 'react';

// components
import Channels from './channels'

// actions
import {
  addChannel
} from '../../../actions/analysis'

export default class ChannelsContent extends React.Component {
  onAddChannel() {
    const newChannel = {
      id: Math.random(),
      name: `Untitled Channel ${Math.random()}`
    }

    this.props.dispatch(addChannel([newChannel]))
  }

  render() {
    return (
      <div className='channels_content'>
        <Channels {...this.props} />
        <button className='button add_channel_button' onClick={this.onAddChannel.bind(this)}>+ Add Channel</button>
      </div>
    );
  }
}
