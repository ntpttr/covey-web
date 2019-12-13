import React from 'react';
import {Link} from 'react-router-dom';

class GroupCard extends React.Component {
  render() {
    let groupPath = "/group/" + this.props.group.identifier;
    return (
      <Link className="link" to={groupPath}>
        {this.props.group.displayName}
      </Link>
    );
  }
}

export { GroupCard }; 
