import React, {PropTypes} from 'react';
import { asyncConnect } from 'redux-connect'
import AddTrack from "../../components/track/add_track"
import Helmet from 'react-helmet';
import { addTrack, loadTracks, updateCurrentVideo } from '../../actions';
import { updateSearchTerm, searchYoutube, clearSearchResults } from '../../actions/search_actions';
import TrackSearchForm from './components/track_search_form'
import TrackSearchResults from './components/track_search_results'

// import OAuth from 'oauth-1.0a'
import axios from 'axios'

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

  handleFormSubmit({ artist, name}) {
    this.props.dispatch(addTrack({
        artist,
        name,
        "channels": []
      }))
      .then((response) => {
        this.props.dispatch(loadTracks())
          .then((response) => {this.context.router.push('/browse')})
      });
  }

  handleTrackSearchSubmit({ artist, track_name }) {
    console.log({ artist, track_name })
    this.props.dispatch(updateCurrentVideo(null, 'cleared'))
    this.props.dispatch(updateSearchTerm(artist, track_name))
    this.props.dispatch(searchYoutube(`${artist} – ${track_name}`))
  }

  componentWillUnmount() {
    this.props.dispatch(clearSearchResults())
  }

  render() {
    // const oauth = OAuth({
    //     consumer: {
    //         public: 'ac24c59a7d307088bde16c1954710b3a1be86959',
    //         secret: 'c517c8175fc5bbfb50adb202ebad7db8c014fcae'
    //     },
    //     signature_method: 'HMAC-SHA1'
    // });
    //
    // const token = {
    //     public: '44544de2454973ae18248c12ae5ad70093c03158',
    //     secret: 'b7728c4a3cd249b170fb43e285875d98226f1792'
    // };
    //
    // const request_data = {
    //   url: 'https://oauth-api.beatport.com/catalog/3/most-popular/genre?id=6&perPage=100',
    //   method: 'GET'
    // };

    // axios.get('https://oauth-api.beatport.com/catalog/3/most-popular/genre?id=6&perPage=100', {headers: oauth.toHeader(oauth.authorize(request_data, token))})
    //   .then((results) => console.log(results.data.results))
    //
    // YTSearch({key: 'AIzaSyDQ_kgowJCa-mH5wnjnQ1mOE4nBqQIGij8', term:'Moon Rocks Enrico Sangiuliano'}, (videos) => {
    //   console.log(videos)
    //  });
    //
    // axios.get('https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=VG5OqG_DTVo&key=AIzaSyDQ_kgowJCa-mH5wnjnQ1mOE4nBqQIGij8')
    //  .then((results) => console.log(results.data.items[0].statistics))

    return (
      <div className='page_container page_add_track'>
        <Helmet title="New Track – Track DNA" />
        <TrackSearchForm {...this.props} onSubmit={this.handleTrackSearchSubmit.bind(this)} />
        <div className='track_search_results_container'>
          <TrackSearchResults {...this.props} />
        </div>
      </div>
    );
  }
}
