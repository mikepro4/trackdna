import React, {PropTypes} from 'react';
import _ from 'lodash'
import classNames from 'classnames'

// components
import Clip from './clip'

// actions
import {
  addClip,
  updateHoverTime
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
  }

  onMouseDown(event) {
    this.calculateWidth(event)
    this.setState({
      startedDragging: true,
      startPercent: this.calculateWidth(event)
    })
  }

  onMouseUp(event) {
    if(this.state.startedDragging) {
      this.calculateWidth(event)
      this.setState({
        startedDragging: false,
        endPercent: this.calculateWidth(event),
        ghostWidth: 0,
        ghostEndPosition: 0
      }, () => {
        this.createClip()
      })
    }
  }

  onMouseLeave(event) {
    this.setState({
      startedDragging: false,
      endPercent: 0,
      ghostWidth: 0,
      ghostEndPosition: 0
    })
    this.props.dispatch(updateHoverTime(null))
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
    } else {
    }
    this.props.dispatch(updateHoverTime(this.calculateHover(event)))
  }

  calculateHover(event) {
    const relX = event.pageX - (this.refs.clip_timeline.offsetLeft + this.refs.clip_timeline.offsetParent.offsetLeft)
    const progressBarPercent = relX * 100 / this.refs.clip_timeline.getBoundingClientRect().width
    const seekSeconds = progressBarPercent * this.props.currentTrack.youtubeLength / 100
    return seekSeconds
  }

  createClip() {
    let {start, end} = 0;

    start = (this.state.endPercent > this.state.startPercent ? this.state.startPercent : this.state.endPercent)
    end = (this.state.endPercent < this.state.startPercent ? this.state.startPercent : this.state.endPercent)

    const newClip = {
      id: uuid(),
      start: start * this.props.currentTrack.youtubeLength / 100,
      end: end * this.props.currentTrack.youtubeLength / 100,
      name: 'Clip Name'
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

    return (
      <div className='clips_timeline'
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseUp={this.onMouseUp.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
        onMouseMove={this.onMouseMove.bind(this)}
        ref='clip_timeline'>

          <div className='ghost_clip' style={ghostStyle}></div>

          {this.props.channel.clips ?
            this.props.channel.clips.map((clip, i) => {
              return (<Clip {...this.props} clip={clip} clipPosition={i} key={i} />)
            })
            : ''
          }

      </div>
    );
  }
}
