import React, {PropTypes} from 'react';
// actions
import {
  addClip
} from '../../../actions/analysis'

export default class ClipsTimeline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startedDragging: false,
      startPercent: 0,
      endPercent: 0
    }
  }

  calculateWidth(event) {
    const relX = event.pageX - (this.refs.clip_timeline.offsetLeft + this.refs.clip_timeline.offsetParent.offsetLeft)
    const progressBarPercent = relX * 100 / this.refs.clip_timeline.getBoundingClientRect().width
    const seekSeconds = progressBarPercent * this.props.duration / 100
    return progressBarPercent
    // console.log(progressBarPercent)
  }

  onMouseDown(event) {
    this.calculateWidth(event)
    this.setState({
      startedDragging: true,
      startPercent: this.calculateWidth(event)
    })
  }

  onMouseUp(event) {
    this.calculateWidth(event)
    this.setState({
      startedDragging: false,
      endPercent: this.calculateWidth(event)
    }, () => {
      this.createClip()
    })

    // this.createClip()
  }

  onMouseLeave(event) {
    // this.setState({
    //   startedDragging: false,
    //   startPercent: 0,
    //   endPercent: 0
    // })
  }

  calculateClipPosition(seconds) {
    const left = seconds * 100 / this.props.currentTrack.youtubeLength + '%'
    return left
  }

  calculateClipWidth(start, end) {
    const width = (end - start) * 100/ this.props.currentTrack.youtubeLength + '%'
    return width
  }

  createClip() {
    let {start, end} = 0;

    start = (this.state.endPercent > this.state.startPercent ? this.state.startPercent : this.state.endPercent)
    end = (this.state.endPercent < this.state.startPercent ? this.state.startPercent : this.state.endPercent)
    const newClip = {
      id: Math.random(),
      start: start * this.props.currentTrack.youtubeLength / 100,
      end: end * this.props.currentTrack.youtubeLength / 100,
      name: 'Clip 1'
    }
    // this.setState({
    //   startedDragging: false,
    //   startPercent: 0,
    //   endPercent: 0
    // })
    console.log(newClip)
    console.log(this.props.channel.id)
    this.props.dispatch(addClip(this.props.channel.id, newClip))
  }

  render() {
    const style = {
      left: this.state.startPercent + '%',
      width: this.state.endPercent - this.state.startPercent + '%'
    }

    return (
      <div className='clips_timeline'
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseUp={this.onMouseUp.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
        ref='clip_timeline'>

          {/* <div className='clip' style={style}></div> */}
          {this.props.channel.clips ?
            this.props.channel.clips.map((clip, i) => {
              let clipStyle = {
                left: this.calculateClipPosition(clip.start),
                width: this.calculateClipWidth(clip.start, clip.end)
              }
              return (<div key={i} style={clipStyle} className='clip'></div>)
            }
            )
            : ''
          }

      </div>
    );
  }
}
