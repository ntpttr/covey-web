import React from 'react';

import { userService } from '../services';

class Home extends React.Component {
  constructor(props) {
    super(props);

    var username;

    // Get username from local storage before making the call to get
    // user details when the component mounts.
    try {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      username = currentUser.username;
    } catch (e) {
      // The current user stored in the browser has become malformed, logout.
      username = null;
      userService.logout();
    }

    this.state = {
      username: username,
      userImage: null,
      groups: null,
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    userService.logout();
    this.props.updateLoginState(false);
  }

  getUserData = async () => {
    try {
      const user = await userService.getCurrentUser();
      this.setState({
        username: user.username,
        userImage: user.image,
        groups: user.groups,
      });
    } catch (message) {
      alert(message);
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {
    return (
      <div>
        <h1>Hi, {this.state.username}!</h1>
        <p>
          <button onClick={this.handleLogout}>Logout</button>
        </p>
      </div>
    );
  }
}

export { Home }; 