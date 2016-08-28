import React, {PropTypes} from 'react';

export default class TrackContainer extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div>
        {children}
      </div>);
  }
}
