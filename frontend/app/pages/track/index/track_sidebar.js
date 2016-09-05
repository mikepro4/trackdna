import React, {PropTypes} from 'react';

// actions
import {
  deleteTrack
} from '../../../actions'

// components
import YoutubePlayer from '../../../components/player/player'

// utils
import { formatTime } from '../../../utils/time_formatter'

export default class TrackSidebar extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onDelete() {
    const id = this.props.currentTrack.id
    this.props.dispatch(deleteTrack({id}))
      .then((response) => {
        this.context.router.push('/browse')
      })
  }

  render() {
    const { trackName, artist, coverId, label, genre, bpm, mixName, releaseDate, key, youtubeLength } = this.props.currentTrack

    return (
      <div className='track_sidebar'>
        <div className='track_metadata'>
          {coverId ?
            <div className='cover_container'>
              <img src={`http://geo-media.beatport.com/image_size/120x120/${coverId}.jpg`} />
            </div>
            : ''
          }
          <div className='main_info_container'>
            <div className='artist_name'>{artist}</div>
            <div className='track_name'>{trackName}</div>

            {label ?
              <div className='label_name'>{label}</div>
              : ''
            }
          </div>
        </div>

        <div className='track_info'>
          <h1>TRACK INFO</h1>

          <ul className='track_info_list'>

            {genre ?
              <li className='track_info_property'>
                <span className='track_info_key'>Genre</span>
                <span className='track_info_value'>{genre}</span>
              </li>
              : ''
            }

            {bpm ?
              <li className='track_info_property'>
                <span className='track_info_key'>Tempo</span>
                <span className='track_info_value'>{bpm} BPM</span>
              </li>
              : ''
            }

            {key ?
              <li className='track_info_property'>
                <span className='track_info_key'>Key</span>
                <span className='track_info_value'>{key}</span>
              </li>
              : ''
            }

            {youtubeLength ?
              <li className='track_info_property'>
                <span className='track_info_key'>Length</span>
                <span className='track_info_value'>{formatTime(youtubeLength)}</span>
              </li>
              : ''
            }

            {mixName ?
              <li className='track_info_property'>
                <span className='track_info_key'>Mix Name</span>
                <span className='track_info_value'>{mixName}</span>
              </li>
              : ''
            }

            {releaseDate ?
              <li className='track_info_property'>
                <span className='track_info_key'>Released</span>
                <span className='track_info_value'>{releaseDate}</span>
              </li>
              : ''
            }

          </ul>
        </div>

        <ul className='track_actions'>
          <li><a className='button' onClick={this.onDelete.bind(this)}>Delete Track</a></li>
        </ul>

        <div className='track_player'>
          <YoutubePlayer {...this.props} />
        </div>

      </div>
    );
  }
}
