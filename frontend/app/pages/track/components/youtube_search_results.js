import React from 'react';
import classNames from 'classnames'
import moment from 'moment'
import check from '../../../assets/check.svg'
import { updateYoutubeSelectedVideo } from '../../../actions/search_actions'

export default class YoutubeSearchResults extends React.Component {
  selectVideo(video) {
    this.props.dispatch(updateYoutubeSelectedVideo(video))
  }

  render() {
    const artistName = this.props.search.artist.replace(/\s/g, '').toLowerCase();
    const trackname = this.props.search.track_name.replace(/\s/g, '').toLowerCase();
    console.log(_.isEmpty(this.props.search.youtubeSelectedVideo))
    let selectedVideoId = '';
    if(!_.isEmpty(this.props.search.youtubeSelectedVideo)) {
      selectedVideoId = this.props.search.youtubeSelectedVideo.id.videoId
    }
    console.log()
    const videos = this.props.search.videos.map((video) => {
      const channelName = video.snippet.channelTitle.replace(/\s/g, '').toLowerCase()
      const videoTitle = video.snippet.title.replace(/\s/g, '').toLowerCase()
      let videoItemClasses = classNames({
        'youtube_video_item': true,
        'owns': artistName === channelName,
        'official': (channelName.indexOf('official') !== -1),
        'name_match': (videoTitle.indexOf(trackname) !== -1),
        'selected_video': selectedVideoId === video.id.videoId
      })
      return (
        <li className={videoItemClasses} key={video.id.videoId} onClick={this.selectVideo.bind(this, video)}>
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
      <div className='youtube_results'>
        <h2>Youtube Results</h2>
        <ul className={videoListClasses}>
          {videos}
        </ul>
      </div>
    )
  }
}
