import React, {PropTypes} from 'react';
import classNames from 'classnames'
import keydown from 'react-keydown'

// actions
import {
  selectClip,
} from '../../../actions/analysis'

export default class Clip extends React.Component {
  calculateClipPosition(seconds) {
    const left = seconds * 100 / this.props.currentTrack.youtubeLength + '%'
    return left
  }

  calculateClipWidth(start, end) {
    const width = (end - start) * 100/ this.props.currentTrack.youtubeLength + '%'
    return width
  }

  onClipClick(event) {
    console.log('clip click')
    // fucking mess here but works
    if(event.target.className !== 'resize_left' && event.target.className !== 'resize_right') {
      if(this.props.analysis.selectedClip && this.props.analysis.selectedClip.id) {
        if(this.props.clip.id === this.props.analysis.selectedClip.id) {
          this.deselectClip()
        } else {
          this.props.dispatch(selectClip(this.props.clip))
        }
      } else {
        this.props.dispatch(selectClip(this.props.clip))
      }
    }
  }

  @keydown('esc')
  deselectClip() {
    this.props.dispatch(selectClip(null))
  }

  render() {
    let clipStyle = {
      left: this.calculateClipPosition(this.props.clip.start),
      width: this.calculateClipWidth(this.props.clip.start, this.props.clip.end)
    }

    let clipClasses = classNames({
      'clip': true,
      'selected_clip': this.props.analysis.selectedClip && this.props.analysis.selectedClip.id ? this.props.clip.id === this.props.analysis.selectedClip.id : false
    })

    // console.log(this.props.channel)
    return (
      <div style={clipStyle} className={clipClasses} onMouseDown={this.onClipClick.bind(this)}>
        {/* <span className='resize_left' onMouseDown={this.props.resizeLeft.bind(this, this.props.clip)}></span> */}
        <span className='clip_name'>{this.props.channel.name}</span>
        {/* <span className='resize_right' onMouseDown={this.props.resizeRight.bind(this, this.props.clip)}></span> */}
      </div>
    );
  }
}
