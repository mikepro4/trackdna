import React, {PropTypes} from 'react';
import YoutubePlayer from "../../../components/player/player"
import ProgressBarPlayer from "../../../components/player/progress_bar"
import { updateCurrentVideo } from '../../../actions'
import classNames from 'classnames'
import TrackMetadataForm from './track_metadata_form'
import moment from 'moment'
import Pill from '../../../components/pill/pill'
import {
  checkVideoOwnership, checkVideoOfficial, checkVideoNameMatch
} from '../../../utils/youtube'

export default class TrackMetadata extends React.Component {
  trackMetadataFormSubmit() {
    console.log('pressed')
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

  renderErrors() {
    if(this.props.search.videoYoutubeDetails && this.props.search.beatportSelectedTrack) {
      const youtubeDuration = moment.duration(this.props.search.videoYoutubeDetails.contentDetails.duration).asSeconds()
      const beatportDuration = moment.duration(this.props.search.beatportSelectedTrack.lengthMs).asSeconds()

      if((beatportDuration - youtubeDuration) < -30 || (beatportDuration - youtubeDuration) > 30) {
        return (
          <div className='selection_error'>
            <span className='error_title'>INCORRECT METADATA</span>
            <span className='error_description'>Beatport and Youtube content durations don’t match.</span>
          </div>
        )
      }
    }
  }

  renderPlayer() {
    if(this.props.currentVideo.videoId && this.props.search.videoYoutubeDetails) {

      const youtubeUrl = 'https://www.youtube.com/watch?v=' + this.props.search.youtubeSelectedVideo.id.videoId
      const video = this.props.search.youtubeSelectedVideo
      
      const OWNS_RESULT = checkVideoOwnership(this.props.search.artist, video)
      const OFFICIAL_RESULT = checkVideoOfficial(video)
      const NAME_MATCH_RESULT = checkVideoNameMatch(this.props.search.track_name, video)

      return (
        <div className='video_player_container'>
          <h1>AUDIO SOURCE</h1>
          <YoutubePlayer {...this.props} />
          <div>Youtube Views: {this.props.search.videoYoutubeDetails.statistics.viewCount}</div>
          <div>Likes: {this.props.search.videoYoutubeDetails.statistics.likeCount}</div>
          <div>Dislikes: {this.props.search.videoYoutubeDetails.statistics.dislikeCount}</div>
          <a href={youtubeUrl} target='_blank'>{youtubeUrl}</a>
          {OWNS_RESULT ?
            <Pill
              {...this.props}
              iconLeft='check'
              type='positive'
              content='Artist Match'
            /> : ''
          }

          {OFFICIAL_RESULT ?
            <Pill
              {...this.props}
              iconLeft='check'
              type='positive'
              content='Official Channel'
            /> : ''
          }

          {NAME_MATCH_RESULT ?
            <Pill
              {...this.props}
              iconLeft='check'
              type='positive'
              content='Name Match'
            /> : ''
          }
        </div>
      )
    }
  }

  renderTrackMetadata() {
    if(this.props.search.beatportSelectedTrack && this.props.search.videoYoutubeDetails) {
      const {name, bpm, lengthMs, genres, key, label, dynamicImages, artists} = this.props.search.beatportSelectedTrack
      const youtubeVideoDuration = moment.duration(this.props.search.videoYoutubeDetails.contentDetails.duration).asSeconds()

      const initialState = {
        initialValues: {
          bpm, name,
          beatportLength: Math.floor(moment.duration(lengthMs).asSeconds()),
          youtubeLength: youtubeVideoDuration,
          label: label.name,
          genre: genres[0].name,
          key: `${key.standard.letter}${key.standard.sharp ? '#' : ''}${key.standard.flat ? 'b' : ''} ${key.standard.chord}`,
          youtubeUrl: this.props.search.youtubeSelectedVideo.id.videoId
        }
      }

      return (
        <div className='track_metadata_form'>
          <h1>TRACK METADATA</h1>
          <ul className='track_input_list'>
            <TrackMetadataForm
              {...this.props}
              {...initialState}
              enableReinitialize="true"
              onSubmit={this.trackMetadataFormSubmit.bind(this)}
            />
          </ul>
        </div>
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
          {this.renderErrors()}
          {this.renderPlayer()}
          {this.renderTrackMetadata()}

        </div>
      </div>
    );
  }
}
