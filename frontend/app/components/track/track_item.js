import React, {PropTypes} from 'react';
import TrackChannelsList from './track_channels_list'
import { deleteTrack, loadTracks} from '../../actions/'
import { Link } from 'react-router'

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
      <div className='track_list_item'>
        <h1>{artist} – {name} </h1>
        <TrackChannelsList channels={this.props.track.channels} />
        <ul className='track_actions'>
          <li><a className='button' onClick={this.onDelete.bind(this)}>Delete</a></li>
          <li><Link to={`/track/edit/${id}`} className='button'>Edit</Link></li>
          <li><Link to={`/track/${id}`} className='button'>View</Link></li>
        </ul>
      </div>
    );
  }
}
