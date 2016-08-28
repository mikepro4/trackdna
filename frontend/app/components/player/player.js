import React, {PropTypes} from 'react';
import YouTube from 'react-youtube';
import classNames from 'classNames'
import { updateTrack} from '../../actions/'

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
    console.log('state change')
    if(this.props.videoId.playerAction === 'play') {
      setTimeout(() => this.state.player.playVideo(), 500);
      this.props.dispatch(updateTrack(this.props.videoId.currentVideo, 'idle'))
    } else if (this.props.videoId.playerAction === 'pause') {
      this.props.dispatch(updateTrack(this.props.videoId.currentVideo, 'idle'))
      this.state.player.stopVideo();
    }
  }

  render() {
    console.log('here', this.props.videoId.playerAction)
    const opts = {
      height: '200',
      width: '280'
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
        />
      </div>
    )
  }
}
