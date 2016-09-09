import React, {PropTypes} from 'react';
import classNames from 'classnames'
import _ from 'lodash'

// components
import ClipsTimeline from './clips_timeline'
import MomentsTimeline from './moments_timeline'
import ChannelDetails from './channel_details'
import gear from '../../../assets/gear.svg'

// actions
import {
  deleteChannel,
  selectChannel
} from '../../../actions/analysis'

export default class Channel extends React.Component {

  onChannelClick() {
    if(this.props.analysis.selectedChannel && this.props.analysis.selectedChannel.id) {
      if(this.props.channel.id === this.props.analysis.selectedChannel.id) {
        this.props.dispatch(selectChannel(null))
      } else {
        this.props.dispatch(selectChannel(this.props.channel))
      }
    } else {
      this.props.dispatch(selectChannel(this.props.channel))
    }
  }

  renderChannelProperties() {
    const { name, color, role, source, type, effects } = this.props.channel
    if(_.isEmpty(role) && _.isEmpty(source) && _.isEmpty(type)) {
      return(
        <span className='empty_state'>No Channel Properties Selected...</span>
      )
    } else {
      return (
        <div className='channel_properties'>
        {!_.isEmpty(role) ? <span className='property'>{role.replace(/\b\w/g, l => l.toUpperCase())}</span> : ''}
        {!_.isEmpty(source) ? <span className='property'>{source.replace(/\b\w/g, l => l.toUpperCase())}</span> : ''}
        {!_.isEmpty(type) ? <span className='property'>{type.replace(/\b\w/g, l => l.toUpperCase())}</span> : ''}
        </div>
      )
    }
  }

  render() {
    let channelSelected = false;
    if(this.props.analysis.selectedChannel && this.props.analysis.selectedChannel.id )  {
      channelSelected = this.props.analysis.selectedChannel.id === this.props.channel.id
    }

    let channelClasses = classNames({
      'channel_container': true,
      'channel_selected': channelSelected
    })

    return (
      <div className={channelClasses}>

        <div className='channel_top_container'>

          <div className='channel_summary' onClick={this.onChannelClick.bind(this)}>

            <div className='channel_summary_content'>
              <div className='channel_selected_label'>Selected Channel</div>
              <div className='channel_name_container'>
                <img src={gear} className='configure_icon' />
                <span className='channel_name'>{this.props.channelPosition + 1}. {this.props.channel.name}</span>
              </div>
              <div className='channel_description'>
                {this.renderChannelProperties()}
              </div>
            </div>
          </div>

          <div className='channel_content'>
            <ClipsTimeline {...this.props} />
            <MomentsTimeline {...this.props} />
          </div>
        </div>

        {channelSelected ? <ChannelDetails {...this.props} /> : ''}

      </div>);
  }
}
