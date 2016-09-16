import React, {PropTypes} from 'react'
import Channel from './channel'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// actions
import {
  deleteChannel,
  reorderChannels
} from '../../../actions/analysis'

@DragDropContext(HTML5Backend)
export default class TrackChannels extends React.Component {
  moveChannel(dragIndex, hoverIndex) {
    // console.log('dragIndex: ', dragIndex)
    // console.log('hoverIndex: ', hoverIndex)
    this.props.dispatch(reorderChannels(dragIndex, hoverIndex))
    // const { cards } = this.state;
    // const dragCard = cards[dragIndex];
    //
    // this.setState(update(this.state, {
    //   cards: {
    //     $splice: [
    //       [dragIndex, 1],
    //       [hoverIndex, 0, dragCard]
    //     ]
    //   }
    // }));
  }

  render() {
    return (
      <div className='channels_container'>
        {this.props.analysis.channels ?
          this.props.analysis.channels.map((channel, i) => (
            <Channel
              {...this.props}
              channel={channel}
              channelPosition={i}
              index={i}
              moveChannel={this.moveChannel.bind(this)}
              key={i}
            />
          ))
          : ''
        }
      </div>
    );
  }
}
