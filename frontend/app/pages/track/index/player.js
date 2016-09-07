import React, {PropTypes} from 'react';
import classNames from 'classnames'

// components
import ProgressBarPlayer from '../../../components/player/progress_bar'
import PlayerControls from '../../../components/player/player_controls'

// utils
import { formatTime } from '../../../utils/time_formatter'

export default class TrackPlayer extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     offsetTop: 0,
   }
  }

  componentDidMount() {
    this.setState({
      offsetTop: this.refs.track_player_container.offsetTop
    })
  }

  render() {
    const { youtubeLength, waveformId } = this.props.currentTrack
    const total = formatTime(this.props.currentTrack.youtubeLength)
    const current = formatTime(this.props.time.currentTime)

    let playerBreakpoint = false
    if(this.refs.track_player_container) {
      playerBreakpoint = (this.props.scrollTop >= this.state.offsetTop)
    }

    let playerClassnames = classNames({
      'track_player_container': true,
      'player_fixed': playerBreakpoint
    })

    return (
      <div className={playerClassnames} ref='track_player_container'>

        <div className='track_player_controls'>
          <PlayerControls {...this.props} />
          <div className='player_time_container'>
            <span className='current_time'>{current}</span>
            <span className='time_divider'> / </span>
            <span className='total_time'>{total}</span>
          </div>
        </div>

        <div className='track_player_wave'>
          <ProgressBarPlayer
            {...this.props}
            duration={youtubeLength}
            waveformId={waveformId}
          />
        </div>

      </div>
    );
  }
}

TrackPlayer.propTypes = {
};
