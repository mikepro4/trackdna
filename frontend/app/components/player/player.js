import React, {PropTypes} from 'react';
import YouTube from 'react-youtube';
import classNames from 'classNames'
import { updateTrack, updateTime } from '../../actions/'

export default class YoutubePlayer extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     player: null
   }
  }

  onReady(event) {
    this.setState({
     player: event.target
    });
  }

  componentDidUpdate(event) {
    if(this.props.videoId.playerAction === 'play') {
      this.props.dispatch(updateTime(0, 0, 0, 0))
      clearInterval(this.state.intervalId);
      setTimeout(() => this.state.player.playVideo(), 500);
      this.startInterval()
      this.props.dispatch(updateTrack(this.props.videoId.currentVideo))
    } else if (this.props.videoId.playerAction === 'pause') {
      clearInterval(this.state.intervalId);
      this.props.dispatch(updateTrack(this.props.videoId.currentVideo))
      this.state.player.pauseVideo();
    } else if (this.props.videoId.playerAction === 'stop') {
      clearInterval(this.state.intervalId);
      this.props.dispatch(updateTrack(this.props.videoId.currentVideo))
      this.state.player.stopVideo();
    } else if (this.props.videoId.playerAction === 'seek') {
      this.state.player.playVideo()

      setTimeout(() => {this.state.player.seekTo(this.props.videoId.seconds);}, 1);
    }
  }

  onPlay(event) {
    const duration = event.target.getDuration()
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration - minutes * 60);
    this.props.dispatch(updateTrack(this.props.videoId.currentVideo, 'play'))
  }

  onPause(event) {
    clearInterval(this.state.intervalId);
    this.props.dispatch(updateTrack(this.props.videoId.currentVideo, 'pause'))
  }

  startInterval() {
    const intervalId = setInterval(() =>{
      const duration = this.state.player.getDuration()
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration - minutes * 60);

      const duration2 = this.state.player.getCurrentTime()
      const minutes2 = Math.floor(duration2 / 60);
      const seconds2 = Math.floor(duration2 - minutes2 * 60);
      this.props.dispatch(updateTrack(this.props.videoId.currentVideo, 'playing', null, duration, minutes2, seconds2))

      this.props.dispatch(updateTime(minutes, seconds, minutes2, seconds2))
    }, 300)

    this.setState({
      intervalId: intervalId
    })
  }

  componentWillUnmount(){
    clearInterval(this.state.intervalId);
  }

  render() {
    const opts = {
      height: '200',
      width: '280',
      playerVars: {
        // controls: 0,
        showinfo: 0,
        modestbranding: 1
      }
    };

    let videoClasses = classNames({
      'video-container': true,
      'video-loaded': this.props.videoId.currentVideo
    })
    return (
      <div className={videoClasses}>
        <YouTube
          videoId={this.props.videoId.currentVideo}
          opts={opts}
          onReady={this.onReady.bind(this)}
          onPlay={this.onPlay.bind(this)}
          onPause={this.onPause.bind(this)}
          // onStateChange={this.onStateChange.bind(this)}
        />
      </div>
    )
  }
}
