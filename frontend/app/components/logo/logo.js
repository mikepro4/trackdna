import React, {PropTypes} from 'react';
import { Link } from 'react-router'
import classNames from 'classNames'
import logoStatic from '../../assets/logo_static.svg'
import logoSpinning from '../../assets/logo_spinning.svg'

export default class Logo extends React.Component {
  render() {
    let spinnerClassname = classNames({
      'logo_spinning': true,
      'show': this.props.loading.pending
    })
    return (
      <Link to='/' className='logo'>
        <div className='logo_container'>
          <img src={logoStatic} className='logo_static' />
          <img src={logoSpinning} className={spinnerClassname}/>
          <span className='logo_title'>
            TRACK <br/>
            DNA
          </span>
        </div>
      </Link>
    );
  }
}
