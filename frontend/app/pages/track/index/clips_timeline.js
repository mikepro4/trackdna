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
  selectClip,
  updateHoverTime,
  updateRangeTime,
  updateClip
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
      startedMoving: false,
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
    console.log(event.target.className )
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
    } else if (event.target.className == 'clip' || event.target.className == 'clip_name') {
      this.setState({
        startedMoving: true,
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
        ghostEndPosition: 0,
      }, () => {
        this.createClip()
        this.props.dispatch(updateRangeTime(null, null, null))
      })
    }

    this.setState({
      startedEditing: false,
      startedEditingLeft: false,
      startedEditingRight: false,
      startedMoving: false
      // startPercent: this.calculateWidth(event),
      // startedDragging: false,
      // ghostWidth: 0,
      // ghostEndPosition: 0,
      // endPercent: 0
    })

    if(this.state.newClip) {
      this.props.dispatch(selectClip(this.state.newClip))
    }
  }

  onMouseLeave(event) {
    this.setState({
      startedDragging: false,
      startedEditing: false,
      startedMoving: false,
      startPercent: 0,
      endPercent: 0,
      ghostWidth: 0,
      ghostEndPosition: 0,
      startedEditingLeft: false,
      startedEditingRight: false
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
        const endPosition = this.calculateWidth(event)

        let newClip = {};
        if(endPosition < this.state.startPercent) {
          console.log('end is less then start')
          this.setState({
            startedEditingLeft: true,
            startedEditingRight: false
          })
          newClip = {
            id: this.state.clip.id,
            start: this.calculateHover(event),
            end: this.state.clip.end,
          }
        } else if(endPosition > this.state.startPercent) {

          if(this.state.startedEditingLeft) {
            newClip = {
              id: this.state.clip.id,
              start: this.calculateHover(event),
              end: this.state.clip.end,
            }
          } else {
            console.log('end is more then start')

            newClip = {
              id: this.state.clip.id,
              start: this.state.clip.start,
              end: this.calculateHover(event),
            }
          }

        }


        console.log( this.state.clip)
        if(newClip.start && newClip.end) {
          this.props.dispatch(selectClip(newClip))
          this.props.dispatch(updateClip(this.props.channel.id, newClip))
          this.setState({
            newClip
          })
        }
      }

    if(this.state.startedMoving) {
      console.log('moving clip')
      const endPosition = this.calculateWidth(event)

      let newClip = {};
      if(endPosition < this.state.startPercent) {
        const percentDiff = this.state.startPercent - endPosition
        const diff = percentDiff * this.props.currentTrack.youtubeLength / 100
        // const clipStart = this.props.analysis.selectedClip.start - diff;
        newClip = {
          id: this.props.analysis.selectedClip.id,
          start: this.props.analysis.selectedClip.start - diff,
          end: this.props.analysis.selectedClip.end - diff,
        }
      } else if(endPosition > this.state.startPercent) {
        const percentDiff =  endPosition - this.state.startPercent
        const diff = percentDiff * this.props.currentTrack.youtubeLength / 100
        // const clipStart = this.props.analysis.selectedClip.start - diff;
        newClip = {
          id: this.props.analysis.selectedClip.id,
          start: this.props.analysis.selectedClip.start + diff,
          end: this.props.analysis.selectedClip.end + diff,
        }
        // newClip = {
        //   id: this.props.analysis.selectedClip.id,
        //   start: this.props.analysis.selectedClip.start + 1,
        //   end: this.props.analysis.selectedClip.end + 1,
        // }
      }

      if(newClip.start && newClip.end) {

        this.props.dispatch(updateClip(this.props.channel.id, newClip))
        this.setState({
          newClip
        })
      }
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
      this.props.dispatch(selectClip(newClip))
    }
  }

  resizeLeft(clip) {
    this.setState({
      startedEditing: true,
      startedMoving: false,
      startedEditingLeft: true,
      startPercent: clip.start * 100 / this.props.currentTrack.youtubeLength,
      clip
    })
  }
  resizeRight(clip) {
    this.setState({
      startedEditing: true,
      startedEditingRight: true,
      startedMoving: false,
      startPercent: clip.start * 100 / this.props.currentTrack.youtubeLength,
      clip
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
