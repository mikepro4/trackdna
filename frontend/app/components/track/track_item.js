import React, {PropTypes} from 'react';
import TrackChannelsList from './track_channels_list'
import { deleteTrack, loadTracks} from '../../actions/'
import { connect } from 'react-redux'

@connect(() => ({}))
export default class TrackListItem extends React.Component {
  onDelete() {
    const id = this.props.track.id
    this.props.dispatch(deleteTrack({id}))
      .then((response) => {
        console.log('yay', response.data)
        this.props.dispatch(loadTracks())
      })
      .catch(function (error) {
       console.log(error);
      });
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
      </div>
    );
  }
}
