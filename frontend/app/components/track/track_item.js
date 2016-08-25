import React, {PropTypes} from 'react';
import TrackChannelsList from './track_channels_list'

export default class TrackListItem extends React.Component {
  render() {
    const id = this.props.track.id;
    const name = this.props.track.name;
    const artist = this.props.track.artist;

    return (
      <div>
        <h1>{artist} – {name} </h1>
        <TrackChannelsList channels={this.props.track.channels} />
      </div>
    );
  }
}
