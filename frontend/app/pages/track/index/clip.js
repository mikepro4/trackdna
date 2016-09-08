import React, {PropTypes} from 'react';
import classNames from 'classnames'

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

  onClipClick() {
    console.log('clip click')
    // fucking mess here but works
    if(this.props.analysis.selectedClip && this.props.analysis.selectedClip.id) {
      if(this.props.clip.id === this.props.analysis.selectedClip.id) {
        this.props.dispatch(selectClip(null))
      } else {
        this.props.dispatch(selectClip(this.props.clip))
      }
    } else {
      this.props.dispatch(selectClip(this.props.clip))
    }
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
      <div style={clipStyle} className={clipClasses} onClick={this.onClipClick.bind(this)}>
        <span className='clip_name'>{this.props.channel.name}</span>
      </div>
    );
  }
}
