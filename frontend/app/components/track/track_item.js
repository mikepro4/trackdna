import React, {PropTypes} from 'react';
import TrackChannelsList from './track_channels_list'
import { deleteTrack, loadTracks, updateCurrentVideo} from '../../actions/'
import { Link } from 'react-router'
import YouTube from 'react-youtube';
import classNames from 'classnames'

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
    this.props.dispatch(updateCurrentVideo(this.props.track.youtubeUrl, 'play'))
  }

  onPause() {
    this.props.dispatch(updateCurrentVideo(this.props.track.youtubeUrl, 'pause'))
  }

  onStop() {
    this.props.dispatch(updateCurrentVideo(this.props.track.youtubeUrl, 'stop'))
  }

  onSeek() {
    this.props.dispatch(updateCurrentVideo(this.props.track.youtubeUrl, 'seek', 30))
  }

  renderPlaying() {
    const {youtubeUrl} = this.props.track
    if(this.props.track.youtubeUrl == this.props.currentVideo.videoId) {
      return (
        <div>
          <div>Youtube Url: {youtubeUrl ? youtubeUrl : '--'}</div>
          <div>Duration: {this.props.time.durationMinutes}:{this.props.time.durationSeconds}</div>
          <div>Current Time: {this.props.time.currentMinutes}:{this.props.time.currentSeconds}</div>
        </div>
      )
    }
  }

  render() {
    const {id, name, artist, channels} = this.props.track

    const activeVideo = this.props.track.youtubeUrl == this.props.currentVideo.videoId

    let controlsClasses = classNames({
      'track_actions': true,
      'play':   !activeVideo || (this.props.currentVideo.playerAction != 'playing') && activeVideo,
      'pause': (this.props.currentVideo.playerAction === 'playing') && activeVideo,
      'stop':  (this.props.currentVideo.playerAction === 'playing') && activeVideo,
      'seek': true
    })
    return (
      <div className='track_list_item'>
        <h1>{artist} – {name} </h1>
        <TrackChannelsList channels={this.props.track.channels} />
        {this.renderPlaying()}
        <ul className={controlsClasses}>
          <li><a className='button' onClick={this.onDelete.bind(this)}>Delete</a></li>
          <li><Link to={`/track/edit/${id}`} className='button'>Edit</Link></li>
          <li><Link to={`/track/${id}`} className='button'>View</Link></li>
          <li className='play'><button onClick={this.onPlay.bind(this)} className='button'>Play</button></li>
          <li className='pause'><button onClick={this.onPause.bind(this)} className='button'>Pause</button></li>
          <li className='stop'><button onClick={this.onStop.bind(this)} className='button'>Stop</button></li>
          <li className='seek'><button onClick={this.onSeek.bind(this)} className='button'>Seek to 0:30</button></li>
        </ul>
      </div>
    );
  }
}
