import React from 'react';
import _ from 'lodash'
import YoutubeSearchResults from './youtube_search_results.js'
import TrackMetadata from './track_metadata.js'

export default class TrackSearchResults extends React.Component {

  renderInitialState() {
    if(this.props.search.loadingVideos) {
      return (
        <div className='initial_state'>
          <h1>Loading...</h1>
          <p>Please wait.</p>
        </div>
      )
    }

    if(!this.props.search.videos) {
      return (
        <div className='initial_state'>
          <h1>New Track Analysis</h1>
          <p>Search for the track you want to analyze.</p>
        </div>
      )
    }

    if(_.isEmpty(this.props.search.videos)) {
      return (
        <div className='initial_state'>
          <h1>No Results</h1>
          <p>Sorry, this track can't be found. Please try searching for something else.</p>
        </div>
      )
    }
  }

  renderSearchResults() {
    if(!_.isEmpty(this.props.search.videos)) {
      return (
        <div className='results_container'>
          <TrackMetadata {...this.props} />
          <div className='youtube_results_container'>
            <YoutubeSearchResults {...this.props} />
          </div>
        </div>
      )
    }
  }

  render() {
    console.log(this.props.search)
    return (
      <div>
        {this.renderInitialState()}
        {this.renderSearchResults()}
      </div>
    )
  }
}
