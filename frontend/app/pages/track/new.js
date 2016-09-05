import React, {PropTypes} from 'react';
import { asyncConnect } from 'redux-connect'
import Helmet from 'react-helmet';
import axios from 'axios'

// actions
import { addTrack, loadTracks, updateCurrentVideo } from '../../actions';
import {
  updateSearchTerm,
  searchYoutube,
  clearSearchResults,
  updateYoutubeSelectedVideo,
  searchBeatport
} from '../../actions/search_actions';

// components
import TrackSearchForm from './new/track_search_form'
import TrackSearchResults from './new/track_search_results'

@asyncConnect([], state => ({
  search: state.search,
  loading: state.loading.pending,
  currentVideo: state.currentVideo,
  time: state.time
}))
export default class TrackNew extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  };

  handleTrackSearchSubmit({ artist, track_name }) {
    console.log({ artist, track_name })
    this.props.dispatch(clearSearchResults())
    this.props.dispatch(updateCurrentVideo(null, 'cleared'))
    this.props.dispatch(updateSearchTerm(artist, track_name))
    this.props.dispatch(searchYoutube(`${artist} ${track_name}`))
    this.props.dispatch(searchBeatport(`${artist} ${track_name}`))
    this.context.router.push(`/track/new?artistName=${encodeURIComponent(artist)}&trackName=${encodeURIComponent(track_name)}`);
  }

  componentWillUnmount() {
    this.props.dispatch(clearSearchResults())
  }

  componentDidMount() {
    console.log(this.props.location.query)
    if(this.props.location.query.artistName && this.props.location.query.trackName && !this.props.search.videos) {
      const artist = this.props.location.query.artistName
      const track_name = this.props.location.query.trackName
      this.handleTrackSearchSubmit({artist, track_name})
    }
  }

  generateTitle() {
    const { trackName, artistName } = this.props.location.query
    if(trackName && artistName) {
      return `${artistName} – ${trackName} | Track DNA`
    } else {
      return 'New Track – Track DNA '
    }
  }

  render() {
    const initialState = {
      initialValues: {
        track_name: this.props.location.query.trackName,
        artist: this.props.location.query.artistName
      }
    }
    return (
      <div className='page_container page_add_track'>
        <Helmet title={this.generateTitle()} />
        <TrackSearchForm {...this.props} {...initialState} onSubmit={this.handleTrackSearchSubmit.bind(this)} />
        <TrackSearchResults {...this.props} />
      </div>
    );
  }
}
