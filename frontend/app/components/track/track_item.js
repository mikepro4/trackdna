import React, {PropTypes} from 'react';
import TrackChannelsList from './track_channels_list'
import { deleteTrack, loadTracks} from '../../actions/'
import { connect } from 'react-redux'
import { Link } from 'react-router'

@connect(() => ({}))
export default class TrackListItem extends React.Component {
  onDelete() {
    const id = this.props.track.id
    this.props.dispatch(deleteTrack({id}))
      .then((response) => {
        this.props.dispatch(loadTracks())
      })
      .catch(function (error) {
       console.log(error);
      });
  }

  render() {
    const {id, name, artist, channels} = this.props.track
    return (
      <div>
        <h1>{artist} – {name} </h1>
        <TrackChannelsList channels={this.props.track.channels} />
        <button onClick={this.onDelete.bind(this)}>Delete post</button>
        <Link to={`/track/edit/${id}`}>Edit</Link>
        <Link to={`/track/${id}`}>View</Link>
      </div>
    );
  }
}
