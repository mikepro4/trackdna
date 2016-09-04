import React from 'react';
import classNames from 'classnames'
import moment from 'moment'
import { updateBeatportSelectedMetadata } from '../../../actions/search_actions'
import { updateCurrentVideo } from '../../../actions'
import _ from 'lodash'
import ReactDOM from 'react-dom'
import Pill from '../../../components/pill/pill'

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
      var parentNode = ReactDOM.findDOMNode(this.refs.scrollable_container);
      if(!this.state.containerScrolled) {
        parentNode.scrollTop = domNode.offsetTop - 60;
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
              <div key={i} className='beatport_artist'>{artist.name}</div>
            )
          })

          const beaportArtistName = track.artists.map((artist) => {
            const trackArtist = artist.name.replace(/\s/g, '').toLowerCase()
            if(trackArtist === artistName) {
              return true
            }
          })

          const refValue = selectedTrackId === track.id ? 'selected' : '';

          const beatportTrackName = track.name.replace(/\s/g, '').toLowerCase()
          const OWNS_RESULTS = _.includes(beaportArtistName, true)
          const NAME_MATCH_RESULT = (beatportTrackName === trackname)

          let beatportTrackItemClasses = classNames({
            'result_item': true,
            'beatport_search_result_item': true,
            'selected_result': selectedTrackId === track.id
          })

          return (
            <li className={beatportTrackItemClasses} ref={refValue} key={i} onClick={this.selectTrack.bind(this, track)} >
              <div className='beatport_result_top'>
                <div className='cover_container'>
                  <img src={`http://geo-media.beatport.com/image_size/120x120/${track.dynamicImages.main.id}.jpg`} />
                </div>
                <div className='main_info_container'>
                  {artists}
                  <div className='track_name'>{track.name}</div>
                  <div className='label_name'>{track.label.name}</div>
                </div>
              </div>

              <div className='beatport_result_bottom'>
                <div className='beatport_result_bottom_left'>
                  <ul className='beatport_info_list'>
                    <li className='highlighted'>{track.length}</li>
                    <li className='highlighted'>{track.bpm} BPM</li>
                  </ul>

                  <ul className='beatport_info_list'>
                    <li>{track.key.standard.letter} {track.key.standard.chord}</li>
                    <li>{track.genres[0].name}</li>
                  </ul>
                </div>

                <div className="beatport_result_bottom_right">
                  <ul className='beatport_info_list'>
                    <li>{track.releaseDate}</li>
                    <li className='faded'>{track.mixName}</li>
                  </ul>
                </div>
              </div>

              {OWNS_RESULTS ?
                <Pill
                  {...this.props}
                  iconLeft='check'
                  type='positive'
                  content='Artist Match'
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
            </li>
          )
        }
      })
    } else {
      tracks = (
          <div className='metatada_no_results'>
            <div className='no_results_content'>
              <h1>No beatport results</h1>
              <p>Beatport doesn't contain metadata for this track</p>
            </div>
          </div>
      )
    }

    let resultsListClasses = classNames({
      'results_list': true,
      'selected_result_container': this.props.search.beatportSelectedTrack
    })

    return (
      <div className='metadata_results_container'>
        <h2 className='results_source_name'><span>BEATPORT RESULTS</span></h2>
        <div className='results_scrollable_container' ref="scrollable_container">
          <ul className={resultsListClasses}>
            {tracks}
          </ul>
        </div>
      </div>
    )
  }
}
