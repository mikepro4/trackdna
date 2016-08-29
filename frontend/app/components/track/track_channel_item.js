import React, {PropTypes} from 'react';

export default class TrackChannelListItem extends React.Component {
  render() {
    const {id, name} = this.props.channel;

    return (
      <div>
        Channel Name: {name}
      </div>
    );
  }
}
