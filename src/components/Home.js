import React from 'react';
import { Link } from 'react-router-dom';

import { userService } from '../services';

class Home extends React.Component {
  handleLogout() {
    userService.logout();
  }

  render() {
    return (
      <div>
        <h1>Hi, {this.props.currentUser.username}!</h1>
        <p>
          <Link to='/login' onClick={this.handleLogout}>Logout</Link>
        </p>
      </div>
    );
  }
}

export { Home }; 