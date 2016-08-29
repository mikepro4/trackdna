import React, {PropTypes} from 'react';
import TrackListItem from './track_item'
import { connect } from 'react-redux'
import classnames from 'classnames'

export default class TrackList extends React.Component {
  render() {
    if(this.props.tracks.length === 0) {
      return (
        <div>No Tracks Added</div>
      )
    }

    let classes = classnames({
      'track_list_container': true,
      'loading': this.props.loading.pending
    })

    return (
      <div className={classes}>
        {this.props.tracks.map(track => (
          <TrackListItem track={track} {...this.props} key={track.id}/>
        ))}
      </div>
    )
  }
}
