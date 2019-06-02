import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Header.min.css';

const LoggedOutView = (props) => {
  // Only display if there is no logged in user
  if (!props.loggedIn) {
    return (
    <div className="header">
      <ul className="navigation">
        <li className="nav-item">
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="link" to="/login">
            Sign in
          </Link>
        </li>
        <li className="nav-item">
          <Link className="link" to="/register">
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
  if (props.loggedIn) {
    return (
    <div className="header">
      <ul>
        <li>
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="link" to="/account">
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
    <div className="header">
      <nav>
        <div>
          <Link className="link" to="/">
            {this.props.appName}
          </Link>
          <LoggedOutView loggedIn={this.props.loggedIn} />
          <LoggedInView loggedIn={this.props.loggedIn} />
        </div>
      </nav>
     </div>
    );
  }
}

export { Header };
