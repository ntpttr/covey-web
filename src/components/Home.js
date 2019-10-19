import React from 'react';

import { userService } from '../services';

const GroupCard = (props) => {
  return (
    <div>
      {props.group.displayName}
    </div>
  );
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    var username;

    // Get username from props before making the call to get
    // user details when the component mounts.
    try {
      let currentUser = this.props.currentUser;
      username = currentUser.username;
    } catch (e) {
      // The current user stored in the browser has become malformed, logout.
      username = null;
      this.handleLogout();
    }

    this.state = {
      username: username,
      name: null,
      userImage: null,
      groups: null,
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    userService.logout();
    this.props.updateCurrentUser(null);
  }

  getUserData = async () => {
    try {
      const user = await userService.getCurrentUser();
      this.setState({
        username: user.username,
        name: user.name,
        userImage: user.image,
      });
    } catch (message) {
      alert(message);
    }
  }

  getUserGroups = async () => {
    try {
      const groups = await userService.getUserGroups();
      this.setState({
        groups: groups,
      });
    } catch (message) {
      alert(message);
    }
  }

  componentDidMount() {
    this.getUserData();
    this.getUserGroups();
  }

  renderGroups(groups) {
    if (groups === null) {
      return (
        <div>
          Loading groups...
        </div>
      );
    }

    return (
      <div>
        {groups.map((group) => <GroupCard key={group.identifier} group={group} />)}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Hi, {this.state.username}!</h1>
        <div>
          Groups:
          {this.renderGroups(this.state.groups)}
        </div>
        <p>
          <button onClick={this.handleLogout}>Logout</button>
        </p>
      </div>
    );
  }
}

export { Home }; 
