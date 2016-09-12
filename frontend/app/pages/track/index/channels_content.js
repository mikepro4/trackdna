import React, {PropTypes} from 'react';
import _ from 'lodash'

// components
import Channels from './channels'
import ChannelGroup from './channel_group'


export default class ChannelsContent extends React.Component {
  render() {

    let channelGroups = [
      {
        id: 1,
        groupName: 'Drums',
        groupCategory: 'drums',
        groupPlaceholder: 'Add Kick, Snare, Cymbals and other drum channels here...'
      },
      {
        id: 2,
        groupName: 'Synths',
        groupCategory: 'synths',
        groupPlaceholder: 'Add Bass, Leads, Pads and other synths channels here...'
      },
      {
        id: 3,
        groupName: 'Percussion',
        groupCategory: 'percussion',
        groupPlaceholder: 'Add Shakers, Claves, Rims and other percussion channels here...'
      },
      {
        id: 4,
        groupName: 'Vocals',
        groupCategory: 'vocals',
        groupPlaceholder: 'Add original Vocals, Rap, Vocal Effects and other vocals channels here…'
      },
      {
        id: 5,
        groupName: 'Instruments',
        groupCategory: 'instruments',
        groupPlaceholder: 'Add Guitar, Piano, Strings and other musical unstruments channels here...'
      },
      {
        id: 6,
        groupName: 'FX',
        groupCategory: 'fx',
        groupPlaceholder: 'Add Risers, Sweeps, White Noise and other FX channels here...'
      },
      {
        id: 7,
        groupName: 'Sampled',
        groupCategory: 'sampled',
        groupPlaceholder: 'Add Sampled Effects, Melodies, Vocals and other sampled channels here...'
      },
      {
        id: 8,
        groupName: 'Unassigned Group',
        groupCategory: 'unassigned'
      }
    ]

    return (
      <div className='channels_content'>
        {channelGroups.map((group, i) => (
            <ChannelGroup
              {...this.props}
              group={group}
              groupPosition={i}
              key={i}
            />
          ))
        }
        {/* <Channels {...this.props} />
        <button className='button add_channel_button' onClick={this.onAddChannel.bind(this)}>+ Add Channel</button> */}
      </div>
    );
  }
}
