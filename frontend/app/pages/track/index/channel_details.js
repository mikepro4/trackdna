import React, {PropTypes} from 'react';

// components
import ChannelDetailsForm from './channel_details_form'
import ChannelDetailsTimeline from './channel_details_timeline'

// actions
import {
  deleteChannel,
  selectChannel
} from '../../../actions/analysis'

export default class ChannelDetails extends React.Component {
  onDeleteChannel() {
    this.props.dispatch(deleteChannel(this.props.channelPosition))
  }

  onClose() {
    this.props.dispatch(selectChannel(null))
  }

  onUpdate({ name, color, role, source, type, }) {
    console.log({ name, color, role, source, type, })
  }

  render() {
    const { name, color, role, source, type, effects } = this.props.channel
    const channelInitialValues = {
      initialValues: {
        name: name,
        color: color,
        role: role,
        source: source,
        type: type,
        effects: effects
      }
    }

    return (
      <div className='channel_details_container'>
        <div className='channel_details_header'>
          <h1>CHANNEL DETAILS</h1>

          <ul className='channel_actions'>
            <li className='channel_action'>
              <button className='button'>Share channel</button>
            </li>
            <li className='channel_action'>
              <button className='button' onClick={this.onDeleteChannel.bind(this)}>Delete channel</button>
            </li>
            <li className='channel_action'>
              <button className='button' onClick={this.onUpdate.bind(this)}>Update channel</button>
            </li>
            <li className='channel_action'>
              <button className='button' onClick={this.onClose.bind(this)}>Close</button>
            </li>
          </ul>
        </div>

        <div className='channel_details_content'>
          <ChannelDetailsForm
            {...this.props}
            {...channelInitialValues}
            onSubmit={this.onUpdate.bind(this)}
            ref='channel_details_form'
          />
          <ChannelDetailsTimeline {...this.props} />
        </div>
      </div>
    );
  }
}
