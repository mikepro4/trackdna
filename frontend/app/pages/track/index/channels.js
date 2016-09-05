import React, {PropTypes} from 'react';

// components
import ChannelsInfo from './channels_info'
import ChannelsContent from './channels_content'

export default class TrackChannels extends React.Component {

  // addChannel() {
  //   const oldChannels = this.props.currentTrack.channels
  //   const newObject = {
  //     'id': this.state.channels.length + Math.random(),
  //     'name': Math.random()
  //   }
  //   console.log(newObject)
  //   this.setState({channels: this.state.channels.concat(newObject)});
  // }

  render() {
    return (
      <div className='channels_container'>
        <ChannelsInfo {...this.props} />
        <ChannelsContent {...this.props} />
      </div>
    );
  }
}

TrackChannels.propTypes = {
};
