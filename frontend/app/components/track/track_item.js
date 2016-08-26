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

  onEdit() {
    console.log('on edit')
  }

  render() {
    const id = this.props.track.id;
    const name = this.props.track.name;
    const artist = this.props.track.artist;

    return (
      <div>
        <h1>{artist} – {name} </h1>
        <TrackChannelsList channels={this.props.track.channels} />
        <button onClick={this.onDelete.bind(this)}>Delete post</button>
        <button onClick={this.onEdit.bind(this)}>Edit post</button>
        <Link to={`/track/${id}`}>View</Link>
      </div>
    );
  }
}
