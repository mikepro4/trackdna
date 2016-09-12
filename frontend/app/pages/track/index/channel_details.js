import React, {PropTypes} from 'react';

// components
import ChannelDetailsForm from './channel_details_form'
import ChannelDetailsTimeline from './channel_details_timeline'

// actions
import {
  deleteChannel,
  selectChannel,
  updateChannel
} from '../../../actions/analysis'

export default class ChannelDetails extends React.Component {
  onDeleteChannel() {
    this.props.dispatch(deleteChannel(this.props.channel))
  }

  onClose() {
    this.props.dispatch(selectChannel(null))
  }

  manualFormSubmit() {
    this.refs.channel_details_form.submit();
  }

  onUpdate({ name, color, role, source, type, groupCategory }) {
    const newChannel = {...this.props.channel,
      name, color, role, source, type, groupCategory
    }
    this.props.dispatch(updateChannel(newChannel))
    console.log('newChannel', newChannel)
    this.props.dispatch(selectChannel(null))
  }

  render() {
    const { name, color, role, source, type, effects, groupCategory } = this.props.analysis.selectedChannel
    let channelInitialValues = {
      initialValues: {
        name: name,
        color: color,
        role: role,
        source: source,
        type: type,
        effects: effects,
        groupCategory: groupCategory
      }
    }
    // console.log(channelInitialValues)

    return (
      <div className='channel_details_container'>
        <div className='channel_details_header'>
          <h1>CHANNEL DETAILS</h1>

          <ul className='channel_actions'>
            {/* <li className='channel_action'>
              <button className='button'>Share channel</button>
            </li> */}
            <li className='channel_action'>
              <button className='button' onClick={this.onDeleteChannel.bind(this)}>Delete channel</button>
            </li>
            <li className='channel_action'>
              <button className='button' onClick={this.manualFormSubmit.bind(this)}>Update channel</button>
            </li>
            <li className='channel_action'>
              <button className='button' onClick={this.onClose.bind(this)}>Close</button>
            </li>
          </ul>
        </div>

        <div className='channel_details_content'>
          {
            this.props.analysis.selectedChannel.id ? <ChannelDetailsForm
              {...this.props}
              {...channelInitialValues}
              onSubmit={this.onUpdate.bind(this)}
              initialValues={this.props.analysis.selectedChannel}
              enableReinitialize="true"
              ref='channel_details_form'
            /> : ''
          }

          <ChannelDetailsTimeline {...this.props} />
        </div>
      </div>
    );
  }
}
