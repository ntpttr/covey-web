import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Header.css';

const LoggedOutView = (props) => {
  // Only display if there is no logged in user
  if (!props.currentUser) {
    return (
    <div class="header">
      <ul class="navigation">
        <li class="nav-item">
          <Link class="link" to="/">
            Home
          </Link>
        </li>
        <li class="nav-item">
          <Link class="link" to="/login">
            Sign in
          </Link>
        </li>
        <li class="nav-item">
          <Link class="link" to="/register">
            Sign up
          </Link>
        </li>
      </ul>
    </div>
    );
  }
  return null;
};

const LoggedInView = (props) => {
  // Only display if there is a logged in user
  if (props.currentUser) {
    return (
    <div class="header">
      <ul>
        <li>
          <Link class="link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link class="link" to="/account">
            Account
          </Link>
        </li>
      </ul>
    </div>
    );
  }

  return null;
};

class Header extends React.Component {
  render() {
    return (
    <div class="header">
      <nav>
        <div>
          <Link class="link" to="/">
            {this.props.appName}
          </Link>
          <LoggedOutView currentUser={this.props.currentUser} />
          <LoggedInView currentUser={this.props.currentUser} />
        </div>
      </nav>
     </div>
    );
  }
}

export { Header };
