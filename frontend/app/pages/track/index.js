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
// import TrackSidebar from './index/track_sidebar'
// import TrackPlayer from './index/player'
// import TrackChannels from './index/channels'
// import TrackInfo from './index/track_info'
import Analysis from './index/analysis'
import YoutubePlayer from '../../components/player/player'

@asyncConnect([{
  promise: (props) => {
    return Promise.resolve(props.store.dispatch(loadTrack(props.params.id)))
  }
}], state => ({
  currentTrack: state.app.currentTrack,
  loading: state.loading.pending,
  currentVideo: state.currentVideo,
  time: state.time,
  analysis: state.analysis
}))
export default class Track extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     scrollTop: 0,
   }
  }


  componentDidMount() {
    this.props.dispatch(updateCurrentVideo(this.props.currentTrack.youtubeUrl))
    this.refs.track_container.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.refs.track_container.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) =>  {
    // this.refs.player_wrapper.getDOMNode().style.top = document.documentElement.scrollTop + 'px';
    this.setState({
      scrollTop: event.target.scrollTop
    })
  }

	render() {
    let pageClasses = classnames({
      'page_container': true,
      'page_track': true,
      'loading': this.props.loading
    })

		return (
			<div className={pageClasses}>
			 	<Helmet title="Track – Track DNA" />

        <div className='track_container' ref='track_container'>

          <div className='track_page_content'>
            <Analysis
              {...this.props}
              scrollTop={this.state.scrollTop}
            />
          </div>



          {/* <TrackSidebar {...this.props} /> */}

          {/* <div className='track_content'>
            <TrackPlayer {...this.props} />
            <TrackChannels {...this.props} />
            <TrackInfo {...this.props} />
          </div> */}

        </div>

        <div className='track_player'>
          <YoutubePlayer {...this.props} />
        </div>

			</div>
		)
	}
}
