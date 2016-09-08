import React, {PropTypes} from 'react';
import _ from 'lodash'
import classNames from 'classnames'
import keydown from 'react-keydown'

// components
import Clip from './clip'

// actions
import {
  addClip,
  deleteClip,
  updateHoverTime,
  updateRangeTime
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
      startedEditing: false,
      startPercent: 0,
      endPercent: 0,
      ghostWidth: 0
    }
  }

  @keydown('backspace')
  deleteClip() {
    if(!_.isEmpty(this.props.analysis.selectedClip)) {
      this.props.dispatch(deleteClip(this.props.analysis.selectedClip.id, this.props.channel.id))
      console.log('delete pressed')
    }
  }

  calculateWidth(event) {
    const relX = event.pageX - (this.refs.clip_timeline.offsetLeft + this.refs.clip_timeline.offsetParent.offsetLeft)
    const progressBarPercent = relX * 100 / this.refs.clip_timeline.getBoundingClientRect().width
    return progressBarPercent
  }

  onMouseDown(event) {
    if(
      event.target.className !== 'clip'
      && event.target.className !== 'clip_name'
      && event.target.className !== 'resize_left'
      && event.target.className !== 'resize_right'
    ) {
      this.calculateWidth(event)
      this.setState({
        startedDragging: true,
        startPercent: this.calculateWidth(event)
      })
    }
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
        this.props.dispatch(updateRangeTime(null, null, null))
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
    this.props.dispatch(updateRangeTime(null, null, null))
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
      }, () => {
        let ghostStyle
        if(this.state.ghostDirection === 'left') {
          ghostStyle = {
            width: this.state.ghostWidth * this.props.currentTrack.youtubeLength / 100,
            left: this.state.ghostEndPosition * this.props.currentTrack.youtubeLength / 100
          }
          this.props.dispatch(updateRangeTime(ghostStyle.left, ghostStyle.width, 'left'))
        } else if(this.state.ghostDirection === 'right') {
          ghostStyle = {
            left: this.state.startPercent * this.props.currentTrack.youtubeLength / 100,
            width: this.state.ghostWidth * this.props.currentTrack.youtubeLength / 100
          }
          this.props.dispatch(updateRangeTime(ghostStyle.left, ghostStyle.width, 'right'))
        }
      })
    }

    if(this.state.startedEditing) {
      // console.log('moving and editing')
      // let ghostWidth
      // let ghostDirection = ''
      // let ghostEndPosition = 0
      //
      // ghostWidth = this.state.startPercent - endPosition
      // ghostEndPosition = endPosition
      //
      // this.setState({
      //   ghostWidth: ghostWidth,
      //   ghostDirection: 'right',
      //   ghostEndPosition: ghostEndPosition
      // })
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

  resizeLeft(clip) {
    console.log('left', clip)
  }
  resizeRight(clip) {
    console.log('right', clip)
    this.setState({
      startedEditing: true,
      startPercent: clip.start * 100 / this.props.currentTrack.youtubeLength + '%'
    })
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
              return (
                <Clip {...this.props}
                  clip={clip}
                  resizeLeft={this.resizeLeft.bind(this)}
                  resizeRight={this.resizeRight.bind(this)}
                  clipPosition={i}
                  key={i} />
                )
            })
            : ''
          }

      </div>
    );
  }
}
