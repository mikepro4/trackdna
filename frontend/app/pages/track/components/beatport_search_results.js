import React from 'react';
import classNames from 'classnames'
import moment from 'moment'
import check from '../../../assets/check.svg'
import { updateYoutubeSelectedVideo } from '../../../actions/search_actions'
import { updateCurrentVideo } from '../../../actions'
import _ from 'lodash'

export default class BetaportSearchResults extends React.Component {
  render() {
    const artistName = this.props.search.artist.replace(/\s/g, '').toLowerCase();
    const trackname = this.props.search.track_name.replace(/\s/g, '').toLowerCase();

    let videoListClasses = classNames({
      'beatport_track_list': true
    })

    let tracks;

    if(!_.isEmpty(this.props.search.beatportData)) {
      tracks = this.props.search.beatportData.map((track) => {

        console.log(track)

        if(track.type === 'track') {
          const artists = track.artists.map((artist) => {
            return (
              <div key={artist.id}>Artist:{artist.name}</div>
            )
          })

          const beaportArtistName = track.artists.map((artist) => {
            const trackArtist = artist.name.replace(/\s/g, '').toLowerCase()
            if(trackArtist === artistName) {
              return true
            }
          })
          console.log('beaportArtistName:', beaportArtistName)
          const beatportTrackName = track.name.replace(/\s/g, '').toLowerCase()

          let beatportTrackItemClasses = classNames({
            'beatport_track_item': true,
            'name_match': beatportTrackName === trackname,
            'owns': _.includes(beaportArtistName, true)
          })

          return (
            <li className={beatportTrackItemClasses} key={track.id}>
              <div>{artists}</div>
              <div>Name: {track.name}</div>
              <div>BPM: {track.bpm}</div>
              <div>Key: {track.key.standard.letter} {track.key.standard.chord}</div>
              <div>Label: {track.label.name}</div>
              <div>Length: {track.length}</div>
              <div>Mix Name: {track.mixName}</div>
              <div>Track Name: {track.name}</div>
              <div>Genre: {track.genres[0].name}</div>
              <div>Released at: {track.releaseDate}</div>
            </li>
          )
        }
      })
    } else {
      tracks = "No beatport results"
    }

    return (
      <div className='beatport_results'>
        <h2>Beatport Results</h2>
        <ul className={videoListClasses}>
          {tracks}
        </ul>
      </div>
    )
  }
}
