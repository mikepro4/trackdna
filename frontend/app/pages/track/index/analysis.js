import React, {PropTypes} from 'react';

// components
import TrackInfo from './track_info'
import TrackPlayer from './player'

// actions
import {
  deleteTrack
} from '../../../actions'

export default class Analysis extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onDelete() {
    const id = this.props.currentTrack.id
    this.props.dispatch(deleteTrack({id}))
      .then((response) => {
        this.context.router.push('/browse')
      })
  }

  render() {
    return (
      <div className='analsysis_container'>

        <div className='analysis_header'>
          <h1 className='analysis_title'>TRACK ANALYSIS</h1>
          <ul className='analysis_actions'>
            <li><a className='button'>Fork Analysis</a></li>
            <li><a className='button'>Save Analysis</a></li>
            <li><a className='button'>Share Analysis</a></li>
            <li><a className='button' onClick={this.onDelete.bind(this)}>Delete Track</a></li>
          </ul>
        </div>

        <TrackInfo {...this.props} />
        <div className='player_wrapper' ref='player_wrapper'>
          <TrackPlayer {...this.props} />
        </div>

      </div>
    );
  }
}
