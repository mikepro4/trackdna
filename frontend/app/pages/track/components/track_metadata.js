import React, {PropTypes} from 'react';
import YoutubePlayer from "../../../components/player/player"
import ProgressBarPlayer from "../../../components/player/progress_bar"
import { updateCurrentVideo } from '../../../actions'
import classNames from 'classnames'
import TrackMetadataForm from './track_metadata_form'
import moment from 'moment'

export default class TrackMetadata extends React.Component {
  onPlay() {
    this.props.dispatch(updateCurrentVideo(this.props.currentVideo.videoId, 'play'))
  }

  onPause() {
    this.props.dispatch(updateCurrentVideo(this.props.currentVideo.videoId, 'pause'))
  }

  onStop() {
    this.props.dispatch(updateCurrentVideo(this.props.currentVideo.videoId, 'stop'))
  }

  onSeek() {
    this.props.dispatch(updateCurrentVideo(this.props.currentVideo.videoId, 'seek', 30))
  }

  renderPlaying() {
    if(this.props.currentVideo.playerAction === 'playing') {
      return (
        <div>
          <div>Duration: {this.props.time.durationMinutes}:{this.props.time.durationSeconds}</div>
          <div>Current Time: {this.props.time.currentMinutes}:{this.props.time.currentSeconds}</div>
        </div>
      )
    }
  }

  renderPlayer() {
    if(this.props.currentVideo.videoId) {
      return( <YoutubePlayer {...this.props} /> )
    }
  }

  trackMetadataFormSubmit() {
    console.log('pressed')
  }

  renderDuration() {
    if(this.props.search.videoYoutubeDetails){
      return(
        <div>
          <div className>Youtube Duration: {this.parseYoutubeDuration(this.props.search.videoYoutubeDetails.contentDetails.duration)}</div>
          <div className>Youtube Views: {this.props.search.videoYoutubeDetails.statistics.viewCount}</div>
        </div>
      )
    }
  }

  parseYoutubeDuration(duration) {
    let youtubeVideoDuration = moment.duration(duration).asSeconds()
    let momentDurationYoutube = moment.duration(youtubeVideoDuration, 'seconds')
    let outubeDurationParsed = (`${momentDurationYoutube.minutes()}:${momentDurationYoutube.seconds()}`)
    return outubeDurationParsed
  }

  renderTrackMetadata() {
    if(this.props.search.beatportSelectedTrack) {
      const {name, bpm, lengthMs, genres, key, label, dynamicImages, artists} = this.props.search.beatportSelectedTrack
      let youtubeVideoDuration = 0;
      let youtubeDurationParsed = '';
      let beatportDurationParsed = '';

      if(this.props.search.videoYoutubeDetails && this.props.search.beatportSelectedTrack) {
        youtubeVideoDuration = moment.duration(this.props.search.videoYoutubeDetails.contentDetails.duration).asSeconds()

        let momentDurationYoutube = moment.duration(youtubeVideoDuration, 'seconds')
        let momentDurationBeatport =  moment.duration(moment.duration(lengthMs).asSeconds(), 'seconds')

        youtubeDurationParsed = (`${momentDurationYoutube.minutes()}:${momentDurationYoutube.seconds()}`)
        beatportDurationParsed = (`${momentDurationBeatport.minutes()}:${momentDurationBeatport.seconds()}`)
      }

      // console.log(this.props.search.beatportSelectedTrack)
      const initialState = {
        initialValues: {
          bpm, name,
          beatportLength: Math.floor(moment.duration(lengthMs).asSeconds()),
          beatportLengthParsed: beatportDurationParsed,
          youtubeLength: youtubeVideoDuration,
          youtubeLengthParsed: youtubeDurationParsed,
          label: label.name,
          genre: genres[0].name,
          key: `${key.standard.letter} ${key.standard.chord}`,
          youtubeUrl: this.props.search.youtubeSelectedVideo.id.videoId
        }
      }
      const trackArtists = artists.map((artist, i) => {
        return (
          <div key={i}>{artist.name}</div>
        )
      })
      // const durationYoutubeParsed = moment.duration(this.props.search.videoYoutubeDetails.contentDetails.duration).asSeconds()
      return (
        <div>
          <div><img src={`http://geo-media.beatport.com/image_size/600x80/${dynamicImages.waveform.id}.png`} /></div>
          <img src={`http://geo-media.beatport.com/image_size/100x100/${dynamicImages.main.id}.jpg`} />
          <h1>{trackArtists}</h1>
          <div>{name}</div>
          <ul className='track_input_list'>
            <TrackMetadataForm {...this.props} {...initialState} enableReinitialize="true" onSubmit={this.trackMetadataFormSubmit.bind(this)}  />
          </ul>
        </div>
      )
    }
  }

  renderBeatportHeader() {
    if(this.props.search.beatportSelectedTrack) {
      const {name, label, dynamicImages, artists} = this.props.search.beatportSelectedTrack
      const trackArtists = artists.map((artist, i) => {
        return (
          <span key={i}>{artist.name}</span>
        )
      })
      return (
        <div className='track_metadata_beatport'>
          <div className='cover_container'>
            <img src={`http://geo-media.beatport.com/image_size/220x220/${dynamicImages.main.id}.jpg`} />
          </div>
          <div className='main_info_container'>
            <div className='beatport_artist'>{trackArtists}</div>
            <div className='track_name'>{name}</div>
            <div className='label_name'>{label.name}</div>
          </div>
        </div>
      )
    }
  }

  renderProgressBarPlayer() {
    if(this.props.search.youtubeSelectedVideo && this.props.search.videoYoutubeDetails) {
      const youtubeDuration = moment.duration(this.props.search.videoYoutubeDetails.contentDetails.duration).asSeconds()
      return (
        <ProgressBarPlayer
          {...this.props}
          duration={youtubeDuration}
        />
      )
    }
  }

  render() {
    return (
      <div className='track_metadata_container'>
        <div className='track_metadata'>
          <div className='track_metadata_header'>
            <div className='track_metadata_header_text'>
              <h1 className='track_metadata_title'>Create New Track Analysis</h1>
              <p className='track_metadata_description'>
                Verify details of the track and add it to the database to start it’s analysis
                </p>
            </div>
            <div className='track_metadata_header_action'>
              <button className='button button_primary button_start'>
                Start Analysis
              </button>
            </div>
          </div>
          {this.renderBeatportHeader()}
          {this.renderProgressBarPlayer()}
          {this.renderPlayer()}
        </div>

        {/* {this.renderPlayer()}
        {this.renderDuration()}
        {this.renderPlaying()}
        {this.renderTrackMetadata()} */}
      </div>
    );
  }
}
