import React, {PropTypes} from 'react';

// components
import YoutubePlayer from '../../../components/player/player'

export default class TrackSidebar extends React.Component {

  onDelete() {
    const id = this.props.currentTrack.id
    this.props.dispatch(deleteTrack({id}))
      .then((response) => {
        this.props.dispatch(loadTracks())
          .then((response) => {this.context.router.push('/browse')})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { trackName, artist } = this.props.currentTrack

    return (
      <div className='track_sidebar'>
        <div className='track_metadata'>

          <div className='meta_block'>
           Artist: <h1>{artist}</h1>
          </div>

          <div className='meta_block'>
           Track Name: <h1>{trackName}</h1>
          </div>
        </div>

        <a className='button' onClick={this.onDelete.bind(this)}>Delete Track</a>

        <div className='track_player'>
          <YoutubePlayer {...this.props} />
        </div>

      </div>
    );
  }
}
