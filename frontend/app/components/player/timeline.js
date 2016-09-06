import React, {PropTypes} from 'react';
import _ from 'lodash'
import { formatTime } from '../../utils/time_formatter'

export default class Timeline extends React.Component {
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
    // this.getTimeline()

    let times;

    if(this.refs.timeline) {
      times = this.getTimeline().map(time => {
        return (
          <li className='time'>
            <span>{formatTime(time)}</span>
          </li>
        )
      })
    }
    return (
      <div className='timeline_container' ref='timeline'>

        <ul className='time_list'>
          {times}
        </ul>
      </div>
    );
  }
}
