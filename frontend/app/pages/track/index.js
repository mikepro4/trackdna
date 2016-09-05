import React, { PropTypes } from 'react'
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect'
import classnames from 'classnames'
import _ from 'lodash'

// actions
import {
  loadTrack,
  deleteTrack,
  loadTracks,
  updateCurrentVideo,
  editTrack,
  updateTime
} from '../../actions'

// components
import TrackSidebar from './index/track_sidebar'
import TrackPlayer from './index/player'
import TrackChannels from './index/channels'
import TrackInfo from './index/track_info'

@asyncConnect([{
  promise: (props) => {
    return Promise.resolve(props.store.dispatch(loadTrack(props.params.id)))
  }
}], state => ({
  currentTrack: state.app.currentTrack,
  loading: state.loading.pending,
  currentVideo: state.currentVideo,
  time: state.time
}))
export default class Track extends React.Component {
  componentDidMount() {
    this.props.dispatch(updateCurrentVideo(this.props.currentTrack.youtubeUrl))
  }

  // saveTrack() {
  //   console.log(this.state.channels)
  //   const track =  {...this.props.currentTrack,  channels: this.state.channels}
  //   this.props.dispatch(editTrack(track))
  //     .then((response) => {
  //       console.log('yay')
  //       this.props.dispatch(loadTrack(this.props.currentTrack.id))
  //     });
  // }
  //
  // renderSaveTrackButton() {
  //   if(!_.isEqual(this.props.currentTrack.channels.sort(), this.state.channels.sort())) {
  //     return (
  //       <button className='button' onClick={this.saveTrack.bind(this)}>Save Track</button>
  //     )
  //   }
  // }
  //

	render() {
    let pageClasses = classnames({
      'page_container': true,
      'page_track': true,
      'loading': this.props.loading
    })

		return (
			<div className={pageClasses}>
			 	<Helmet title="Track – Track DNA" />

        <div className='track_container'>

          <TrackSidebar {...this.props} />

          <div className='track_content'>
            <TrackPlayer {...this.props} />
            <TrackChannels {...this.props} />
            <TrackInfo {...this.props} />
          </div>

        </div>

			</div>
		)
	}
}
