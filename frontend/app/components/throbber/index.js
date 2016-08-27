import React, {PropTypes} from 'react';

export default class Loader extends React.Component {
  render() {
    const loading = this.props.loading.pending
    if(loading) {
      return (
        <span>Loading...</span>
      )
    } return (
      <span> Content Loaded.</span>
    )
  }
}
