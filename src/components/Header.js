import React from 'react';
import {Link} from 'react-router-dom';

const LoggedOutView = (props) => {
  // Only display if there is no logged in user
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

const LoggedInView = (props) => {
  // Only display if there is a logged in user
  if (props.currentUser) {
    return (
      <ul>
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/account">
            Account
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
            {this.props.appName}
          </Link>
          <LoggedOutView currentUser={this.props.currentUser} />
          <LoggedInView currentUser={this.props.currentUser} />
        </div>
      </nav>
    );
  }
}

export { Header };