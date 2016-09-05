import React from 'react'
import Helmet from 'react-helmet'
import { asyncConnect } from 'redux-connect'
import { reset } from 'redux-form'

//actions
import { addTrack, loadTracks } from '../../actions'

//components
import YoutubePlayer from '../../components/player/player'
import TrackList from '../../components/track/track_list'


@asyncConnect([{
  promise: ({ store }) => Promise.all([
    store.getState().app.tracksLoaded ? Promise.resolve() : store.dispatch(loadTracks())
  ])
}], state => ({
  auth: state.auth,
	tracks: state.app.tracks,
	loading: state.loading,
  currentVideo: state.currentVideo,
  time: state.time
}))
export default class Browse extends React.Component {

  componentWillMount() {
    this.props.dispatch(loadTracks())
  }

	render() {
		return (
			<div className='page_container page_browse'>
			 	<Helmet title="Browse – Track DNA" />

        <div className='filters_container'>
          <div className='filters_section_1'>
            <h1>Track Filters</h1>
            <div className='add_track_test'>
              <YoutubePlayer {...this.props} />
            </div>
          </div>

          <div className='filters_section_2'>
            <h1>Sounds Filters</h1>
          </div>
        </div>

        <div className='results_container'>
          <h3>Browse Tracks</h3>
          <TrackList {...this.props} />
        </div>

			</div>
		)
	}
}
