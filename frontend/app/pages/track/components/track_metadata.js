import React, {PropTypes} from 'react';
import YoutubePlayer from "../../../components/player/player"
import { updateCurrentVideo } from '../../../actions'
import classNames from 'classnames'
import TrackMetadataForm from './track_metadata_form'

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
      let controlsClasses = classNames({
        'track_actions': true,
        'play':   this.props.currentVideo.playerAction,
        'pause': (this.props.currentVideo.playerAction === 'playing'),
        'stop':  (this.props.currentVideo.playerAction === 'playing'),
        'seek': true
      })
      return(
        <div>
          <YoutubePlayer {...this.props} />
          <ul className={controlsClasses}>
            <li className='play'><button onClick={this.onPlay.bind(this)} className='button'>Play</button></li>
            <li className='pause'><button onClick={this.onPause.bind(this)} className='button'>Pause</button></li>
            <li className='stop'><button onClick={this.onStop.bind(this)} className='button'>Stop</button></li>
            <li className='seek'><button onClick={this.onSeek.bind(this)} className='button'>Seek to 0:30</button></li>
          </ul>
        </div>
      )
    }
  }

  trackMetadataFormSubmit() {
    console.log('pressed')
  }

  renderTrackMetadata() {
    if(this.props.search.beatportSelectedTrack) {
      const {name, bpm, length, genres, key, label, dynamicImages, artists} = this.props.search.beatportSelectedTrack
      console.log(this.props.search.beatportSelectedTrack)
      const initialState = {
        initialValues: {
          bpm, name, length,
          label: label.name,
          genre: genres[0].name,
          key: `${key.standard.letter} ${key.standard.chord}`,
          youtubeUrl: this.props.search.youtubeSelectedVideo.id.videoId
        }
      }
      const trackArtists = artists.map((artist) => {
        return (
          <div key={artist.id}>{artist.name}</div>
        )
      })
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

  render() {
    return (
      <div className='track_metadata_container'>
        Track metadata
        {this.renderPlayer()}
        {this.renderPlaying()}
        {this.renderTrackMetadata()}
      </div>
    );
  }
}
