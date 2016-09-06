import React, {PropTypes} from 'react';
import _ from 'lodash'
import { formatTime } from '../../utils/time_formatter'

export default class Timeline extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.forceUpdate()
    }, 1)
  }

  getTimeline() {
    if(this.refs.timeline) {
      const containerWIdth = this.refs.timeline.getBoundingClientRect().width
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
        {this.props.analysis.hoverTime ?
          <div className='hoverTime' style={hoverTimePosition}>
            <span>{formatTime(this.props.analysis.hoverTime)}</span>
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
