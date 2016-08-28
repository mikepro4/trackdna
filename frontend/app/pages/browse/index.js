import React from 'react'
import Helmet from "react-helmet";
import { asyncConnect } from 'redux-connect'
import { addTrack, loadTracks } from '../../actions';
import TrackList from '../../components/track/track_list'
import AddTrack from "../../components/track/add_track"
import YouTube from 'react-youtube';

@asyncConnect([{
  promise: ({ store }) => Promise.all([
    store.getState().app.tracksLoaded ? Promise.resolve() : store.dispatch(loadTracks())
  ])
}], state => ({
  auth: state.auth,
	tracks: state.app.tracks,
	loading: state.loading,
  videoId: state.currentVideo,
  playerAction: state.currentVideo.playerAction
}))
export default class Browse extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.onReady = this.onReady.bind(this);
  //   this.onPlayVideo = this.onPlayVideo.bind(this);
  //   this.onStopVideo = this.onStopVideo.bind(this);
  //   this.onPauseVideo = this.onPauseVideo.bind(this);
  //   this.onSeekTo = this.onSeekTo.bind(this);
  // }

  constructor(props) {
   super(props);

   this.state = {
     player: null
   }
  }

  onReady(event) {
   this.setState({
      player: event.target
    });
  }

  componentDidUpdate(event) {
    console.log('state change')
    if(this.props.videoId.playerAction === 'play') {
      setTimeout(() => this.state.player.playVideo(), 500); 
      console.log('play here')
    } else if (this.props.videoId.playerAction === 'pause') {
      this.state.player.stopVideo();
    }
  //  event.target.playVideo()
  }

  // onPlayVideo() {
  //   this.state.player.playVideo();
  // }
  //
  // onStopVideo() {
  //   this.state.player.stopVideo();
  // }
  //
  // onPauseVideo() {
  //   this.state.player.pauseVideo();
  // }
  //
  // onSeekTo() {
  //   this.state.player.seekTo(30);
  // }

  handleFormSubmit({ artist, name, youtubeUrl}) {
    this.props.dispatch(addTrack({
        artist,
        name,
        youtubeUrl,
        "channels": []
      }))
      .then((response) => {
        this.props.dispatch(loadTracks())
      });
  }
  renderVideo() {
    return (
      <YouTube videoId={videoId} onReady={this.onReady} />
    )

  }
	render() {
    console.log('here', this.props.videoId.playerAction)
    const opts = {
      height: '200',
      width: '280'
    };
		return (
			<div className='page_container page_browse'>
			 	<Helmet title="Browse – Track DNA" />

        <div className='filters_container'>
          <div className='filters_section_1'>
            <h1>Track Filters</h1>
            <div className='add_track_test'>
              <AddTrack {...this.props} onSubmit={this.handleFormSubmit.bind(this)} />
                <YouTube
                  videoId={this.props.videoId.currentVideo}
                  opts={opts}
                  onReady={this.onReady.bind(this)}
                />
            </div>
          </div>

          <div className='filters_section_2'>
            <h1>Sounds Filters</h1>
          </div>
        </div>

        <div className='results_container'>
          <h3>Browse Tracks</h3>
          <TrackList {...this.props} />
        </div>

			</div>
		)
	}
}
