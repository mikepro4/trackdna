import React, {PropTypes} from 'react';

export default class Channel extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     duration: 500
   }
  }
  render() {

    return (
      <div className='channel-container'>
        <h1>Channel Container</h1>
        <div>
          Channel: {this.props.name}
          <button className='button' onClick={this.props.onDelete}> Delete channel</button>
        </div>

      </div>);
  }
}
