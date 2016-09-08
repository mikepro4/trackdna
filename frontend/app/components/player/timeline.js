import React, {PropTypes} from 'react';
import _ from 'lodash'
import classNames from 'classnames'
import { formatTime } from '../../utils/time_formatter'

export default class Timeline extends React.Component {
  handleResize = () => {
    this.forceUpdate();
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    setTimeout(() => {
      this.forceUpdate()
    }, 1)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  getTimeline() {
    if(this.refs.timeline) {
      const containerWIdth = this.refs.timeline.getBoundingClientRect().width
      // console.log(containerWIdth)
      const timesAmount = Math.floor(containerWIdth/25/2)
      const timeInterval = Math.floor(this.props.duration / timesAmount)

      const secondsArray = Array.apply(null, {length: this.props.duration}).map(Number.call, Number)

      const filteredSeconds = _.filter(secondsArray, (number) => {
        return((number % timeInterval) === 0)
      })
      return filteredSeconds
    }
  }

  render() {
    let times = ''

    const hoverTimePosition = {
      left: this.props.analysis.hoverTime * 100 / this.props.duration + '%'
    }

    const timeArray = this.getTimeline()

    const rangePosition = {
      left: this.props.analysis.hoverTime * 100 / this.props.duration + '%'
    }

    let rangeCLases = classNames({
      'range': true,
      'range_time_left': this.props.analysis.direction === 'left',
      'range_time_right': this.props.analysis.direction === 'right'
    })

    if(!_.isEmpty(timeArray)) {
      times = timeArray.map((time,i) => {
        return (
          <li className='time' key={i}>
            <span>{formatTime(time)}</span>
          </li>
        )
      })
    }

    return (
      <div className='timeline_container' ref='timeline'>
        {this.props.analysis.hoverTime && !this.props.analysis.rangeStart ?
          <div className='hoverTime' style={hoverTimePosition}>
            <span>{formatTime(this.props.analysis.hoverTime)}</span>
          </div>
          : ''
        }
        {this.props.analysis.rangeStart && this.props.analysis.rangeLength ?
          <div className={rangeCLases} style={hoverTimePosition}>
            <span className='range_time'>{formatTime(this.props.analysis.rangeStart)} – {formatTime(this.props.analysis.rangeStart + this.props.analysis.rangeLength)}</span>
            <span className='range_total'>({formatTime(this.props.analysis.rangeLength)})</span>
          </div>
          : ''
        }
        <ul className='time_list'>
          {times}
        </ul>
      </div>
    );
  }
}
