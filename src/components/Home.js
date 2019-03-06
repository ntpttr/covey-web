import React from 'react';

import { userService } from '../services';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.updateCurrentUser(null);
    userService.logout();
  }

  render() {
    return (
      <div>
        <h1>Hi, {this.props.currentUser.username}!</h1>
        <p>
          <button onClick={this.handleLogout}>Logout</button>
        </p>
      </div>
    );
  }
}

export { Home }; 