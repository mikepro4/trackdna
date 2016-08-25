import React, {PropTypes} from 'react';
import TrackListItem from './track_item'

export default class TrackList extends React.Component {

  render() {
    return (
      <div>
        {this.props.tracks.map(track => (
          <TrackListItem track={track} key={track.id}/>
        ))}
      </div>
    )
  }
}
