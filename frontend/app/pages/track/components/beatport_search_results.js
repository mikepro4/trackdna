import React from 'react';
import classNames from 'classnames'
import moment from 'moment'
import check from '../../../assets/check.svg'
import { updateBeatportSelectedMetadata } from '../../../actions/search_actions'
import { updateCurrentVideo } from '../../../actions'
import _ from 'lodash'
import ReactDOM from 'react-dom'

export default class BetaportSearchResults extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     containerScrolled: false
   }
  }

  selectTrack(track) {
    this.props.dispatch(updateBeatportSelectedMetadata(track, true))
  }

  componentDidUpdate() {

    if(!this.props.search.preSelectedTrack) {
      this.pickBestTrack()
    }

    var selectedItem = this.refs.selected;
    if (selectedItem) {
      var domNode = ReactDOM.findDOMNode(selectedItem);
      var parentNode = ReactDOM.findDOMNode(this.refs.beatport_container);
      if(!this.state.containerScrolled) {
        parentNode.scrollTop = domNode.offsetTop - 80;
        this.setState({
          containerScrolled: true
        })
      }
    }
  }

  pickBestTrack() {
    const artistName = this.props.search.artist.replace(/\s/g, '').toLowerCase();
    const trackname = this.props.search.track_name.replace(/\s/g, '').toLowerCase();

    if(!_.isEmpty(this.props.search.beatportData)) {
      const owns = _.filter(this.props.search.beatportData, (track) => {
        const beatportArtistName = _.filter(track.artists, (artist) => {
          const trackArtist = artist.name.replace(/\s/g, '').toLowerCase()
          return (
            trackArtist === artistName
          )
        })
        return (
          !_.isEmpty(beatportArtistName) && (track.type === 'track')
        )
      });

      if(!_.isEmpty(owns)) {
        const nameMatchOwns = _.filter(owns, (track) => {
          const beatportTrackName = track.name.replace(/\s/g, '').toLowerCase()
          return (
            (beatportTrackName.indexOf(trackname) !== -1)
          )
        })
        this.selectTrack(nameMatchOwns[0], true)
      } else if(_.isEmpty(owns)) {
        const nameMatch = _.filter(this.props.search.beatportData, (track) => {
          const beatportTrackName = track.name.replace(/\s/g, '').toLowerCase()
          return (
            (beatportTrackName.indexOf(trackname) !== -1) && (track.type === 'track')
          )
        })
        this.selectTrack(nameMatch[0], true)
      }
    }
  }

  render() {
    const artistName = this.props.search.artist.replace(/\s/g, '').toLowerCase();
    const trackname = this.props.search.track_name.replace(/\s/g, '').toLowerCase();

    let selectedTrackId = '';
    if(this.props.search.beatportSelectedTrack) {
      selectedTrackId = this.props.search.beatportSelectedTrack.id
    }

    let tracks;

    if(!_.isEmpty(this.props.search.beatportData)) {

      tracks = this.props.search.beatportData.map((track,i) => {

        if(track.type === 'track') {
          const artists = track.artists.map((artist, i) => {
            return (
              <div key={i}>Artist:{artist.name}</div>
            )
          })

          const beaportArtistName = track.artists.map((artist) => {
            const trackArtist = artist.name.replace(/\s/g, '').toLowerCase()
            if(trackArtist === artistName) {
              return true
            }
          })
          const beatportTrackName = track.name.replace(/\s/g, '').toLowerCase()
          let beatportTrackItemClasses = classNames({
            'beatport_track_item': true,
            'name_match': beatportTrackName === trackname,
            'owns': _.includes(beaportArtistName, true),
            'selected_track': selectedTrackId === track.id
          })
          const refValue = selectedTrackId === track.id ? 'selected' : '';
          return (
            <li className={beatportTrackItemClasses} ref={refValue} key={i} onClick={this.selectTrack.bind(this, track)} >
              <div>{artists}</div>
              <div>Id: {track.id}</div>
              <div>Name: {track.name}</div>
              <div>BPM: {track.bpm}</div>
              <div>Key: {track.key.standard.letter} {track.key.standard.chord}</div>
              <div>Label: {track.label.name}</div>
              <div>Length: {track.length}</div>
              <div>Mix Name: {track.mixName}</div>
              <div>Track Name: {track.name}</div>
              <div>Genre: {track.genres[0].name}</div>
              <div>Released at: {track.releaseDate}</div>
              <div className='owns_label'><img src={check}/> Exact artist match </div>
              <div className='name_match_label'><img src={check}/> Contains track name</div>
            </li>
          )
        }
      })
    } else {
      tracks = "No beatport results"
    }

    let trackListClasses = classNames({
      'beatport_track_list': true,

    })

    let videoListClasses = classNames({
      'beatport_track_list': true,
      'track_selected': this.props.search.beatportSelectedTrack
    })


    return (
      <div className='beatport_results_container' ref="beatport_container">
        <div className='beatport_results'>
          <h2>Beatport Results</h2>
          <ul className={videoListClasses}>
            {tracks}
          </ul>
        </div>
      </div>

    )
  }
}
