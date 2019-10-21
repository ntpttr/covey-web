import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/css/Header.min.css';
import { logout } from '../helpers';

const ActionsView = (props) => {
  // Logged in action bar
  if (props.currentUser) {
    return (
      <div className="header">
        <ul className="navigation">
          <li className="nav-item">
            <Link className="link" to="/">
              {props.appName}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link" to="/account">
              {props.currentUser.username}
            </Link>
          </li>
          <li className="nav-item">
            <button className="link" onClick={props.handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    );
  }

  // Logged out action bar
  return (
    <div className="header">
      <ul className="navigation">
        <li className="nav-item">
          <Link className="link" to="/">
            {props.appName}
          </Link>
        </li>
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
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    logout();
    this.props.updateCurrentUser(null);
  }

  render() {
    return (
    <div className="header">
      <nav>
        <div>
          <ActionsView 
            appName={this.props.appName}
            currentUser={this.props.currentUser}
            handleLogout={this.handleLogout}
          />
        </div>
      </nav>
     </div>
    );
  }
}

export { Header };
