import React, {PropTypes} from 'react';
import { Link } from 'react-router'

export default class SignIn extends React.Component {
  render() {
    return (<div>
      <h1>Sign In Yo</h1>
      <Link to='/' className="back">Home</Link>
    </div>);
  }
}
