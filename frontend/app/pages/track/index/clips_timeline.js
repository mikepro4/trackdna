import React, {PropTypes} from 'react';

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
      console.log(this.state)
    })
  }

  onMouseLeave(event) {
    // this.setState({
    //   startedDragging: false,
    //   startPercent: 0,
    //   endPercent: 0
    // })
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

          <div className='clip' style={style}></div>

      </div>
    );
  }
}
