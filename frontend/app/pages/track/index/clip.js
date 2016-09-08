import React, {PropTypes} from 'react';

export default class Clip extends React.Component {
  calculateClipPosition(seconds) {
    const left = seconds * 100 / this.props.currentTrack.youtubeLength + '%'
    return left
  }

  calculateClipWidth(start, end) {
    const width = (end - start) * 100/ this.props.currentTrack.youtubeLength + '%'
    return width
  }

  render() {
    let clipStyle = {
      left: this.calculateClipPosition(this.props.clip.start),
      width: this.calculateClipWidth(this.props.clip.start, this.props.clip.end)
    }
    console.log(this.props.channel)
    return (
      <div style={clipStyle} className='clip'>
        <span className='clip_name'>{this.props.channel.name}</span>
      </div>
    );
  }
}
