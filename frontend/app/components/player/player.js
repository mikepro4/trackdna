import React, {PropTypes} from 'react';
import YouTube from 'react-youtube';
import classnames from 'classnames'
import { updateCurrentVideo, updateTime } from '../../actions/'
import axios from 'axios'
import moment from 'moment'

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

  onStateChange(event) {
    clearInterval(this.state.timeInterval);
    if(this.props.currentVideo.videoId != this.props.time.playingVideoId) {
      this.clearTime()
    }
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
    // this.clearTime()
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
    this.state.player.stopVideo();
    this.props.dispatch(updateCurrentVideo(this.props.currentVideo.videoId, 'stopped'))
    this.clearTime()
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
    console.log('onPlay')
    this.setState({ 'timeInterval': null })
    this.props.dispatch(updateCurrentVideo(this.props.currentVideo.videoId, 'playing'))
    this.startTimeInterval()
  }

  onPause(event) {
    console.log('onPause')
    clearInterval(this.state.timeInterval);
    this.props.dispatch(updateCurrentVideo(this.props.currentVideo.videoId, 'paused'))
  }

  startTimeInterval() {
    console.log('start time interval')
    const timeInterval = setInterval(() =>{
      this.props.dispatch(updateTime(
        this.state.player.getDuration(),
        this.state.player.getCurrentTime(),
        this.props.currentVideo.videoId
      ))
    }, 100)

    this.setState({timeInterval})
  }

  componentWillMount() {
    clearInterval(this.state.timeInterval);
  }

  componentWillUnmount(){
    console.log('unmount player')
    clearInterval(this.state.timeInterval);
    this.props.dispatch(updateCurrentVideo(null, 'cleared'))
    this.clearTime()
  }

  clearTime() {
    this.props.dispatch(updateTime(0, 0, null))
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
          onStateChange={this.onStateChange.bind(this)}
        />
      </div>
    )
  }
}
