import React, {PropTypes} from 'react';
import PlayerControls from './player_controls'
import Timeline from './timeline'
import { updateCurrentVideo } from '../../actions/'
import { updateHoverTime } from '../../actions/analysis'
import { formatTime } from '../../utils/time_formatter'

export default class ProgressBarPlayer extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     hoverWidth: 0
   }
  }

  handlePorgressBarClick(event) {
    const relX = event.pageX - (this.refs.progress_bar_container.offsetLeft + this.refs.progress_bar_container.offsetParent.offsetLeft)
    const progressBarPercent = relX * 100 / this.refs.progress_bar_container.getBoundingClientRect().width
    const seekSeconds = progressBarPercent * this.props.duration / 100
    this.props.dispatch(updateCurrentVideo(this.props.currentVideo.videoId, 'seek', seekSeconds))
  }

  calculateWidth(event) {
    const relX = event.pageX - (this.refs.progress_bar_container.offsetLeft + this.refs.progress_bar_container.offsetParent.offsetLeft)
    const progressBarPercent = relX * 100 / this.refs.progress_bar_container.getBoundingClientRect().width
    const seekSeconds = progressBarPercent * this.props.duration / 100
    return seekSeconds
  }

  onMouseMove(event) {
    this.setState({
      hoverWidth: this.calculateWidth(event) * 100 / this.props.duration + '%'
    })

    this.props.dispatch(updateHoverTime(this.calculateWidth(event)))
  }

  onMouseLeave(event) {
    this.setState({
      hoverWidth: 0
    })
    this.props.dispatch(updateHoverTime(null))
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
      left: this.props.analysis.hoverTime * 100 / this.props.duration + '%'
    }

    const progressBarHoverWidth = {
      width: this.state.hoverWidth
    }

    const rangeHighlightStyles = {
      left: this.props.analysis.rangeStart * 100 / this.props.duration + '%',
      width: this.props.analysis.rangeLength * 100 / this.props.duration + '%'
    }

    return (
      <div className='progress_bar_player_container'>

        <Timeline {...this.props} />

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
              (this.props.waveformId) ?
              (<img
                src={`http://geo-media.beatport.com/image_size/1850x250/${this.props.waveformId}.png`}
                ref='wave'
                className='beatport_wave'
              />)
              : ''
            }
            <div className='range_highlight' style={rangeHighlightStyles}></div>
        </div>
      </div>
    );
  }
}
