import React, {PropTypes} from 'react';
import _ from 'lodash'

// components
import Channel from './channel'

import instruments from '../../../assets/instruments.svg'
import drums from '../../../assets/drums.svg'
import synths from '../../../assets/synths.svg'
import percussion from '../../../assets/percussion.svg'
import vocals from '../../../assets/vocals.svg'
import fx from '../../../assets/fx.svg'
import sampled from '../../../assets/sampled.svg'
import unassigned from '../../../assets/unassigned.svg'
import add from '../../../assets/add.svg'

// actions
import {
  addChannel
} from '../../../actions/analysis'

// utils
import {
  uuid
} from '../../../utils/uuid'

export default class ChannelGroup extends React.Component {
  selectIcon() {
    switch(this.props.group.groupCategory) {
      case('drums'):
        return (drums)
      case('synths'):
        return (synths)
      case('percussion'):
        return (percussion)
      case('vocals'):
        return (vocals)
      case('instruments'):
        return (instruments)
      case('fx'):
        return (fx)
      case('sampled'):
        return (sampled)
      case('unassigned'):
        return (unassigned)
    }
  }

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
      <div className='channel_group'>
        <div className='channel_group_header'>
          <div className='channel_group_title_container'>
            <span className='channel_group_icon'><img src={this.selectIcon()} /></span>
            <h1 className='channel_group_title'>{this.props.group.groupName}</h1>
          </div>
          <button
            className='button button_simple add_channel_button'
            onClick={this.onAddChannel.bind(this)}>
            <span>Add {this.props.group.groupName} Channel</span>
            <img src={add} className='icon icon_add' />
          </button>
        </div>

        {!_.isEmpty(filteredChannels) ?
          filteredChannels.map((channel, i) => (
            <Channel
              {...this.props}
              channel={channel}
              channelPosition={i}
              key={i}
            />
          ))
          : <div className='placeholder_container'>{this.props.group.groupPlaceholder}</div>
        }
      </div>
    );
  }
}
