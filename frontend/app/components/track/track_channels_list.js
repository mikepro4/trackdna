import React, {PropTypes} from 'react';
import TrackChannelListItem from './track_channel_item'

export default class TrackChannelsList extends React.Component {
  render() {
    return (
      <div>
        {this.props.channels.map(channel => (
          <TrackChannelListItem channel={channel} key={channel.id} />
        ))}
      </div>
    )
  }
}
