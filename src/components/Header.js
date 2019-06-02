import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Header.min.css';

const ActionsView = (props) => {
  // Logged in action bar
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

  // Logged out action bar
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
          <ActionsView loggedIn={this.props.loggedIn} />
        </div>
      </nav>
     </div>
    );
  }
}

export { Header };
