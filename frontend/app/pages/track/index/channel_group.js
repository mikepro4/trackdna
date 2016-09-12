import React, {PropTypes} from 'react';
import _ from 'lodash'

// components
import Channel from './channel'

// actions
import {
  addChannel
} from '../../../actions/analysis'

// utils
import {
  uuid
} from '../../../utils/uuid'

export default class ChannelGroup extends React.Component {
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
      groupCategory: this.props.group.groupCategory,
      clips: []
    }

    this.props.dispatch(addChannel([newChannel]))
  }

  render() {
    let filteredChannels = _.filter(this.props.analysis.channels, (channel) => {
      let noGroup = _.isEmpty(channel.groupCategory) && (this.props.group.groupCategory === 'unassigned')
      let currentGroup = (channel.groupCategory === this.props.group.groupCategory)
      return noGroup || currentGroup
    })
    return (
      <div>
        <h1>{this.props.group.groupName}</h1>
        <button className='button add_channel_button' onClick={this.onAddChannel.bind(this)}>+ Add {this.props.group.groupName} Channel</button>
        {!_.isEmpty(filteredChannels) ?
          filteredChannels.map((channel, i) => (
            <Channel
              {...this.props}
              channel={channel}
              channelPosition={i}
              key={i}
            />
          ))
          : this.props.group.groupPlaceholder
        }
      </div>
    );
  }
}
