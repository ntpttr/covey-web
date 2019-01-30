import React from 'react';
import {Link} from 'react-router-dom';

const LoggedOutView = (props) => {
  if (!props.currentUser) {
    return (
      <ul>
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/login">
            Sign in
          </Link>
        </li>
        <li>
          <Link to="/register">
            Sign up
          </Link>
        </li>
      </ul>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul>
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
      </ul>
    );
  }

  return null;
};

class Header extends React.Component {
  render() {
    return (
      <nav>
        <div>
          <Link to="/">
            {this.props.appName.toLowerCase()}
          </Link>
          <LoggedOutView currentUser={this.props.currentUser} />
          <LoggedInView currentUser={this.props.currentUser} />
        </div>
      </nav>
    );
  }
}

export default Header;