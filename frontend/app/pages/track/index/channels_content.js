import React, {PropTypes} from 'react';
import _ from 'lodash'

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
    const colors = [
      'default', 'red', 'orange', 'green', 'blue', 'indigo', 'violet'
    ]
    
    const newChannel = {
      id: uuid(),
      name: `Untitled Channel`,
      color: colors[_.random(0, 6)],
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
