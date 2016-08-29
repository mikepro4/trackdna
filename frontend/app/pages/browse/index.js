import React from 'react'
import Helmet from "react-helmet";
import { asyncConnect } from 'redux-connect'
import { addTrack, loadTracks } from '../../actions';
import TrackList from '../../components/track/track_list'
import AddTrack from "../../components/track/add_track"
import {reset} from 'redux-form';
import YoutubePlayer from "../../components/player/player"

@asyncConnect([{
  promise: ({ store }) => Promise.all([
    store.getState().app.tracksLoaded ? Promise.resolve() : store.dispatch(loadTracks())
  ])
}], state => ({
  auth: state.auth,
	tracks: state.app.tracks,
	loading: state.loading,
  videoId: state.currentVideo,
  playerAction: state.currentVideo.playerAction,
  time: state.time
}))
export default class Browse extends React.Component {

  handleFormSubmit({ artist, name, youtubeUrl}) {
    this.props.dispatch(addTrack({
        artist,
        name,
        youtubeUrl,
        "channels": []
      }))
      .then((response) => {
        this.props.dispatch(loadTracks())
        console.log(this.props)
        this.props.dispatch(reset('TrackForm'))
      });
  }

	render() {
		return (
			<div className='page_container page_browse'>
			 	<Helmet title="Browse – Track DNA" />

        <div className='filters_container'>
          <div className='filters_section_1'>
            <h1>Track Filters</h1>
            <div className='add_track_test'>
              <AddTrack {...this.props} onSubmit={this.handleFormSubmit.bind(this)} />
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
