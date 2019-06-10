import React from 'react';

import { userService } from '../services';

const GroupCard = (group) => {
  return (
    <div>
      {group.name}
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
        {groups.map((group, index) => (
          <GroupCard key={index} group={group} />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Hi, {this.state.username}!</h1>
        {this.state.groups &&
          <div>
            Groups:
            {this.state.groups.map((group) => <li key={group._id}>{group.name}</li>)}
          </div>
        }
        <p>
          <button onClick={this.handleLogout}>Logout</button>
        </p>
      </div>
    );
  }
}

export { Home }; 