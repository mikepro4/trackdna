import React, { PropTypes } from 'react'
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { asyncConnect } from 'redux-connect'
import classNames from 'classNames'
import { loadTrack, deleteTrack, loadTracks, updateTrack} from '../../actions'
import YoutubePlayer from "../../components/player/player"

@asyncConnect([{
  promise: (props) => {
    return Promise.resolve(props.store.dispatch(loadTrack(props.params.id)))
  }
}], state => ({
  currentTrack: state.app.currentTrack,
  loading: state.loading.pending,
  videoId: state.currentVideo,
  playerAction: state.currentVideo.playerAction
}))
export default class Track extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

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

  onPlay() {
    this.props.dispatch(updateTrack(this.props.currentTrack.youtubeUrl, 'play'))
  }

  onPause() {
    this.props.dispatch(updateTrack(this.props.currentTrack.youtubeUrl, 'pause'))
  }

  onStop() {
    this.props.dispatch(updateTrack(this.props.currentTrack.youtubeUrl, 'stop'))
  }

  onSeek() {
    this.props.dispatch(updateTrack(this.props.currentTrack.youtubeUrl, 'seek', 30))
  }

  componentDidMount() {
    this.props.dispatch(updateTrack(this.props.currentTrack.youtubeUrl))
  }

	render() {
    const { name, artist, id } = this.props.currentTrack
    let pageClasses = classNames({
      'page_container': true,
      'page_track': true,
      'loading': this.props.loading
    })
		return (
			<div className={pageClasses}>
			 	<Helmet title="Track – Track DNA" />
        <div className='track_toolbar'>
          <div className='toolbar_section_left'>Track Toolbar</div>

          <div className='toolbar_section_right'>
            <ul className='track_actions'>
              <li><a className='button' onClick={this.onDelete.bind(this)}>Delete Track</a></li>
              <li><Link to={`/track/edit/${id}`} className='button'>Edit Track</Link></li>
              <li><button onClick={this.onPlay.bind(this)} className='button'>Play</button></li>
              <li><button onClick={this.onPause.bind(this)} className='button'>Pause</button></li>
              <li><button onClick={this.onStop.bind(this)} className='button'>Stop</button></li>
              <li><button onClick={this.onSeek.bind(this)} className='button'>Seek to 0:30</button></li>
            </ul>
          </div>
        </div>

        <div className='track_container'>
          <div className='track_sidebar'>
            <div className='track_metadata'>

              <div className='meta_block'>
               Artist: <h1>{artist}</h1>
              </div>

              <div className='meta_block'>
               Track Name: <h1>{name}</h1>
              </div>
            </div>

            <div className='track_player'>
              <YoutubePlayer {...this.props} />
            </div>
          </div>
          <div className='track_content'>
            <div className='channels_container'>
              <div className='channels_info'>channels info</div>
              <div className='channels_content'>channels content</div>
            </div>
            <div className='info_container'>
              tags info
            </div>
          </div>
        </div>

			</div>
		)
	}
}
