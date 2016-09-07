import React, {PropTypes} from 'react';

// utils
import { formatTime } from '../../../utils/time_formatter'

export default class TrackInfo extends React.Component {
  render() {
    const { trackName, artist, coverId, label, genre, bpm, mixName, releaseDate, key, youtubeLength } = this.props.currentTrack

    return (
      <div className='track_info_container'>

        <div className='track_metadata'>
          {coverId ?
            <div className='cover_container'>
              <img src={`http://geo-media.beatport.com/image_size/220x220/${coverId}.jpg`} />
            </div>
            : ''
          }
          <div className='main_info_container'>
            <div className='artist_name'>{artist}</div>
            <div className='track_name'>{trackName} ({mixName})</div>

            {label ?
              <div className='label_name'>{label}</div>
              : ''
            }
          </div>
        </div>

        <div className='track_main_attributes'>
          <h1 className='genre'>{genre}</h1>

          <ul className='track_info_list'>

            {releaseDate ?
              <li className='track_info_property'>
                <span className='track_info_key'>Release Date</span>
                <span className='track_info_value'>{releaseDate}</span>
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

            {bpm ?
              <li className='track_info_property'>
                <span className='track_info_key'>Tempo</span>
                <span className='track_info_value'>{bpm} BPM</span>
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



          </ul>
        </div>

      </div>
    );
  }
}
