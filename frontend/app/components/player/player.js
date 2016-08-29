import React, {PropTypes} from 'react';
import YouTube from 'react-youtube';
import classnames from 'classnames'
import { updateCurrentVideo, updateTime } from '../../actions/'

export default class YoutubePlayer extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     player: null,
     timeInterval: null
   }
  }

  onReady(event) {
    this.setState({
      player: event.target
    });
  }

  componentDidUpdate(event) {
    switch(this.props.currentVideo.playerAction) {
      case 'play':
        return this.playVideo()
      case 'pause':
        return this.pauseVideo()
      case 'stop':
        return this.stopVideo()
      case 'seek':
        return this.seekVideo()
    }
  }

  playVideo() {
    console.log('play video')
    clearInterval(this.state.timeInterval);
    this.props.dispatch(updateTime(0, 0, 0, 0))
    this.props.dispatch(updateCurrentVideo(this.props.currentVideo.videoId, 'waiting'))

    // fake delay needed for the video switch
    setTimeout(() => {
      this.state.player.playVideo()
      this.props.dispatch(updateCurrentVideo(this.props.currentVideo.videoId, 'playing'))
    }, 1);
  }

  pauseVideo() {
    console.log('pause video')
    this.state.player.pauseVideo();
  }

  stopVideo() {
    console.log('stop video')
    clearInterval(this.state.timeInterval);
    this.state.player.stopVideo();
    this.props.dispatch(updateCurrentVideo(this.props.currentVideo.videoId, 'stopped'))
    this.props.dispatch(updateTime(0, 0, 0, 0))
  }

  seekVideo() {
    console.log('seek to')
    clearInterval(this.state.timeInterval);
    const seekToSeconds = this.props.currentVideo.seconds
    this.playVideo()

    // fake delay needed for the video switch/seek
    setTimeout(() => {
      this.state.player.seekTo(seekToSeconds)
    }, 2);
  }

  onPlay(event) {
    this.props.dispatch(updateCurrentVideo(this.props.currentVideo.videoId, 'playing'))
    this.startTimeInterval()
  }

  onPause(event) {
    clearInterval(this.state.timeInterval);
    this.props.dispatch(updateCurrentVideo(this.props.currentVideo.videoId, 'paused'))
  }

  startTimeInterval() {
    console.log('start time interval')
    const timeInterval = setInterval(() =>{
      const duration = this.state.player.getDuration()
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration - minutes * 60);

      const duration2 = this.state.player.getCurrentTime()
      const minutes2 = Math.floor(duration2 / 60);
      let seconds2 = Math.floor(duration2 - minutes2 * 60);
      this.props.dispatch(updateTime(minutes, seconds, minutes2, seconds2))
    }, 100)

    this.setState({timeInterval})
  }


  componentWillUnmount(){
    clearInterval(this.state.timeInterval);
    this.props.dispatch(updateCurrentVideo(null, 'cleared'))
    this.props.dispatch(updateTime(0, 0, 0, 0))
  }

  render() {
    const videoPlayerOptions = {
      height: '200',
      width: '280',
      playerVars: {
        // controls: 0,
        showinfo: 0,
        modestbranding: 1
      }
    };

    let videoClasses = classnames({
      'video-container': true,
      'video-loaded': this.props.currentVideo.videoId
    })

    return (
      <div className={videoClasses}>
        <YouTube
          videoId={this.props.currentVideo.videoId}
          opts={videoPlayerOptions}
          onReady={this.onReady.bind(this)}
          onPlay={this.onPlay.bind(this)}
          onPause={this.onPause.bind(this)}
        />
      </div>
    )
  }
}
