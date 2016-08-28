import React, {PropTypes} from 'react';
import TrackChannelsList from './track_channels_list'
import { deleteTrack, loadTracks, updateTrack} from '../../actions/'
import { Link } from 'react-router'
import YouTube from 'react-youtube';

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

  onPlay() {
    this.props.dispatch(updateTrack(this.props.track.youtubeUrl, 'play'))
  }

  onPause() {
    this.props.dispatch(updateTrack(this.props.track.youtubeUrl, 'pause'))
  }

  onStop() {
    this.props.dispatch(updateTrack(this.props.track.youtubeUrl, 'stop'))
  }

  onSeek() {
    this.props.dispatch(updateTrack(this.props.track.youtubeUrl, 'seek', 30))
  }

  render() {
    const {id, name, artist, channels, youtubeUrl} = this.props.track
    return (
      <div className='track_list_item'>
        <h1>{artist} – {name} </h1>
        <TrackChannelsList channels={this.props.track.channels} />
        Youtube Url: {youtubeUrl ? youtubeUrl : '--'}
        <ul className='track_actions'>
          <li><a className='button' onClick={this.onDelete.bind(this)}>Delete</a></li>
          <li><Link to={`/track/edit/${id}`} className='button'>Edit</Link></li>
          <li><Link to={`/track/${id}`} className='button'>View</Link></li>
          <li><button onClick={this.onPlay.bind(this)} className='button'>Play</button></li>
          <li><button onClick={this.onPause.bind(this)} className='button'>Pause</button></li>
          <li><button onClick={this.onStop.bind(this)} className='button'>Stop</button></li>
          <li><button onClick={this.onSeek.bind(this)} className='button'>Seek to 0:30</button></li>
        </ul>
      </div>
    );
  }
}
