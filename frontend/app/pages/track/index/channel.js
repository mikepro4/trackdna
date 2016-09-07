import React, {PropTypes} from 'react';

// actions
import {
  deleteChannel
} from '../../../actions/analysis'

export default class Channel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: 500
    }
  }

  onDeleteChannel() {
    this.props.dispatch(deleteChannel(this.props.channelPosition))
  }

  render() {
    return (
      <div className='channel_container' onClick={this.onDeleteChannel.bind(this)}>
        <h1>Channel Container</h1>
        <div>
          Channel: {this.props.channel.name}
          <button className='button'>Delete channel</button>
        </div>

      </div>);
  }
}
