import React, {PropTypes} from 'react';
import { asyncConnect } from 'redux-connect'
import AddTrack from "../../components/track/add_track"
import Helmet from 'react-helmet';
import { addTrack, loadTracks } from '../../actions';

@asyncConnect([], state => ({}))
export default class TrackNew extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };
  handleFormSubmit({ artist, name}) {
    this.props.dispatch(addTrack({
        artist,
        name,
        "channels": []
      }))
      .then((response) => {
        this.props.dispatch(loadTracks())
          .then((response) => {this.context.router.push('/browse')})
      });
  }
  render() {
    return (
      <div>
        <Helmet title="New Track – Track DNA" />
        <h1>New Track Page</h1>
        <AddTrack {...this.props} onSubmit={this.handleFormSubmit.bind(this)} />
      </div>
    );
  }
}
