import React, { PropTypes } from 'react'
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { asyncConnect } from 'redux-connect'
import classnames from 'classnames'
import { loadTrack, deleteTrack, loadTracks, updateCurrentVideo, editTrack, updateTime} from '../../actions'
import YoutubePlayer from "../../components/player/player"
import Channel from './components/channel'
import _ from 'lodash'

@asyncConnect([{
  promise: (props) => {
    return Promise.resolve(props.store.dispatch(loadTrack(props.params.id)))
  }
}], state => ({
  currentTrack: state.app.currentTrack,
  loading: state.loading.pending,
  currentVideo: state.currentVideo,
  time: state.time
}))
export default class Track extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
   super(props);

   this.state = {
     channels: []
   }
  }

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

  renderPlaying() {
    const {youtubeUrl} = this.props.currentTrack
    if(youtubeUrl == this.props.currentVideo.videoId) {
      return (
        <div className='test'>
          <h2>Playing</h2>
          <div>Youtube Url: {youtubeUrl ? youtubeUrl : '--'}</div>
          <div>Duration: {this.props.time.durationMinutes}:{this.props.time.durationSeconds}</div>
          <div>Current Time: {this.props.time.currentMinutes}:{this.props.time.currentSeconds}</div>
        </div>
      )
    }
  }

  onPlay() {
    this.props.dispatch(updateCurrentVideo(this.props.currentTrack.youtubeUrl, 'play'))
  }

  onPause() {
    this.props.dispatch(updateCurrentVideo(this.props.currentTrack.youtubeUrl, 'pause'))
  }

  onStop() {
    this.props.dispatch(updateCurrentVideo(this.props.currentTrack.youtubeUrl, 'stop'))
  }

  onSeek() {
    this.props.dispatch(updateCurrentVideo(this.props.currentTrack.youtubeUrl, 'seek', 30))
  }

  componentDidMount() {
    this.props.dispatch(updateCurrentVideo(this.props.currentTrack.youtubeUrl, 'loaded'))
    this.setState({
      channels: this.props.currentTrack.channels
    })
  }

  addChannel() {
    const oldChannels = this.props.currentTrack.channels
    const newObject = {
      'id': this.state.channels.length + Math.random(),
      'name': Math.random()
    }
    console.log(newObject)
    this.setState({channels: this.state.channels.concat(newObject)});
  }

  deleteChannel(channelId) {
    this.setState({
      channels: _.remove(this.state.channels, function(channel) {
        return channel.id != channelId
      })
    })
  }

  saveTrack() {
    console.log(this.state.channels)
    const track =  {...this.props.currentTrack,  channels: this.state.channels}
    this.props.dispatch(editTrack(track))
      .then((response) => {
        console.log('yay')
        this.props.dispatch(loadTrack(this.props.currentTrack.id))
      });
  }

  renderSaveTrackButton() {
    if(!_.isEqual(this.props.currentTrack.channels.sort(), this.state.channels.sort())) {
      return (
        <button className='button' onClick={this.saveTrack.bind(this)}>Save Track</button>
      )
    }
  }

	render() {
    const { name, artist, id, channels } = this.props.currentTrack
    let pageClasses = classnames({
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
            <div>{this.renderPlaying()}</div>
          </div>
          <div className='track_content'>
            <div className='channels_container'>
              <div className='channels_info'>
                {this.state.channels.map(channel => (
                  <div key={channel.id}>
                    Channel: {channel.name}
                    <button className='button' onClick={this.deleteChannel.bind(this, channel.id)}> Delete channel</button>
                  </div>
                ))}
                <button className='button button_primary' onClick={this.addChannel.bind(this)}>Add Channel</button>
                {this.renderSaveTrackButton()}
              </div>
              <div className='channels_content'>
                {this.state.channels.map(channel => (
                  <Channel
                    channel={channel}
                    {...this.props}
                    onDelete={this.deleteChannel.bind(this, channel.id)}
                    key={channel.id}
                />
                ))}
              </div>
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
