import React, {PropTypes} from 'react';

export default class TrackChannelListItem extends React.Component {
  render() {
    const id = this.props.channel.id;
    const name = this.props.channel.name;

    return (
      <div>
        {name}
      </div>
    );
  }
}
