import React, {PropTypes} from 'react';
import TrackListItem from './track_item'
import { connect } from 'react-redux'

export default class TrackList extends React.Component {

  renderLoading() {
    const loading = this.props.loading.pending
    if(loading) {
      return (
        <span>Loading...</span>
      )
    } return (
      <span> Content Loaded.</span>
    )
  }

  render() {

    return (
      <div>
        Loading Indicator: {this.renderLoading()}
        {this.props.tracks.map(track => (
          <TrackListItem track={track} {...this.props} key={track.id}/>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state', state)
  return {
    loading: state.loading,
    tracks: state.app.tracks
  };
}

export default connect(mapStateToProps,  {})(TrackList);
