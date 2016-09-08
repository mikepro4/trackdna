import React, {PropTypes} from 'react';
import _ from 'lodash'
import classNames from 'classnames'

// actions
import {
  addClip
} from '../../../actions/analysis'

// utils
import {
  uuid
} from '../../../utils/uuid'

export default class ClipsTimeline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startedDragging: false,
      startPercent: 0,
      endPercent: 0,
      ghostWidth: 0
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
      endPercent: this.calculateWidth(event),
      ghostWidth: 0,
      ghostEndPosition: 0
    }, () => {
      this.createClip()
    })

    // this.createClip()
  }

  onMouseLeave(event) {
    this.setState({
      ghostWidth: 0
    })
  }


  onMouseMove(event) {
    if(this.state.startedDragging) {
      // console.log(this.calculateWidth(event))
      let ghostWidth
      let ghostDirection = ''
      let ghostEndPosition = 0
      const endPosition = this.calculateWidth(event)

      if(endPosition > this.state.startPercent) {
        ghostWidth = endPosition - this.state.startPercent
        ghostDirection = 'right'
      } else {
        ghostWidth = this.state.startPercent - endPosition
        ghostEndPosition = endPosition
        ghostDirection = 'left'
      }

      // console.log(ghostWidth)
      this.setState({
        ghostWidth: ghostWidth,
        ghostDirection: ghostDirection,
        ghostEndPosition: ghostEndPosition
      })
    }
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
      id: uuid(),
      start: start * this.props.currentTrack.youtubeLength / 100,
      end: end * this.props.currentTrack.youtubeLength / 100,
      name: 'Clip 1'
    }

    if((end * this.props.currentTrack.youtubeLength / 100-start * this.props.currentTrack.youtubeLength / 100)>1) {
      this.props.dispatch(addClip(this.props.channel.id, newClip))
    }
  }

  render() {
    let ghostStyle = {}
    if(this.state.ghostDirection === 'left') {
      ghostStyle = {
        width: this.state.ghostWidth + '%',
        left: this.state.ghostEndPosition + '%'
      }
    } else if(this.state.ghostDirection === 'right') {
      ghostStyle = {
        left: this.state.startPercent + '%',
        width: this.state.ghostWidth + '%'
      }
    }


    // let ghostClasses = classNames({
    //   ghost_clip: true
    // })

    return (
      <div className='clips_timeline'
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseUp={this.onMouseUp.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
        onMouseMove={this.onMouseMove.bind(this)}
        ref='clip_timeline'>

          <div className='ghost_clip' style={ghostStyle}></div>

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
