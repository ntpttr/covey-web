import React from 'react';
import {Link} from 'react-router-dom';

import { logout } from '../helpers';
import { userService } from '../services';

const GroupCard = (props) => {
  let groupPath = "/group/" + props.group.identifier;
  return (
    <Link className="link" to={groupPath}>
      {props.group.displayName}
    </Link>
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
    this.getUserData = this.getUserData.bind(this);
    this.getUserGroups = this.getUserGroups.bind(this);
  }

  handleLogout() {
    logout();
    this.props.updateCurrentUser(null);
  }

  getUserData = async () => {
    try {
      const user = await userService.getCurrentUser();
      this.setState({
        username: user.username,
        name: (user.name != null) ? user.name : user.username,
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
    if (groups !== null) {
      return (
        <div>
          {groups.map((group) => <GroupCard key={group.identifier} group={group} />)}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Hi, {this.state.name}!</h1>
        <div>
          Groups:
          {this.renderGroups(this.state.groups)}
        </div>
      </div>
    );
  }
}

export { Home }; 
