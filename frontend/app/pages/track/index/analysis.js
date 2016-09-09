import React, {PropTypes} from 'react';
import _ from 'lodash'

// components
import TrackInfo from './track_info'
import TrackPlayer from './player'
import ChannelsContent from './channels_content'

// actions
import {
  deleteTrack,
  editTrack
} from '../../../actions'

// actions
import {
  selectChannel
} from '../../../actions/analysis'

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

  onAnalysisSave() {
    const id = this.props.currentTrack.id
    const updatedTrack = {...this.props.currentTrack,
      channels: this.props.analysis.channels
    }
    this.props.dispatch(selectChannel(null))
    this.props.dispatch(editTrack(updatedTrack))
      .then((response) => {
         this.context.router.push(`/track/${id}`)
      });
  }

  render() {
    const sameContent = _.isEqual(this.props.currentTrack.channels, this.props.analysis.channels)
    return (
      <div className='analsysis_container'>

        <div className='analysis_header'>
          <h1 className='analysis_title'>TRACK ANALYSIS</h1>
          <ul className='analysis_actions'>
            {!sameContent ? <li><a className='button' onClick={this.onAnalysisSave.bind(this)}>Save Track</a></li> : ''}
            <li><a className='button' onClick={this.onDelete.bind(this)}>Delete Track</a></li>
          </ul>
        </div>

        <TrackInfo {...this.props} />

        <div className='player_wrapper' ref='player_wrapper'>
          <TrackPlayer {...this.props} />
        </div>

        <ChannelsContent {...this.props} />

      </div>
    );
  }
}
