import React, {PropTypes} from 'react';
import classNames from 'classnames'
import _ from 'lodash'
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

// components
import ClipsTimeline from './clips_timeline'
import MomentsTimeline from './moments_timeline'
import ChannelDetails from './channel_details'
import gear from '../../../assets/gear.svg'

// actions
import {
  deleteChannel,
  selectChannel
} from '../../../actions/analysis'

const channelSource = {
  beginDrag(props) {
    return {
      id: props.channel.id,
      index: props.index
    };
  }
};

const channelTarget = {
  hover(props, monitor, component) {
    // console.log(props, monitor, component)
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
     if (dragIndex === hoverIndex) {
       return;
     }

     // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY / 5) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY * 2) {
      return;
    }

    props.moveChannel(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;

  }
};

@DropTarget('channel', channelTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('channel', channelSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview()
}))
export default class Channel extends React.Component {

  onChannelClick() {
    if(this.props.analysis.selectedChannel && this.props.analysis.selectedChannel.id) {
      if(this.props.channel.id === this.props.analysis.selectedChannel.id) {
        this.props.dispatch(selectChannel(null))
      } else {
        this.props.dispatch(selectChannel(this.props.channel))
      }
    } else {
      this.props.dispatch(selectChannel(this.props.channel))
    }
  }

  renderChannelProperties() {
    const { name, color, role, source, type, effects } = this.props.channel
    if(_.isEmpty(role) && _.isEmpty(source) && _.isEmpty(type)) {
      return(
        <span className='empty_state'>No Channel Properties Selected...</span>
      )
    } else {
      return (
        <div className='channel_properties'>
        {!_.isEmpty(role) ? <span className='property'>{role.replace(/\b\w/g, l => l.toUpperCase())}</span> : ''}
        {!_.isEmpty(source) ? <span className='property'>{source.replace(/\b\w/g, l => l.toUpperCase())}</span> : ''}
        {!_.isEmpty(type) ? <span className='property'>{type.replace(/\b\w/g, l => l.toUpperCase())}</span> : ''}
        </div>
      )
    }
  }

  render() {
    let channelSelected = false;
    if(this.props.analysis.selectedChannel && this.props.analysis.selectedChannel.id )  {
      channelSelected = this.props.analysis.selectedChannel.id === this.props.channel.id
    }

    let channelClasses = classNames({
      'channel_container': true,
      'channel_selected': channelSelected,
      [this.props.channel.color]: true
    })

    const { isDragging, connectDragSource, connectDropTarget, connectDragPreview } = this.props;
    const opacity = isDragging ? .2 : 1;

    const style = {
      opacity: opacity
    }

    return connectDragPreview(
      <div className={channelClasses} style={style}>
        <div className='channel_top_container'>
          {connectDragSource(connectDropTarget(
            <div className='channel_summary' onClick={this.onChannelClick.bind(this)}>
              <div className='channel_summary_content'>
                <div className='channel_selected_label'>Selected Channel</div>
                <div className='channel_name_container'>
                  <img src={gear} className='configure_icon' />
                  <span className='channel_name'>{this.props.channelPosition + 1}. {this.props.channel.name}</span>
                </div>
                <div className='channel_description'>
                  {this.renderChannelProperties()}
                </div>
              </div>
            </div>
          ))}

          <div className='channel_content'>
            <ClipsTimeline {...this.props} />
            <MomentsTimeline {...this.props} />
          </div>
        </div>

        {channelSelected ? <ChannelDetails {...this.props} /> : ''}

      </div>
    );
  }
}
