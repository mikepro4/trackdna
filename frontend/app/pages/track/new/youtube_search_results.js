import React from 'react';
import classNames from 'classnames'
import moment from 'moment'
import { updateYoutubeSelectedVideo, loadYoutubeVideoData } from '../../../actions/search_actions'
import { updateCurrentVideo } from '../../../actions'
import ReactDOM from 'react-dom'
import Pill from '../../../components/pill/pill'
import {
  checkVideoOwnership, checkVideoOfficial, checkVideoNameMatch
} from '../../../utils/youtube'

export default class YoutubeSearchResults extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     containerScrolled: false
   }
  }

  selectVideo(video) {
    this.props.dispatch(updateYoutubeSelectedVideo(video, true))
    this.props.dispatch(loadYoutubeVideoData(video))
    this.props.dispatch(updateCurrentVideo(video.id.videoId))
  }

  componentDidUpdate() {
    if(!this.props.search.preSelectedVideo) {
      this.pickBestVideo()
    }
    var selectedItem = this.refs.selectedVideo;
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

  pickBestVideo() {
    const artistName = this.props.search.artist.replace(/\s/g, '').toLowerCase();
    const trackname = this.props.search.track_name.replace(/\s/g, '').toLowerCase();

    const owns = _.filter(this.props.search.videos, (video) => {
      const channelName = video.snippet.channelTitle.replace(/\s/g, '').toLowerCase()
      return (
        channelName === artistName
      )
    });

    const nameMatch = _.filter(this.props.search.videos, (video) => {
      const videoTitle = video.snippet.title.replace(/\s/g, '').toLowerCase()
      return (
        (videoTitle.indexOf(trackname) !== -1)
      )
    })

    const officialMatch = _.filter(this.props.search.videos, (video) => {
      const channelName = video.snippet.channelTitle.replace(/\s/g, '').toLowerCase()
      return (
        (channelName.indexOf('official') !== -1) || (channelName.indexOf('vevo') !== -1)
      )
    })

    console.log('owned:', owns)
    console.log('name matched:', nameMatch)
    console.log('official matched:', officialMatch)

    if (!_.isEmpty(owns)) {
      console.log('has owned track')
      const nameMatchOwned = _.filter(owns, (video) => {
        const videoTitle = video.snippet.title.replace(/\s/g, '').toLowerCase()
        return (
          (videoTitle.indexOf(trackname) !== -1)
        )
      })
      this.selectVideo(nameMatchOwned[0])
    } else if(!_.isEmpty(officialMatch)) {
      console.log('has official track')
      console.log('has owned track')
      const nameMatchOfficial = _.filter(officialMatch, (video) => {
        const videoTitle = video.snippet.title.replace(/\s/g, '').toLowerCase()
        return (
          (videoTitle.indexOf(trackname) !== -1)
        )
      })
      console.log('nameMatchOfficial:', nameMatchOfficial[0])
      if(!_.isEmpty(nameMatchOfficial)) {
        this.selectVideo(nameMatchOfficial[0])
      } else {
        this.selectVideo(nameMatch[0])
      }
    } else if (!_.isEmpty(nameMatch)) {
      console.log('has named tracks')
      this.selectVideo(nameMatch[0])
    }
  }

  render() {
    let selectedVideoId = '';
    if(!_.isEmpty(this.props.search.youtubeSelectedVideo)) {
      selectedVideoId = this.props.search.youtubeSelectedVideo.id.videoId
    }

    const videos = this.props.search.videos.map((video) => {

      const OWNS_RESULT = checkVideoOwnership(this.props.search.artist, video)
      const OFFICIAL_RESULT = checkVideoOfficial(video)
      const NAME_MATCH_RESULT = checkVideoNameMatch(this.props.search.track_name, video)

      const refValue = selectedVideoId === video.id.videoId ? 'selectedVideo' : '';

      let videoItemClasses = classNames({
        'result_item': true,
        'youtube_search_result_item': true,
        'selected_result': selectedVideoId === video.id.videoId
      })

      return (
        <li className={videoItemClasses} key={video.id.videoId} ref={refValue} onClick={this.selectVideo.bind(this, video)}>
          <div className='video_title'>{video.snippet.title}</div>
          <div className='channel_title'>Published by <span>{video.snippet.channelTitle}</span></div>
          <div className='video_preview'><img src={video.snippet.thumbnails.medium.url} /> </div>
          <div className='published_time'>Uploaded {moment(video.snippet.publishedAt).fromNow()}</div>

          {OWNS_RESULT ?
            <Pill
              {...this.props}
              iconLeft='check'
              type='positive'
              content='Artist Match'
            /> : ''
          }

          {OFFICIAL_RESULT ?
            <Pill
              {...this.props}
              iconLeft='check'
              type='positive'
              content='Official Channel'
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
      );
    });

    let resultsListClasses = classNames({
      'results_list': true,
      'selected_result_container': this.props.search.youtubeSelectedVideo
    })

    return (
      <div className='metadata_results_container'>
        <h2 className='results_source_name'><span>YOUTUBE RESULTS</span></h2>
        <div className='results_scrollable_container' ref="scrollable_container">
          <ul className={resultsListClasses}>
            {videos}
          </ul>
        </div>
      </div>
    )
  }
}
