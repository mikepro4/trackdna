import React, {PropTypes} from 'react';

// components
import Channels from './channels'

// actions
import {
  addChannel
} from '../../../actions/analysis'

// utils
import {
  uuid
} from '../../../utils/uuid'

export default class ChannelsContent extends React.Component {
  onAddChannel() {
    const newChannel = {
      id: uuid(),
      name: `Untitled Channel`,
      color: 'default',
      role: '',
      type: '',
      source: '',
      effects: [],
      clips: []
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
