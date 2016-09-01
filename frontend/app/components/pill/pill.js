import React, {PropTypes} from 'react';
import check from '../../assets/check.svg'
import classNames from 'classnames'
import _ from 'lodash'


export default class Pill extends React.Component {

  iconSelector(iconType) {
    switch(iconType) {
      case 'check':
        return check
    }
  }

  renderLeftIcon() {
    if(this.props.iconLeft) {
      return (
        <span className='pill_icon pill_icon_left'>
          <img className={this.props.iconLeft} src={this.iconSelector(this.props.iconLeft)}/>
        </span>
      )
    }
  }

  renderRightIcon() {
    if(this.props.iconRight) {
      return (
        <span className='pill_icon pill_icon_right'>
          <img className={this.props.iconRight}  src={this.iconSelector(this.props.iconRight)}/>
        </span>
      )
    }
  }

  render() {
    const { type, content } = this.props

    let pillClasses = classNames({
      'pill': true,
      'pill_green': type === 'positive',
      'pill_red': type === 'negative',
      'pill_grey': type === 'neutral'
    })

    return (
      <div className={pillClasses}>
        {this.renderLeftIcon()}
        <span className='pill_content'>
          <span className='pill_label'>{content}</span>
        </span>
        {this.renderRightIcon()}
      </div>
    );
  }
}

Pill.propTypes = {
};
