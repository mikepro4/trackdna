import React, {PropTypes} from 'react';
import PlayerControls from './player_controls'
import { updateCurrentVideo } from '../../actions/'
import { formatTime } from '../../utils/time_formatter'

export default class ProgressBarPlayer extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     hoverWidth: 0
   }
  }

  handlePorgressBarClick(event) {
    const relX = event.pageX - this.refs.progress_bar_container.offsetLeft
    const progressBarPercent = relX * 100 / this.refs.progress_bar_container.getBoundingClientRect().width
    const seekSeconds = progressBarPercent * this.props.duration / 100
    this.props.dispatch(updateCurrentVideo(this.props.currentVideo.videoId, 'seek', seekSeconds))
  }

  calculateWidth(event) {
    const relX = event.pageX - this.refs.progress_bar_container.offsetLeft
    const progressBarPercent = relX * 100 / this.refs.progress_bar_container.getBoundingClientRect().width
    const seekSeconds = progressBarPercent * this.props.duration / 100
    return seekSeconds
  }

  onMouseMove(event) {
    this.setState({
      hoverWidth: this.calculateWidth(event) * 100 / this.props.duration + '%'
    })
  }

  onMouseLeave(event) {
    this.setState({
      hoverWidth: 0
    })
  }

  render() {
    const total = formatTime(this.props.duration)
    const current = formatTime(this.props.time.currentTime)
    const progressBarWidth = {
      width: this.props.time.currentTime * 100 / this.props.duration + '%'
    }

    const cursor = {
      left: this.props.time.currentTime * 100 / this.props.duration + '%'
    }

    const cursorHover = {
      left: this.state.hoverWidth
    }

    const progressBarHoverWidth = {
      width: this.state.hoverWidth
    }

    return (
      <div className='progress_bar_player_container'>

        <div className='player_top_bar'>
          <PlayerControls {...this.props} />
          <div className='player_time_container'>
            <span className='current_time'>{current}</span>
            <span className='time_divider'> / </span>
            <span className='total_time'>{total}</span>
          </div>
        </div>

        <div className='player_time_wrapper'
          onClick={this.handlePorgressBarClick.bind(this)}
          onMouseMove={this.onMouseMove.bind(this)}
          onMouseLeave ={this.onMouseLeave.bind(this)}
          ref='progress_bar_container'>

          <div className='progress_bar_wrapper' >
            <div className='progress_bar' style={progressBarWidth}></div>
            <div className='progress_bar_hover' style={progressBarHoverWidth}></div>
          </div>

            <div className='cursor playing' style={cursor} ></div>
            <div className='cursor hover' style={cursorHover}></div>
            {
              this.props.search.beatportSelectedTrack ?
              (<img
                src={`http://geo-media.beatport.com/image_size/2000x250/${this.props.search.beatportSelectedTrack.dynamicImages.waveform.id}.png`}
                ref='wave'
                className='beatport_wave'
              />)
              : ''
            }
        </div>
      </div>
    );
  }
}
