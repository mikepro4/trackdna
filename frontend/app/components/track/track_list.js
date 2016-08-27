import React, {PropTypes} from 'react';
import TrackListItem from './track_item'
import { connect } from 'react-redux'
import Loader from '../loader'

export default class TrackList extends React.Component {
  render() {
    if(this.props.tracks.length === 0) {
      return (
        <div>No Tracks Added</div>
      )
    }

    return (
      <div>
        Loading Indicator: <Loader loading={this.props.loading}/>
        {this.props.tracks.map(track => (
          <TrackListItem track={track} {...this.props} key={track.id}/>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    tracks: state.app.tracks
  };
}

export default connect(mapStateToProps, {})(TrackList);
