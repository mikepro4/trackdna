import React from 'react';
import classNames from 'classnames'
import moment from 'moment'
import check from '../../../assets/check.svg'
import { updateYoutubeSelectedVideo } from '../../../actions/search_actions'
import { updateCurrentVideo } from '../../../actions'
import ReactDOM from 'react-dom'

export default class YoutubeSearchResults extends React.Component {
  selectVideo(video) {
    this.props.dispatch(updateYoutubeSelectedVideo(video, true))
    this.props.dispatch(updateCurrentVideo(video.id.videoId))
  }

  componentDidUpdate() {
    if(!this.props.search.preSelectedVideo) {
      this.pickBestVideo()
    }
    var selectedItem = this.refs.selectedVideo;
    if (selectedItem) {
      var domNode = ReactDOM.findDOMNode(selectedItem);
      var parentNode = ReactDOM.findDOMNode(this.refs.youtube_container);
      parentNode.scrollTop = domNode.offsetTop - 80;
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
      console.log('nameMatcOfficial:', nameMatchOfficial[0])
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
    const artistName = this.props.search.artist.replace(/\s/g, '').toLowerCase();
    const trackname = this.props.search.track_name.replace(/\s/g, '').toLowerCase();
    let selectedVideoId = '';
    if(!_.isEmpty(this.props.search.youtubeSelectedVideo)) {
      selectedVideoId = this.props.search.youtubeSelectedVideo.id.videoId
    }
    const videos = this.props.search.videos.map((video) => {
      const channelName = video.snippet.channelTitle.replace(/\s/g, '').toLowerCase()
      const videoTitle = video.snippet.title.replace(/\s/g, '').toLowerCase()
      let videoItemClasses = classNames({
        'youtube_video_item': true,
        'owns': artistName === channelName,
        'official': (channelName.indexOf('official') !== -1) || (channelName.indexOf('vevo') !== -1),
        'name_match': (videoTitle.indexOf(trackname) !== -1),
        'selected_video': selectedVideoId === video.id.videoId
      })
      const refValue = selectedVideoId === video.id.videoId ? 'selectedVideo' : '';
      return (
        <li className={videoItemClasses} key={video.id.videoId} ref={refValue} onClick={this.selectVideo.bind(this, video)}>
          <div className='video_title'>{video.snippet.title}</div>
          <div className='channel_title'>Published by <span>{video.snippet.channelTitle}</span></div>
          <div className='video_preview'><img src={video.snippet.thumbnails.default.url} /> </div>
          <div className='published_time'>Uploaded {moment(video.snippet.publishedAt).fromNow()}</div>
          <div className='owns_label'><img src={check}/> Video owned by artist</div>
          <div className='official_label'><img src={check}/> Uploaded to official channel</div>
          <div className='name_match_label'><img src={check}/> Exact name match</div>
        </li>
      );
    });

    let videoListClasses = classNames({
      'youtube_video_list': true,
      'video_selected': this.props.search.youtubeSelectedVideo
    })

    return (
      <div className='youtube_results_container'  ref="youtube_container">
        <div className='youtube_results'>
          <h2>Youtube Results</h2>
          <ul className={videoListClasses}>
            {videos}
          </ul>
        </div>
      </div>
    )
  }
}
